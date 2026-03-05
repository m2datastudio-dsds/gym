import React, { useState, useEffect, useMemo } from 'react';
import { Table, Typography, Select, Button, Modal, Form, DatePicker, Input, InputNumber, notification, Row, Col, Empty, Pagination } from 'antd';
import { FaWallet, FaHistory } from 'react-icons/fa';
import { CloseCircleOutlined, DownOutlined } from '@ant-design/icons';
import { getallLatestPayment, savePayment, getPaymentByMemberID, getallPaymentDetails } from '../../Services/data.services';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';

const { Column } = Table;
const { Option } = Select;

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [allPaymentDetails, setAllPaymentDetails] = useState([]);
  const [isAllPaymentsVisible, setIsAllPaymentsVisible] = useState(false);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [form] = Form.useForm();

  // Define breakpoints
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const result = await getallLatestPayment();
      if (result.code === 200) {
        setPayments(result.data);
        setTotalPaidAmount(result.totalPaidAmount); // Assuming these values are returned from the API
        setTotalPendingAmount(result.totalPendingAmount); // Assuming these values are returned from the API
      } else {
        console.error('Failed to fetch payments:', result.message);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
  };

  const clearFilter = () => {
    setStatusFilter('');
    setSelectedDate(null); // Clear selected date when filter is reset
  };

  const handleAllPaymentDetails = async () => {
    setLoading(true);
    try {
      const details = await getallPaymentDetails();
      setAllPaymentDetails(details.data);
      setIsAllPaymentsVisible(true);
    } catch (error) {
      console.error('Error fetching all payment details:', error);
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to fetch all payment details'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentHistory = async (memberID) => {
    try {
      const history = await getPaymentByMemberID(memberID);
      setPaymentHistory(history);
      setIsHistoryVisible(true);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to fetch payment history'
      });
    }
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  // Memoize filtered payments
  const filteredPayments = useMemo(() => payments.filter(payment =>
    statusFilter === '' ||
    (statusFilter === 'Pending' && payment.pending > 0) ||
    (statusFilter === 'Completed' && payment.pending === 0)
  ), [payments, statusFilter]);

  // Memoize filtered all payment details by selected date in DD-MM-YYYY format
  const filteredAllPaymentDetails = useMemo(() => {
    if (!selectedDate) return allPaymentDetails;

    const selectedFormattedDate = moment(selectedDate).format('DD-MM-YYYY');
    return allPaymentDetails.filter(payment => {
      const paymentDate = payment.paidDate ? moment(payment.paidDate).format('DD-MM-YYYY') : null;
      return paymentDate === selectedFormattedDate;
    });
  }, [allPaymentDetails, selectedDate]);

  const paginatedPayments = filteredPayments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePay = (record) => {
    setSelectedPayment(record); // Ensure the selected payment record is set properly with the correct ID
    setIsModalVisible(true);
    form.setFieldsValue({
      memberID: record.memberID,
      name: record.name,
      mobileNumber: record.mobileNumber,
      packageType: record.packageType,
      packageAmount: record.packageAmount,
      paidAmount: '',
      paidDate: null,
      paymentMode: '',
    });
  };

  const handleSavePayment = async () => {
    try {
      const values = await form.validateFields();
      if (!selectedPayment || !selectedPayment.id) {
        throw new Error('Payment ID is missing.');
      }


      const paymentData = {
        paymentId: values.paymentId,
        memberID: selectedPayment.memberID,
        paidAmount: values.paidAmount,
        paidDate: values.paidDate ? values.paidDate.format('YYYY-MM-DD') : null,
        paymentMode: values.paymentMode,
      };

      await savePayment(selectedPayment.id, paymentData); // Pass correct ID here
      notification.success({
        message: 'Success',
        description: 'Payment saved successfully!',
      });
      setIsModalVisible(false);
      fetchPayments(); // Refresh the payment list
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to save payment',
      });
    }
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    form.resetFields(); // Ensure the form is reset when modal is canceled
  };

  const handleBackToTable = () => {
    setIsHistoryVisible(false);
    setPaymentHistory([]);
    setIsAllPaymentsVisible(false);
    setAllPaymentDetails([]);
    setSelectedDate(null); // Reset selected date when going back to the main table
  };

  const renderAmount = (text) => {
    if (text == null) return '₹0';
    return `₹${text.toLocaleString()}`;
  };

  return (
    <div className='container'>
      <Typography.Title level={3} style={{ color: '#0A21C0' }} className='title'>Payments</Typography.Title>
      <div className={`header ${isSmallScreen ? 'header-small' : ''}`}>
        <div className='search-group'>
          {/* Status Filter Dropdown */}
          {!isHistoryVisible && !isAllPaymentsVisible && (
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              placeholder="Filter by Status"
              className='status-select'
              style={{ width: 200 }}
              suffixIcon={statusFilter ? <CloseCircleOutlined onClick={clearFilter} /> : <DownOutlined />} // Add down arrow before selecting value
            >
              <Option value="">All</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          )}
          {/* Date Picker for All Payment Details */}
          {isAllPaymentsVisible && (
            <>
            <DatePicker
              placeholder="Select Date"
              format="DD-MM-YYYY" // Date format for DatePicker
              onChange={(date) => setSelectedDate(date)}
              value={selectedDate}
              className='date-picker'
              style={{ marginRight: 10 }}
            />
            <Button type="default" onClick={clearFilter} className='clear-btn'>Clear</Button>
            </>
          )}
          <div className='button-group'>
            {!isHistoryVisible && !isAllPaymentsVisible && (
              <Button type="primary" onClick={handleAllPaymentDetails} className='history-btn'>
                Payment History
              </Button>
            )}
            {(isHistoryVisible || isAllPaymentsVisible) && (
              <Button type="primary" onClick={handleBackToTable} className='back-btn'>
                Back
              </Button>
            )}
          </div>
        </div>
      </div>

      {!isHistoryVisible && !isAllPaymentsVisible ? (
        <div className='table-container'>
          <Table
            bordered
            dataSource={paginatedPayments}
            pagination={false}
            loading={loading}
            rowKey="id"
            className='responsive-table'
            size={isSmallScreen ? 'small' : 'middle'}
            scroll={isSmallScreen ? { x: '100%' } : undefined}
            summary={() => (
              <>
                {isSmallScreen ? (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={10}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography.Text strong>Total Received: {`₹${(totalPaidAmount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Typography.Text>
                        <Typography.Text strong>Total Pending: {`₹${(totalPendingAmount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Typography.Text>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginTop: 10 }}>
                          <Pagination
                            className="pagination"
                            current={currentPage}
                            pageSize={rowsPerPage}
                            total={filteredPayments.length}
                            showSizeChanger={false}
                            onChange={(page) => setCurrentPage(page)}
                          />
                          <Select
                            defaultValue={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                            style={{ width: 100, marginLeft: 10 }}
                          >
                            <Option value={10}>10 / page</Option>
                            <Option value={20}>20 / page</Option>
                            <Option value={50}>50 / page</Option>
                            <Option value={100}>100 / page</Option>
                          </Select>
                        </div>
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                ) : (
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={3}>
                      <Typography.Text strong style={{ marginLeft: 40 }}>Total Received:</Typography.Text>
                      <Typography.Text strong style={{ marginLeft: 8 }}>
                        {`₹${(totalPaidAmount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1} colSpan={2}>
                      <Typography.Text strong style={{ marginLeft: 20 }}>Total Pending:</Typography.Text>
                      <Typography.Text strong style={{ marginLeft: 8 }}>
                        {`₹${(totalPendingAmount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} colSpan={6} style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Pagination
                          className="pagination"
                          current={currentPage}
                          pageSize={rowsPerPage}
                          total={filteredPayments.length}
                          showSizeChanger={false}
                          onChange={(page) => setCurrentPage(page)}
                        />
                        <Select
                          defaultValue={rowsPerPage}
                          onChange={handleRowsPerPageChange}
                          style={{ width: 100, marginLeft: 10 }}
                        >
                          <Option value={10}>10 / page</Option>
                          <Option value={20}>20 / page</Option>
                          <Option value={50}>50 / page</Option>
                          <Option value={100}>100 / page</Option>
                        </Select>
                      </div>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              </>
            )}
          >
            <Column title="SI.no" render={(text, record, index) => (currentPage - 1) * rowsPerPage + index + 1} />
            <Column title="Member ID" dataIndex="memberID" key="memberID" />
            <Column title="Name" dataIndex="name" key="name" />
            {isSmallScreen ? null : <Column title="Mobile Number" dataIndex="mobileNumber" key="mobileNumber" />}
            {isSmallScreen ? null : <Column title="Package Type" dataIndex="packageType" key="packageType" />}
            {isSmallScreen ? null : <Column title="Package Amount" dataIndex="packageAmount" key="packageAmount" render={(text) => `₹${(text ?? 0).toLocaleString()}`} />}
            {isSmallScreen ? null : <Column title="Paid Amount" dataIndex="paidAmount" key="paidAmount" render={(text) => `₹${(text ?? 0).toLocaleString()}`} />}
            {isSmallScreen ? null : <Column
              title="Pending Amount"
              dataIndex="pending"
              key="pending"
              render={(text) => {
                const pendingAmount = text !== null && text !== undefined ? text : 0; // Provide fallback for null or undefined
                return `₹${pendingAmount.toLocaleString()}`;
              }}
            />}
            <Column title="Status" key="status" render={(text, record) => (record.pending > 0 ? 'Pending' : 'Completed')} />
            {isSmallScreen ? null : (
              <>
                <Column
                  title="Pay"
                  key="pay"
                  render={(text, record) => (
                    <Button type="link" icon={<FaWallet />} onClick={() => handlePay(record)} className='icon' />
                  )}
                />
                <Column
                  title="History"
                  key="history"
                  render={(text, record) => (
                    <Button type="link" icon={<FaHistory />} onClick={() => handlePaymentHistory(record.memberID)} className='icon' />
                  )}
                />
              </>
            )}
          </Table>

        </div>
      ) : (
        <div className='history-container'>
          {isHistoryVisible && (
            <>
              <Typography.Title level={4}>Payment History for Member ID: {paymentHistory[0]?.memberID}</Typography.Title>
              <Table
                bordered
                dataSource={paymentHistory}
                pagination={false}
                rowKey="id"
                className='responsive-table'
                size={isSmallScreen ? 'small' : 'middle'}
                scroll={isSmallScreen ? { x: '100%' } : undefined}
              >
                <Column title="Payment ID" dataIndex="paymentId" key="paymentId" />
                <Column title="Member ID" dataIndex="memberID" key="memberID" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Mobile Number" dataIndex="mobileNumber" key="mobileNumber" />
                <Column title="Package Type" dataIndex="packageType" key="packageType" />
                <Column
                  title="Package Amount"
                  dataIndex="packageAmount"
                  key="packageAmount"
                  render={renderAmount}
                />
                <Column
                  title="Paid Amount"
                  dataIndex="paidAmount"
                  key="paidAmount"
                  render={renderAmount}
                />
                <Column
                  title="Pending Amount"
                  dataIndex="pending"
                  key="pending"
                  render={renderAmount}
                />
                <Column
                  title="Paid Date"
                  dataIndex="paidDate"
                  key="paidDate"
                  render={(text) => text ? moment(text).format('DD-MM-YYYY') : ''}
                />
                <Column title="Payment Mode" dataIndex="paymentMode" key="paymentMode" />
              </Table>
            </>
          )}

          {isAllPaymentsVisible && (
            <>
              <Typography.Title level={4}>All Payment Details</Typography.Title>
              {filteredAllPaymentDetails.length > 0 ? (
                <Table
                  bordered
                  dataSource={filteredAllPaymentDetails}
                  pagination={false}
                  rowKey="id"
                  className='responsive-table'
                  size={isSmallScreen ? 'small' : 'middle'}
                  scroll={isSmallScreen ? { x: '100%' } : undefined}
                >
                  <Column title="Payment ID" dataIndex="paymentId" key="paymentId" />
                  <Column title="Member ID" dataIndex="memberID" key="memberID" />
                  <Column title="Name" dataIndex="name" key="name" />
                  <Column title="Mobile Number" dataIndex="mobileNumber" key="mobileNumber" />
                  <Column title="Package Type" dataIndex="packageType" key="packageType" />
                  <Column title="Package Amount" dataIndex="packageAmount" key="packageAmount" render={renderAmount} />
                  <Column title="Paid Amount" dataIndex="paidAmount" key="paidAmount" render={renderAmount} />
                  <Column title="Pending Amount" dataIndex="pending" key="pending" render={renderAmount} />
                  <Column title="Paid Date" dataIndex="paidDate" key="paidDate" render={(text) => text ? moment(text).format('DD-MM-YYYY') : ''} />
                  <Column title="Payment Mode" dataIndex="paymentMode" key="paymentMode" />
                </Table>
              ) : (
                <Empty description="No Data" />
              )}
            </>
          )}
        </div>
      )}

      <Modal
        title="Save Payment"
        visible={isModalVisible}
        onCancel={handleCancelModal}
        footer={[
          <Button key="cancel" onClick={handleCancelModal}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSavePayment}>
            Save
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="memberID" label="Member ID">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="Name">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="mobileNumber" label="Mobile Number">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="packageType" label="Package Type">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="paidAmount"
                label="Paid Amount"
                rules={[{ required: true, message: 'Please enter paid amount' }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paidDate"
                label="Paid Date"
                rules={[{ required: true, message: 'Please select paid date' }]}
              >
                <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="paymentMode"
            label="Payment Mode"
            rules={[{ required: true, message: 'Please select payment mode' }]}
          >
            <Select placeholder="Select a payment mode">
              <Option value="Cash">Cash</Option>
              <Option value="Credit_card">Credit card</Option>
              <Option value="Debit_card">Debit card</Option>
              <Option value="Cheque">Cheque</Option>
              <Option value="Internet_banking">Internet Banking</Option>
              <Option value="Paytm">Paytm</Option>
              <Option value="Google_pay">Google Pay</Option>
              <Option value="Phonepe">Phonepe</Option>
              <Option value="BHIM_App">BHIM App</Option>
              <Option value="Others">Others</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>


      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 8px;
          width: 100%;
          margin-top: -8px;
        }

        .title {
          align-self: flex-start;
        }

        .header {
          margin-bottom: 20px;
          display: flex;
          justify-content: flex-start; /* Align items to the start */
          width: 100%;
          align-items: center; /* Center align items */
        }

        .header-small {
          flex-direction: column;
          align-items: flex-start;
        }

        .search-group {
          display: flex;
          align-items: center;
          gap: 10px; /* Small gap between search input and buttons */
          flex: 1; /* Take full width except for button group */
        }

        .date-picker {
          width: 200px;
        }

        .button-group {
          display: flex;
          gap: 5px; /* Small gap between buttons */
        }

        .status-select {
          margin-right: 10px; /* Margin for better alignment */
        }

        .table-container, .history-container {
          width: 100%;
          overflow-x: ${isSmallScreen ? 'auto' : 'hidden'};
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          gap: 10px;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #E0115F; 
          font-size: 20px; /* Size of the icon */
        }
      `}</style>
    </div>
  );
};

export default Payment;
