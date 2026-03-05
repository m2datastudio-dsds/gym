import React, { useState, useEffect } from 'react';
import { Table, Typography, Space, Popconfirm, Pagination, Input, Button, Modal, Form, InputNumber, Switch, Row, Col, notification, Spin } from 'antd';
import { SearchOutlined, CloseCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllPackages, savePackage, updatePackage, deletePackage } from '../../Services/data.services';
import { useMediaQuery } from 'react-responsive';

const { Column } = Table;

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [currentPackage, setCurrentPackage] = useState(null);

  // Define breakpoints
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const result = await getAllPackages();
      if (result.code === 200) {
        setPackages(result.packages);
      } else {
        console.error('Failed to fetch packages:', result.message);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredPackages = packages.filter(pkg =>
    pkg.packageCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.packageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.amount.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(pkg.createdAt).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPackages = filteredPackages.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleAddPackage = () => {
    setIsAddModalVisible(true);
  };

  const handleCancelAdd = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  const handleSavePackage = async (values) => {
    console.log("Saving package:", values);  // Debug log
    try {
      setLoading(true);  // Loading spinner start
      values.active = values.active ? true : false;  // Ensure active is boolean
  
      const result = await savePackage(values);  // Saving package API call
  
      if (result.code === 200 || result.code === 201) {
        notification.success({
          message: 'Success',
          description: 'Package saved successfully!',
        });
        handleCancelAdd();  // Close the modal
        form.resetFields();  // Reset form fields
        
        // Instead of full page refresh, just update data
        const updatedPackages = await getAllPackages();  // Re-fetch updated package list
        setPackages(updatedPackages.packages);  // Update state with new data
  
      } else {
        notification.error({
          message: 'Error',
          description: result.message,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error saving package.',
      });
      console.error('Error saving package:', error);
    } finally {
      setLoading(false);  // Loading spinner end
    }
  };
  


  const handleEditPackage = async (values) => {
    console.log("Updating package:", values);  // Debug log to ensure it's called with correct values
    try {
      setLoading(true);  // Show loading spinner during update operation
      values.active = values.active ? true : false;  // Ensure active is boolean
  
      const result = await updatePackage(currentPackage.id, values);  // Send updated values to API
      if (result.code === 200) {
        notification.success({
          message: 'Success',
          description: 'Package updated successfully!',
        });
        handleCancelEdit();  // Close the edit modal
        await fetchPackages();  // Fetch updated package list after updating (no page reload needed)
      } else {
        notification.error({
          message: 'Error',
          description: result.message,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error updating package.',
      });
      console.error('Error updating package:', error);
    } finally {
      setLoading(false);  // Hide spinner after operation
    }
  };
  
  
  

  const handleDeletePackage = async (id) => {
    try {
      setLoading(true);  // Show loading spinner during delete operation
      const result = await deletePackage(id);
      if (result.code === 200) {
        notification.success({
          message: 'Success',
          description: 'Package deleted successfully!',
        });
        await fetchPackages();  // Fetch packages after deleting
      } else {
        notification.error({
          message: 'Error',
          description: result.message,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Error deleting package.',
      });
      console.error('Error deleting package:', error);
    } finally {
      setLoading(false);  // Hide spinner after operation
    }
  };

  const openEditModal = (pkg) => {
    setCurrentPackage(pkg);
    editForm.setFieldsValue({
      packageName: pkg.packageName,
      month: pkg.month,
      day: pkg.day,
      amount: pkg.amount,
      active: pkg.active,
    });
    setIsEditModalVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent form submission from reloading the page
    handleEditPackage(e);
  };
  

  return (
    <Spin spinning={loading}> {/* Add a spinner to show loading state */}
      <div className='container'>
        <Typography.Title level={2} style={{ color: '#0A21C0' }} className='title'>Packages</Typography.Title>

        {/* Header with search and add button */}
        <div className='header'>
          <Input
            placeholder='Search'
            value={searchTerm}
            className='search-input'
            onChange={(e) => handleSearch(e.target.value)}
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
          <Button type='primary' icon={<PlusOutlined />} onClick={handleAddPackage}>
            Add Package
          </Button>
        </div>

        {/* Table container */}
        <div className='table-container'>
          <Table
            bordered
            dataSource={paginatedPackages}
            pagination={false}
            rowKey="id"
            className='responsive-table'
            size={isSmallScreen ? 'small' : 'middle'}
            scroll={isSmallScreen ? { x: '100%' } : undefined}
          >
            {(isMediumScreen || isLargeScreen) && (
              <Column title="SI.no" render={(text, record, index) => (currentPage - 1) * rowsPerPage + index + 1} />
            )}
            {(isMediumScreen || isLargeScreen) && (
              <Column title="Package code" dataIndex="packageCode" key="packageCode" />
            )}
            <Column title='Package Name' dataIndex="packageName" key="packageName" />
            {(isMediumScreen || isLargeScreen) && (
              <Column
                title="Duration"
                key="duration"
                sorter={(a, b) => (a.month * 30 + a.day) - (b.month * 30 + b.day)}
                render={(text, record) => `${record.month} months ${record.day} days`}
              />
            )}
            <Column
              title='Amount'
              dataIndex="amount"
              key="amount"
              sorter={(a, b) => a.amount - b.amount}
            />
            {(isMediumScreen || isLargeScreen) && (
              <Column title="CreatedAt" dataIndex="createdAt" key="createdAt"
                render={(text, record) => {
                  const date = new Date(record.createdAt);
                  return date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  });
                }}
              />
            )}
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Button type='link' icon={<EditOutlined />} onClick={() => openEditModal(record)}></Button>
                  <Popconfirm
                    title="Are you sure to delete this package?"
                    onConfirm={() => handleDeletePackage(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type='primary' danger icon={<DeleteOutlined />}></Button>
                  </Popconfirm>
                </Space>
              )}
            />
          </Table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <Pagination
            className="pagination"
            current={currentPage}
            pageSize={rowsPerPage}
            pageSizeOptions={['5', '10', '20', '50']} // Page size options
            showSizeChanger
            showQuickJumper
            total={filteredPackages.length}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setRowsPerPage(pageSize); // Update rowsPerPage when page size changes
            }}
          />
        </div>

      </div>


      <Modal
        title="Add Package"
        visible={isAddModalVisible}
        onCancel={handleCancelAdd}
        footer={null}
        width={isSmallScreen ? '80%' : isMediumScreen ? '60%' : '40%'}  // Further reduced width for small screens
        style={{ top: isSmallScreen ? '5%' : '10%', marginRight: isSmallScreen ? '10px' : 'auto' }}  // Added margin to prevent overlap with sidenav
        bodyStyle={{ padding: isSmallScreen ? '16px' : '24px' }} // Adjust padding for small screens
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSavePackage}  // Already handling form submission correctly here
        >
          <Form.Item
            name="packageName"
            label="Package Name"
            rules={[{ required: true, message: 'Please input the package name!' }]}
          >
            <Input size='large' />
          </Form.Item>
          <Row gutter={16}>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="month"
                label="Month"
                rules={[{ required: true, message: 'Please input the month!' }]}
              >
                <InputNumber min={0} size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="day"
                label="Day"
                rules={[{ required: true, message: 'Please input the day!' }]}
              >
                <InputNumber min={0} size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Please input the amount!' }]}
              >
                <InputNumber min={0} size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="active"
                label="Active"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit"> {/* The submit button */}
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>


      <Modal
        title="Edit Package"
        visible={isEditModalVisible}
        onCancel={handleCancelEdit}
        footer={null}
        width={isSmallScreen ? '80%' : isMediumScreen ? '60%' : '40%'}  // Further reduced width for small screens
        style={{ top: isSmallScreen ? '5%' : '10%', marginRight: isSmallScreen ? '10px' : 'auto' }}  // Added margin to prevent overlap with sidenav
        bodyStyle={{ padding: isSmallScreen ? '16px' : '24px' }} // Adjust padding for small screens
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditPackage}
        >
          <Form.Item
            name="packageName"
            label="Package Name"
            rules={[{ required: true, message: 'Please input the package name!' }]}
          >
            <Input size='large' />
          </Form.Item>
          <Row gutter={16}>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="month"
                label="Month"
                rules={[{ required: true, message: 'Please input the month!' }]}
              >
                <InputNumber min={0} size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="day"
                label="Day"
                rules={[{ required: true, message: 'Please input the day!' }]}
              >
                <InputNumber min={0} size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Please input the amount!' }]}
              >
                <InputNumber min={0} size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : 12}>
              <Form.Item
                name="active"
                label="Active"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
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
          justify-content: space-between;
          width: 100%;
          flex-direction: ${isSmallScreen ? 'column' : 'row'};
          align-items: ${isSmallScreen ? 'stretch' : 'center'};
        }

        .search-input {
          width: 100%;
          max-width: 300px;
          margin-right: ${isSmallScreen ? '0' : '10px'};
          margin-bottom: ${isSmallScreen ? '10px' : '0'};
        }

        .table-container {
          width: 100%;
          overflow-x: ${isSmallScreen ? 'auto' : 'hidden'}; /* Enable horizontal scroll on small screens */
        }

        .pagination-container {
          margin-top: 15px;
          display: flex;
          justify-content: center;
          width: 100%;
        }
      `}</style>
    </Spin>
  );
};

export default Packages;
