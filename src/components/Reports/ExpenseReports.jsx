import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Row, Col, Typography, Tag, Modal } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { getallExpenses } from '../../Services/data.services';
import moment from 'moment';
import { normalizeFileUrlList } from '../../Utils/fileUrls';

const { Title } = Typography;

const ExpenseReports = ({ goToReports }) => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentReceipts, setCurrentReceipts] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fetch expenses from the API
  const fetchExpenses = async () => {
    try {
      const data = await getallExpenses();
      const formattedExpenses = data.expenses.map((expense, index) => ({
        ...expense,
        key: index + 1,
        expenseDate: moment(expense.expenseDate).format('DD-MM-YYYY'),
      }));
      setExpenses(formattedExpenses);
      setFilteredExpenses(formattedExpenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  // Handle search input change
  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value);
  };

  // Apply filters based on search term
  const applyFilters = (searchTerm) => {
    let filtered = expenses;
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.expenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.paymentMode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredExpenses(filtered);
  };

  // Open modal to show receipt
  const openModal = (receipts, index) => {
    setCurrentReceipts(receipts);
    setCurrentImageIndex(index);
    setVisibleModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setVisibleModal(false);
    setCurrentReceipts([]);
    setCurrentImageIndex(0);
  };

  // Navigate to the next image
  const nextImage = () => {
    if (currentImageIndex < currentReceipts.length - 1) {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Navigate to the previous image
  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div style={{ marginTop: '-25px', marginLeft: '-10px' }}>
      <Title level={3}>Expense Reports</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Button type="primary" onClick={goToReports} style={{ marginLeft: '10px' }}>
          Back to Reports
        </Button>
        <Col xs={24} sm={12} md={6}>
          <Input
            placeholder="Search by type, description, or mode"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<SearchOutlined />}
            suffix={
              searchTerm && (
                <CloseCircleOutlined
                  style={{ color: '#ccc', cursor: 'pointer' }}
                  onClick={() => handleSearch('')}
                />
              )
            }
          />
        </Col>
      </Row>

      <Table dataSource={filteredExpenses} pagination={{ pageSize: 5 }} rowKey="id">
        <Table.Column title="Si. No." dataIndex="key" key="key" width={50} />
        <Table.Column title="Expense Type" dataIndex="expenseType" key="expenseType" width={200} />
        <Table.Column title="Description" dataIndex="description" key="description" width={250} />
        <Table.Column
          title="Amount"
          dataIndex="amount"
          key="amount"
          render={(amount) => `₹${amount}`}
          width={100}
        />
        <Table.Column title="Payment Mode" dataIndex="paymentMode" key="paymentMode" width={150} />
        <Table.Column title="Expense Date" dataIndex="expenseDate" key="expenseDate" width={150} />
        <Table.Column title="Remarks" dataIndex="remarks" key="remarks" width={200} />
        <Table.Column
          title="Receipt Files"
          dataIndex="receiptFile"
          key="receiptFile"
          render={(receiptFile) => {
            const files = normalizeFileUrlList(receiptFile);
            return files.map((file, index) => (
              <Tag color="blue" key={index}>
                <a onClick={() => openModal(files, index)}>
                  Receipt {index + 1}
                </a>
              </Tag>
            ));
          }}
          width={200}
        />
      </Table>

      <Modal
        visible={visibleModal}
        footer={null}
        onCancel={closeModal}
        centered
        width={800}
        bodyStyle={{
          textAlign: 'center',
          position: 'relative',
          height: '600px', // Fixed modal height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img
          src={currentReceipts[currentImageIndex]}
          alt={`Receipt ${currentImageIndex + 1}`}
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        />
        {currentImageIndex > 0 && (
          <Button
            icon={<FaCircleArrowLeft style={{ fontSize: '30px', color: '#808080' }} />}
            onClick={prevImage}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              border: 'none',
              background: 'transparent'
            }}
          />
        )}
        {currentImageIndex < currentReceipts.length - 1 && (
          <Button
            icon={<FaCircleArrowRight style={{ fontSize: '30px', color: '#808080' }} />}
            onClick={nextImage}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1,
              border: 'none',
              background: 'transparent'
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExpenseReports;
