import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Select, Row, Col, DatePicker, Form, Typography, Popconfirm, Space, Modal, notification } from 'antd';
import { SearchOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { saveEnquiry, getallEnquiries, updateEnquiry, deleteEnquiry } from '../../Services/data.services';
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

const Enquiry = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [form] = Form.useForm();

  // Media queries for responsiveness
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumOrLargeScreen = useMediaQuery({ query: '(min-width: 768px)' });

  // Fetch enquiry data from the backend
  const fetchEnquiries = async () => {
    try {
      const data = await getallEnquiries();
      const formattedData = data.enquiries.map((item, index) => ({
        ...item,
        key: index + 1,
        name: `${item.firstName} ${item.lastName}`,
        enquiryDate: item.enquiryDate ? moment.utc(item.enquiryDate).format('YYYY-MM-DD') : '',
        expectedJoiningDate: item.expectedJoiningDate ? moment.utc(item.expectedJoiningDate).format('YYYY-MM-DD') : ''
      }));
      setDataSource(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load enquiries.',
        placement: 'topRight',
      });
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(value, filterStatus);
  };

  const handleStatusFilter = (value) => {
    const statusValue = value || 'All';
    setFilterStatus(statusValue);
    applyFilters(searchTerm, statusValue);
  };

  const applyFilters = (searchTerm, filterStatus) => {
    let filtered = dataSource;
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobileNumber.includes(searchTerm)
      );
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    setFilteredData(filtered);
  };

  const handleAddEnquiry = () => {
    setShowForm(true);
  };

  const handleBack = () => {
    setShowForm(false);
  };

  const handleFormSubmit = async (values) => {
    const formattedValues = {
      ...values,
       enquiryDate: values.enquiryDate ? values.enquiryDate.format('YYYY-MM-DD') : null,
    expectedJoiningDate: values.expectedJoiningDate ? values.expectedJoiningDate.format('YYYY-MM-DD') : null,
    followUpDate: values.followupDate ? values.followupDate.format('YYYY-MM-DD') : null,
    };
    console.log("Formatted Values Sent:", formattedValues);


    try {
      await saveEnquiry(formattedValues);
      console.log(formattedValues)
      notification.success({
        message: 'Success',
        description: 'Enquiry created successfully!',
        placement: 'topRight',
      });
      handleBack();
      fetchEnquiries();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to save enquiry. Please try again.',
        placement: 'topRight',
      });
    }
  };

  const handleEdit = (record) => {
    setSelectedEnquiry(record);
    setEditModalVisible(true);
    form.setFieldsValue({
      ...record,
      enquiryDate: record.enquiryDate ? moment.utc(record.enquiryDate, 'YYYY-MM-DD') : null,
      expectedJoiningDate: record.expectedJoiningDate ? moment.utc(record.expectedJoiningDate, 'YYYY-MM-DD') : null,
      followupDate: record.followUpDate ? moment.utc(record.followUpDate, 'YYYY-MM-DD') : null,
    });
  };


  const handleEditSubmit = async (values) => {
    const updatedValues = {
      ...values,
      enquiryDate: values.enquiryDate ? values.enquiryDate.format('YYYY-MM-DD') : null,
      expectedJoiningDate: values.expectedJoiningDate ? values.expectedJoiningDate.format('YYYY-MM-DD') : null,
      followUpDate: values.followupDate ? values.followupDate.format('YYYY-MM-DD') : null,
    };

    console.log('Updated Enquiry Payload:', updatedValues);

    try {
      // Ensure `selectedEnquiry.id` is passed correctly
    if (!selectedEnquiry?.id) {
      throw new Error('Enquiry ID is missing');
    }
      await updateEnquiry(selectedEnquiry.id, updatedValues);
      notification.success({
        message: 'Success',
        description: 'Enquiry updated successfully!',
        placement: 'topRight',
      });
      setEditModalVisible(false);
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry:', error);  
      notification.error({
        message: 'Error',
        description:error.response?.data?.message || 'Failed to update enquiry. Please try again.',
        placement: 'topRight',
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEnquiry(id);
      notification.success({
        message: 'Success',
        description: 'Enquiry deleted successfully!',
        placement: 'topRight',
      });
      fetchEnquiries();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete enquiry. Please try again.',
        placement: 'topRight',
      });
    }
  };

  return (
    <div style={{ padding: '15px', marginTop: '-15px' }}>
      <Title level={3} style={{ marginBottom: '15px' }}>Enquiry</Title>
      {showForm ? (
        <>
          <Button type="primary" onClick={handleBack} style={{ marginBottom: '30px' }}>
            Back
          </Button>
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="First Name" name="firstName"
                  rules={[
                    { required: true, message: 'Please input your first name!' },
                    { pattern: /^[A-Za-z]+$/, message: 'First name should contain only letters!' }
                  ]}>
                  <Input size='large' style={{ textTransform: 'capitalize' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Last Name" name="lastName"
                  rules={[
                    { pattern: /^[A-Za-z]+$/, message: 'Last name should contain only letters!' }
                  ]}>
                  <Input size='large' style={{ textTransform: 'capitalize' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Mobile Number" name="mobileNumber"
                  rules={[
                    { required: true, message: 'Please input your mobile number!' },
                    { pattern: /^\d{10}$/, message: 'Enter a correct mobile number!' }]}>
                  <Input maxLength={10} size='large' />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Email Id" name="email" rules={[{ type: 'email', message: 'Please enter a valid email address!' }]}>
                  <Input size='large' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Alternate Contact" name="alternateContact"
                  rules={[{ pattern: /^\d{10}$/, message: 'Enter a correct mobile number!' }]}>
                  <Input maxLength={10} size='large' />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Enquiry For" name="enquiryFor" rules={[{ required: true, message: 'Enter a message for enquiry!' }]}>
                  <Input size='large' style={{ textTransform: 'capitalize' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Please select a status!' }]}>
                  <Select size='large'>
                    <Option value="Pending">Pending</Option>
                    <Option value="Completed">Completed</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="How to Know About Us?" name="howToKnowAboutUs">
                  <Select size='large'>
                    <Option value="Friend">Friend</Option>
                    <Option value="Online">Online</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label="Enquiry Date"
                  name="enquiryDate"
                  rules={[{ required: true, message: 'Please select an enquiry date!' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    size="large"
                    format="YYYY-MM-DD"
                    getPopupContainer={(trigger) => trigger.parentNode} // Fixes dropdown position
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Expected Joining Date" name="expectedJoiningDate">
                  <DatePicker
                    style={{ width: '100%' }}
                    size="large"
                    format="YYYY-MM-DD"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Form.Item
                  label="Follow-up Date"
                  name="followupDate"
                  rules={[{ required: true, message: 'Please select a follow-up date!' }]}
                >
                  <DatePicker
                    style={{ width: '100%' }}
                    size="large"
                    format="YYYY-MM-DD"
                    getPopupContainer={(trigger) => trigger.parentNode}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} md={6}>
                <Form.Item label="Remarks" name="remarks">
                  <Input.TextArea rows={1} size='large' style={{ textTransform: 'capitalize' }} />
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
              Save
            </Button>
            <Button type="default" onClick={handleBack} style={{ marginLeft: '8px', marginTop: '20px' }}>
              Cancel
            </Button>
          </Form>
        </>
      ) : (
        <>
          <Row gutter={[8, 8]} style={{ marginBottom: '20px', marginTop: '20px' }}>
            <Col xs={24} sm={12} md={4}>
              <Input
                placeholder="Search"
                value={searchTerm}
                className="search-input"
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: '100%' }}
                prefix={<SearchOutlined style={{ color: '#ccc' }} />}
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
            <Col xs={24} sm={12} md={4}>
              <Select
                defaultValue="All"
                value={filterStatus}
                onChange={handleStatusFilter}
                allowClear
                style={{ width: '100%' }}
              >
                <Option value="All">All</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={16} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={handleAddEnquiry}>
                Add Enquiry
              </Button>
            </Col>
          </Row>
          <Table
            dataSource={filteredData}
            pagination={{ pageSize: 20, showSizeChanger: true }}
            scroll={isSmallScreen ? { x: false } : null} // Disable horizontal scroll on small screens
            size={isSmallScreen ? 'small' : 'default'} // Make table smaller on small screens
          >
            {/* Columns for small screens */}
            {isSmallScreen && (
              <>
                <Table.Column title="Name" dataIndex="name" key="name" />
                <Table.Column title="Enquiry For" dataIndex="enquiryFor" key="enquiryFor" />
                <Table.Column
                  title="Action"
                  key="action"
                  render={(_, record) => (
                    <Space>
                      <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                      <Popconfirm
                        title="Are you sure to delete this enquiry?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Space>
                  )}
                />
              </>
            )}
            {/* Columns for medium and large screens */}
            {isMediumOrLargeScreen && (
              <>
                <Table.Column title="Si. No." dataIndex="key" key="key" />
                <Table.Column title="Name" dataIndex="name" key="name" />
                <Table.Column title="Mobile No." dataIndex="mobileNumber" key="mobileNumber" />
                <Table.Column title="Enquiry For" dataIndex="enquiryFor" key="enquiryFor" />
                <Table.Column title="Email Id" dataIndex="email" key="email" />
                <Table.Column title="Alternate Contact" dataIndex="alternateContact" key="alternateContact" />
                <Table.Column title="Status" dataIndex="status" key="status" />
                <Table.Column
                  title="Enquiry Date"
                  dataIndex="enquiryDate"
                  key="enquiryDate"
                  render={(date) => (date ? moment(date).format('YYYY-MM-DD') : 'N/A')}
                />
                <Table.Column
                  title="Expected Joining Date"
                  dataIndex="expectedJoiningDate"
                  key="expectedJoiningDate"
                  render={(date) => (date ? moment(date).format('YYYY-MM-DD') : 'N/A')}
                />
                <Table.Column
                  title="Follow-up Date"
                  dataIndex="followUpDate"
                  key="followUpDate"
                  render={(date) => (date ? moment(date).format('YYYY-MM-DD') : 'N/A')}
                />
                <Table.Column
                  title="Action"
                  key="action"
                  render={(_, record) => (
                    <Space>
                      <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                      <Popconfirm
                        title="Are you sure to delete this enquiry?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" danger icon={<DeleteOutlined />} />
                      </Popconfirm>
                    </Space>
                  )}
                />
              </>
            )}
          </Table>

          {/* Edit Modal */}
          <Modal
            title="Edit Enquiry"
            visible={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            footer={null}
            width={isSmallScreen ? '80%' : 700}
            style={{ top: '20px', left: isSmallScreen ? '8%' : '0' }}
          >
            <Form layout="vertical" form={form} onFinish={handleEditSubmit}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: 'Please input your first name!' },
                      { pattern: /^[A-Za-z]+$/, message: 'First name should contain only letters!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Last Name" name="lastName"
                    rules={[
                      { pattern: /^[A-Za-z]+$/, message: 'Last name should contain only letters!' }
                    ]}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Mobile Number"
                    name="mobileNumber"
                    rules={[
                      { required: true, message: 'Please input your mobile number!' },
                      { pattern: /^\d{10}$/, message: 'Enter a correct mobile number!' }
                    ]}
                  >
                    <Input maxLength={10} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item label="Email Id" name="email">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item label="Alternate Contact" name="alternateContact"
                    rules={[
                      { pattern: /^\d{10}$/, message: 'Enter a correct mobile number!' }
                    ]}>
                    <Input maxLength={10} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Enquiry For"
                    name="enquiryFor"
                    rules={[{ required: true, message: 'Please enter a message for enquiry!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[{ required: true, message: 'Please select a status!' }]}
                  >
                    <Select>
                      <Option value="Pending">Pending</Option>
                      <Option value="Completed">Completed</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item label="How to Know About Us?" name="howToKnowAboutUs">
                    <Select>
                      <Option value="Friend">Friend</Option>
                      <Option value="Online">Online</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Enquiry Date"
                    name="enquiryDate"
                    rules={[{ required: true, message: 'Please select an enquiry date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' allowClear />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item label="Expected Joining Date" name="expectedJoiningDate">
                    <DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item
                    label="Follow-up Date"
                    name="followupDate"
                    rules={[{ required: true, message: 'Please select a follow-up date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} format='YYYY-MM-DD' />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12}>
                  <Form.Item label="Remarks" name="remarks">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>

              <Button type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
                Update
              </Button>
            </Form>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Enquiry;
