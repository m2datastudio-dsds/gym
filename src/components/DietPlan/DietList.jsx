import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Row, Col, Typography, Popconfirm, Space, Drawer, notification } from 'antd';
import { SearchOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined, EyeFilled } from '@ant-design/icons';
import { FaPlus } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import AddDietPlan from './AddDietPlan';
import EditDietPlan from './EditDietPlan';
import { getallDietPlans, deleteDietPlan } from '../../Services/data.services';

const { Title } = Typography;

const DietList = () => {
  const [view, setView] = useState('dietlist');
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(8);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedDietPlan, setSelectedDietPlan] = useState(null);
  const [selectedDietPlanId, setSelectedDietPlanId] = useState(null);

  // Media queries for responsiveness
  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 577px) and (max-width: 992px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 993px)' });

  // Fetch diet plans from the backend API
  const fetchDietPlans = async () => {
    try {
      const response = await getallDietPlans();
      const { dietPlans } = response;
      setDataSource(dietPlans);
      setFilteredData(dietPlans);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load diet plans.',
      });
    }
  };

  useEffect(() => {
    fetchDietPlans();
  }, []);

  const parseChartTable = (chartTable) => {
    try {
      return JSON.parse(chartTable);
    } catch (error) {
      console.error('Error parsing chartTable:', error);
      return []; // Return an empty array if parsing fails
    }
  };

  // Function to handle view change
  const handleViewChange = (viewName, dietPlanId = null) => {
    if (viewName === 'editdietplan') {
      setSelectedDietPlanId(dietPlanId);
    }
    setView(viewName);
  };

  // Function to go back to the Diet List view
  const handleBackClick = () => {
    setView('dietlist');
  };

  // Function to handle search input change
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value) {
      const filtered = dataSource.filter((data) =>
        Object.values(data).some((field) =>
          String(field).toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(dataSource);
    }
  };

  // Function to clear search input
  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredData(dataSource);
  };

  // Function to confirm deletion
  const confirmDelete = async (id) => {
    try {
      await deleteDietPlan(id);
      notification.success({
        message: 'Success',
        description: 'Diet plan deleted successfully!',
      });
      fetchDietPlans();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete diet plan.',
      });
    }
  };

  // Function to handle view button click
  const handleView = (dietPlan) => {
    setSelectedDietPlan(dietPlan);
    setDrawerVisible(true);
  };

  // Function to open file in a new tab
  const handleOpenFile = (fileUrl) => {
    const newWindow = window.open();

    const imageWidth = '800px';
    const imageHeight = '600px';

    newWindow.document.write(`
      <html>
        <head>
          <title>Plan File</title>
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: #f0f0f0;
            }
            img {
              max-width: ${imageWidth};
              max-height: ${imageHeight};
              object-fit: contain;
              box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
            }
          </style>
        </head>
        <body>
          <img src="${fileUrl}" alt="Plan Image" />
        </body>
      </html>
    `);
    newWindow.document.close();
  };

  // Pagination configuration
  const paginationConfig = {
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['8', '16', '24', '32'],
    onShowSizeChange: (current, size) => setPageSize(size),
  };

  return (
    <div style={{ marginTop: '-10px' }}>
      {view === 'dietlist' && (
        <>
          <Title level={3} style={{ marginBottom: '20px' }}>Diet Plan</Title>

          {/* Search and Add Diet Plan Section */}
          <Row gutter={16} style={{ marginBottom: '20px', alignItems: 'center' }}>
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Search"
                value={searchTerm}
                className="search-input"
                onChange={(e) => handleSearch(e.target.value)}
                prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                suffix={
                  searchTerm && (
                    <CloseCircleOutlined
                      style={{ color: '#ccc', cursor: 'pointer' }}
                      onClick={handleClearSearch}
                    />
                  )
                }
              />
            </Col>
            <Col xs={24} sm={12} md={8} style={{ marginTop: isSmallScreen ? '10px' : 0 }}>
              <Button type="primary" onClick={() => handleSearch(searchTerm)} style={{ width: isSmallScreen ? '100%' : 'auto' }}>
                Search
              </Button>
              <Button type="default" onClick={handleClearSearch} style={{ marginLeft: isSmallScreen ? '0' : '8px', marginTop: isSmallScreen ? '10px' : 0, width: isSmallScreen ? '100%' : 'auto' }}>
                Clear
              </Button>
            </Col>
            <Col xs={24} sm={24} md={8} style={{ textAlign: isSmallScreen ? 'center' : 'right', marginTop: isSmallScreen ? '10px' : 0 }}>
              <Button type="primary" icon={<FaPlus />} onClick={() => handleViewChange('adddietplan')}>
                Add Diet Plan
              </Button>
            </Col>
          </Row>

          {/* Diet List Table */}
          <Table
            dataSource={searchTerm ? filteredData : dataSource}
            bordered
            rowKey="id"
            pagination={paginationConfig}
          >
            {!isSmallScreen && (
              <Table.Column
                title="Si.No"
                key="index"
                render={(text, record, index) => index + 1}
              />
            )}
            <Table.Column title="Chart Name" dataIndex="chartName" key="chartName" />
            <Table.Column title="Assigned Count" dataIndex="assignedCount" key="assignedCount" />

            {/* Only show the "Assign" column on non-small screens */}
            {!isSmallScreen && (
              <Table.Column title="Assign" dataIndex="assign" key="assign" />
            )}

            <Table.Column
              title="View"
              key="view"
              render={(text, record) => (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    type='text'
                    icon={<EyeFilled style={{ fontSize: '22px', color: '#1890ff' }} />}
                    onClick={() => handleView(record)}
                  />
                </div>
              )}
            />
            <Table.Column
              title="Actions"
              key="actions"
              render={(text, record) => (
                <Space size="middle" style={{ display: 'flex', alignItems: 'center' }}>
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleViewChange('editdietplan', record.id)}></Button>
                  <Popconfirm
                    title="Are you sure to delete this diet plan?"
                    onConfirm={() => confirmDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" danger icon={<DeleteOutlined />} />
                  </Popconfirm>
                </Space>
              )}
            />
          </Table>
        </>
      )}

      {/* Drawer to view diet plan details */}
      <Drawer
        title="Diet Plan Details"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={isLargeScreen ? 800 : isMediumScreen ? 700 : 400}
      >
        {selectedDietPlan && (
          <div>
            <Typography.Title level={3}>{selectedDietPlan.chartName}</Typography.Title>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={12}>
                <p><strong>Assigned To:</strong> {selectedDietPlan.assign}</p>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={6}>
                <p><strong>Assigned Count:</strong> {selectedDietPlan.assignedCount}</p>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={6}>
                <p><strong>Created Date:</strong> {moment(selectedDietPlan.createdDate).format('DD-MM-YYYY')}</p>
              </Col>
            </Row>

            {/* Add the File URL here */}
            {selectedDietPlan.file && (
              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col xs={24} sm={12}>
                  <p><strong>Plan File:</strong> <Button type="link" onClick={() => handleOpenFile(selectedDietPlan.file)}>Open File</Button></p>
                </Col>
              </Row>
            )}

            <Typography.Title level={4}>Chart Table:</Typography.Title>
            <Table
              bordered
              pagination={false}
              dataSource={parseChartTable(selectedDietPlan.chartTable).flatMap((day, dayIndex) =>
                day.meals.map((meal, mealIndex) => ({ day: day.day, meal, isFirstMeal: mealIndex === 0, mealCount: day.meals.length }))
              )}
              rowKey={(record, index) => `${record.day}-${index}`}
            >
              <Table.Column
                title="Day"
                dataIndex="day"
                key="day"
                align="center"
                render={(text, record, index) => {
                  if (record.isFirstMeal) {
                    return {
                      children: <strong>{record.day}</strong>,
                      props: { rowSpan: record.mealCount }
                    };
                  } else {
                    return { props: { rowSpan: 0 } };
                  }
                }}
              />
              <Table.Column
                title="Food"
                key="Food"
                align="center"
                render={(text, record) => record.meal.Food}
              />
              <Table.Column
                title="Time"
                key="Time"
                align="center"
                render={(text, record) => record.meal.Time}
              />
              <Table.Column
                title="Calories"
                key="Calorie"
                align="center"
                render={(text, record) => record.meal.Calorie}
              />
              <Table.Column
                title="Quantity"
                key="Quantity"
                align="center"
                render={(text, record) => record.meal.Quantity}
              />
              <Table.Column
                title="Video Link"
                key="VideoLink"
                align="center"
                render={(text, record) => (
                  <a href={record.meal.VideoLink} target="_blank" rel="noopener noreferrer">{record.meal.VideoLink}</a>
                )}
              />
            </Table>
          </div>
        )}
      </Drawer>

      {/* Conditional Rendering for Add and Edit Diet Plan Components */}
      {view === 'adddietplan' && <AddDietPlan onBack={handleBackClick} onSaveSuccess={fetchDietPlans} />}
      {view === 'editdietplan' && selectedDietPlanId && (
        <EditDietPlan onBack={handleBackClick} dietPlanId={selectedDietPlanId} onSaveSuccess={fetchDietPlans} />
      )}
    </div>
  );
};

export default DietList;
