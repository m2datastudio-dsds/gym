import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Tabs, Descriptions, Tag, Spin, Modal } from 'antd';
import { getMemberById } from '../../Services/data.services';
import moment from 'moment';

const { TabPane } = Tabs;

const MemberDetails = ({ memberId, goBack }) => {
  const [memberDetails, setMemberDetails] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState('1');
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [modalWidth, setModalWidth] = useState('80%'); 
  
  // Fetch member details only once on mount
  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await getMemberById(memberId);
        if (response.code === 200) {
          setMemberDetails(response.member);
        } else {
          console.error('Failed to fetch member details:', response.message);
        }
      } catch (error) {
        console.error('Error fetching member details:', error);
      }
    };

    if (memberId) {
      fetchMemberDetails();
    }
  }, [memberId]);

  // Adjust the modal width dynamically based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setModalWidth('90%'); // For small screens
      } else if (window.innerWidth <= 1024) {
        setModalWidth('70%'); // For medium screens
      } else {
        setModalWidth('50%'); // For large screens
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial width
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
  }, []);

  if (!memberDetails) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
        <Spin size="large" /> 
      </div>
    );
  }

  const permanentAddress = memberDetails.permanentAddress[0];
  const communicationAddress = memberDetails.communicationAddress[0];

  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Render the content dynamically based on the active tab
  const renderContent = () => {
    const detailsSectionStyle = {
      background: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '15px',
    };

    switch (activeTabKey) {
      case '1':
        return (
          <>
            <Row style={detailsSectionStyle} gutter={16} align="middle" justify="start">
              <Col xs={24} sm={6} lg={6}>
                <img
                  src={memberDetails.memberPhoto ? memberDetails.memberPhoto.replace(/\\/g, '/') : 'https://via.placeholder.com/150'}
                  alt="Member Avatar"
                  style={{ width: '100%', maxWidth: '100px', borderRadius: '50%' }}
                />
              </Col>
              <Col xs={24} sm={18} lg={18}>
                <h2>{`${memberDetails.firstName} ${memberDetails.lastName}`}</h2>
                <p style={{ fontSize: '16px' }}> {memberDetails.memberID}</p>
                <p style={{ fontSize: '16px' }}>{memberDetails.packageType}</p>
                <p style={{ fontSize: '16px' }}>
                  {memberDetails.active ? (
                    <Tag color="green">Active</Tag>
                  ) : (
                    <Tag color="red">Inactive</Tag>
                  )}
                </p>
              </Col>
            </Row>

            <Row style={detailsSectionStyle} gutter={16}>
              <Col xs={24} sm={12} lg={6}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="First Name">{memberDetails.firstName}</Descriptions.Item>
                  <Descriptions.Item label="Email Address">{memberDetails.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{memberDetails.mobileNumber}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Last Name">{memberDetails.lastName}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{memberDetails.gender}</Descriptions.Item>
                  <Descriptions.Item label="Date of Birth">{moment(memberDetails.dateOfBirth).format('DD-MM-YYYY')}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Marital Status">{memberDetails.maritalStatus}</Descriptions.Item>
                  <Descriptions.Item label="BloodGroup">{memberDetails.bloodGroup}</Descriptions.Item>
                  <Descriptions.Item label="Home Contact Number">{memberDetails.homeContactNumber}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </>
        );
      case '2':
        return (
          <>
            <Row style={detailsSectionStyle} gutter={16}>
              <Col xs={24} sm={12}>
                <Descriptions title="Permanent Address" layout="vertical" column={2} size="middle">
                  <Descriptions.Item label="Building No">{permanentAddress.buildingNo}</Descriptions.Item>
                  <Descriptions.Item label="Street">{permanentAddress.street}</Descriptions.Item>
                  <Descriptions.Item label="Area">{permanentAddress.area}</Descriptions.Item>
                  <Descriptions.Item label="District">{permanentAddress.district}</Descriptions.Item>
                  <Descriptions.Item label="State">{permanentAddress.state}</Descriptions.Item>
                  <Descriptions.Item label="PostalCode">{permanentAddress.postalCode}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12}>
                <Descriptions title="Communication Address" layout="vertical" column={2} size="middle">
                  <Descriptions.Item label="Building No">{communicationAddress.buildingNo}</Descriptions.Item>
                  <Descriptions.Item label="Street">{communicationAddress.street}</Descriptions.Item>
                  <Descriptions.Item label="Area">{communicationAddress.area}</Descriptions.Item>
                  <Descriptions.Item label="District">{communicationAddress.district}</Descriptions.Item>
                  <Descriptions.Item label="State">{communicationAddress.state}</Descriptions.Item>
                  <Descriptions.Item label="PostalCode">{communicationAddress.postalCode}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </>
        );
      case '3':
        return (
          <>
            <Row style={detailsSectionStyle} gutter={16}>
              <Col xs={24} sm={12}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Package Type">{memberDetails.packageType}</Descriptions.Item>
                  <Descriptions.Item label="Package Amount">{memberDetails.packageAmount}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Duration">{memberDetails.duration}</Descriptions.Item>
                  <Descriptions.Item label="Paid Amount">{memberDetails.paidAmount}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Row style={detailsSectionStyle} gutter={16}>
              <Col xs={24} sm={12}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Paid Date">{moment(memberDetails.paidDate).format('YYYY-MM-DD')}</Descriptions.Item>
                  <Descriptions.Item label="Payment Mode">{memberDetails.paymentMode}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="GST Type">{memberDetails.gstType}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </>
        );
      case '4':
        return (
          <Row style={detailsSectionStyle} gutter={16}>
            <Col xs={24} sm={12}>
              <Descriptions layout="vertical" column={1} size="middle">
                <Descriptions.Item label="Weight">{memberDetails.weight} kg</Descriptions.Item>
                <Descriptions.Item label="Height">{memberDetails.height} cm</Descriptions.Item>
                <Descriptions.Item label="Fitness Test Date">{moment(memberDetails.fitnessDate).format('DD-MM-YYYY')}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        );
      case '5':
        return (
          <Row style={detailsSectionStyle} gutter={16}>
            <Col xs={24} sm={12}>
              <Descriptions layout="vertical" column={1} size="middle">
                <Descriptions.Item label="Proof Type">{memberDetails.proofType}</Descriptions.Item>
                <Descriptions.Item label="Proof Number">{memberDetails.proofNo}</Descriptions.Item>
                <Descriptions.Item label="Proof Document">
                  <Button type="link" onClick={showModal}>
                    View Document
                  </Button>

                  <Modal
                    visible={isModalVisible}
                    onCancel={handleCloseModal}
                    footer={null}
                    title="Proof Document"
                    centered  
                    width={modalWidth} 
                    style={{
                      maxWidth: '75%',  
                      maxHeight: '80vh', 
                      overflow: 'auto', 
                      marginLeft: '65px'
                    }}
                  >
                    <img
                      src={memberDetails.proofDocument}
                      alt="Proof Document"
                      style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain' }}  // Ensure the image is responsive
                    />
                  </Modal>

                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ margin: '-15px' }}>
      <Button type="primary" onClick={goBack} style={{ marginBottom: '20px' }}>
        Back to Members List
      </Button>

      <Card style={customCardStyle} bordered={false}> {/* Removed the border */}
        <Row>
          <Col span={24} style={{ paddingRight: '0' }}>
            <Tabs
              tabPosition="top"  // Changed to top for horizontal tabs
              activeKey={activeTabKey}
              onChange={(key) => setActiveTabKey(key)}
              destroyInactiveTabPane={false}
              style={{ height: '100%' }}
            >
              <TabPane tab="Basic Details" key="1" />
              <TabPane tab="Address Details" key="2" />
              <TabPane tab="Package Details" key="3" />
              <TabPane tab="Fitness Details" key="4" />
              <TabPane tab="Proof Details" key="5" />
            </Tabs>
          </Col>

          {/* Content Section */}
          <Col span={24} style={{ paddingLeft: '0' }}>
            <div className="custom-scrollbar"
              style={{
                background: '#ffffff',
                borderRadius: '8px',
                minHeight: '400px',
                height: '100%',
                overflowY: 'auto',
              }}
            >
              {renderContent()}
            </div>
          </Col>
        </Row>
      </Card>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px; 
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }
        `}</style>
    </div>
  );
};

export default MemberDetails;

// Inline styles
const customCardStyle = {
  width: '100%',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  borderRadius: '8px',
  background: '#fff',
  border: 'none',
};