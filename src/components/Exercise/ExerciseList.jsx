import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table, Typography, Popconfirm, Input, Space, Drawer, notification } from 'antd';
import { FaPlus } from 'react-icons/fa';
import { SearchOutlined, CloseCircleOutlined, EditOutlined, DeleteOutlined, EyeFilled } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getallExercisePlans, deleteExercisePlan } from '../../Services/data.services';  // Import deleteExercisePlan API
import AddExercise from './AddExercise';
import EditExercise from './EditExercise';
import moment from 'moment';

const { Title } = Typography;

const ExerciseList = () => {
  const [view, setView] = useState('exerciselist');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [exercisePlans, setExercisePlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(8);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedExercisePlan, setSelectedExercisePlan] = useState(null);
  const [selectedExercisePlanId, setSelectedExercisePlanId] = useState(null);

  // Media queries for responsiveness
  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });

  // Function to fetch exercise plans
  const fetchExercisePlans = async () => {
    setLoading(true);
    try {
      const response = await getallExercisePlans();
      if (response.code === 200) {
        setExercisePlans(response.data);
        setFilteredData(response.data);
      } else {
        notification.error({
          message: 'Error',
          description: response.message || 'Failed to fetch exercise plans',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch exercise plans',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch exercise plans on component mount
  useEffect(() => {
    fetchExercisePlans();
  }, []);

  // Function to handle view change
  const handleViewChange = (viewName, exercisePlanId = null) => {
    if (viewName === 'editexerciseplan') {
      setSelectedExercisePlanId(exercisePlanId);
    }
    setView(viewName);
  };

  // Function to go back to the Exercise List view
  const handleBackClick = () => {
    setView('exerciselist');
  };

  // Function to handle search input change
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value) {
      const filtered = exercisePlans.filter((data) =>
        Object.values(data).some((field) =>
          String(field).toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(exercisePlans);
    }
  };

  // Function to clear search input
  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredData(exercisePlans);
  };

  // Function to confirm deletion
  const confirmDelete = async (id) => {
    try {
      await deleteExercisePlan(id); // Call the delete API
      notification.success({
        message: 'Success',
        description: 'Exercise plan deleted successfully!',
      });
      fetchExercisePlans(); // Refresh the list after deletion
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete exercise plan.',
      });
    }
  };

  // Function to handle view button click (show drawer)
  const handleView = (exercisePlan) => {
    setSelectedExercisePlan(exercisePlan);
    setDrawerVisible(true);
  };

  // Pagination configuration
  const paginationConfig = {
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['8', '16', '24', '32'],
    onShowSizeChange: (current, size) => setPageSize(size),
  };

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

  return (
    <div style={{ marginTop: '-10px' }}>
      {view === 'exerciselist' && (
        <>
          <Title level={3} style={{ marginBottom: '20px' }}>Exercise Plan</Title>

          {/* Search and Add Exercise Plan Section */}
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
              <Button type="primary" icon={<FaPlus />} onClick={() => handleViewChange('addexerciseplan')}>
                Add Exercise Plan
              </Button>
            </Col>
          </Row>

          {/* Exercise List Table */}
          <Table
            dataSource={filteredData}
            bordered
            pagination={paginationConfig}
            loading={loading}
            rowKey="id"
          >
            {!isSmallScreen && (
              <Table.Column
                title="Si.No"
                key="index"
                render={(text, record, index) => index + 1}
              />
            )}
            <Table.Column title="Exercise Plan Name" dataIndex="planname" key="planname" />
            {!isSmallScreen && (
              <Table.Column
                title="Created Date"
                dataIndex="createdDate"
                key="createdDate"
                render={(text) => moment(text).format('DD-MM-YYYY')}
              />
            )}
            <Table.Column title="Assign" dataIndex="assign" key="assign" />
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
                  <Button type="link" icon={<EditOutlined />} onClick={() => handleViewChange('editexerciseplan', record.id)}></Button>
                  <Popconfirm
                    title="Are you sure to delete this plan?"
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

      {/* Drawer to view exercise plan details */}
      <Drawer
        title="Exercise Plan Details"
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={isSmallScreen ? 400 : 700}
      >
        {selectedExercisePlan && (
          <div>
            <Typography.Title level={3}>{selectedExercisePlan.planname}</Typography.Title>

            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={12}>
                <p><strong>Assigned To:</strong> {selectedExercisePlan.assign}</p>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={12}>
                <p><strong>Created Date:</strong> {moment(selectedExercisePlan.createdDate).format('DD-MM-YYYY')}</p>
              </Col>
            </Row>

            {selectedExercisePlan.file && (
              <Row gutter={16} style={{ marginBottom: '16px' }}>
                <Col xs={24} sm={12}>
                  <p><strong>Plan File:</strong>
                    <Button type='link' onClick={() => handleOpenFile(selectedExercisePlan.file)}>Open File</Button></p>
                </Col>
              </Row>
            )}

            <Typography.Title level={4}>Details:</Typography.Title>
            <Table
              bordered
              pagination={false}
              dataSource={
                JSON.parse(selectedExercisePlan.details).flatMap((day, dayIndex) =>
                  day.exercises.map((exercise, exerciseIndex) => ({
                    day: day.day,
                    exercise,
                    isFirstExercise: exerciseIndex === 0,
                    exerciseCount: day.exercises.length
                  }))
                )
              }
              rowKey={(record, index) => `${record.day}-${index}`}
            >
              <Table.Column
                title="Day"
                dataIndex="day"
                key="day"
                align="center"
                render={(text, record) => {
                  if (record.isFirstExercise) {
                    return {
                      children: <strong>{record.day}</strong>,
                      props: { rowSpan: record.exerciseCount }
                    };
                  } else {
                    return { props: { rowSpan: 0 } };
                  }
                }}
              />
              <Table.Column title="Exercise" dataIndex={['exercise', 'exercise']} key="exercise" />
              <Table.Column title="Reps & Sets" dataIndex={['exercise', 'repsSets']} key="repsSets" />
              <Table.Column
                title="Video Link"
                key="videoLink"
                render={(text, record) => (
                  <a href={record.exercise.videoLink} target="_blank" rel="noopener noreferrer">{record.exercise.videoLink}</a>
                )}
              />
            </Table>
          </div>
        )}
      </Drawer>


      {/* Conditional Rendering for Add and Edit Exercise Plan Components */}
      {view === 'addexerciseplan' && <AddExercise onBack={handleBackClick}
        onSaveSuccess={() => {
          setView('exerciselist');
          fetchExercisePlans();
        }} />}
      {view === 'editexerciseplan' && selectedExercisePlanId && (
        <EditExercise
          exercisePlanId={selectedExercisePlanId}
          onBack={handleBackClick}
          onSaveSuccess={() => {
            setView('exerciselist');
            fetchExercisePlans();
          }}
        />
      )}
    </div>
  );
};

export default ExerciseList;
