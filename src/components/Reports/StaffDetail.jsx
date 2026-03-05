import React, { useState } from 'react';
import { Descriptions, Button, Avatar, Tag, Tabs, Row, Col, Card } from 'antd';
import moment from 'moment';

const { TabPane } = Tabs;

const StaffDetail = ({ staff, goBack }) => {
  const [activeTabKey, setActiveTabKey] = useState('1'); // State to handle active tab

  const detailsSectionStyle = {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '15px',
  };

  const renderContent = () => {
    switch (activeTabKey) {
      case '1':
        return (
          <>
            <Row style={detailsSectionStyle} gutter={16} align="middle" justify="start">
              <Col xs={24} sm={6} lg={6}>
                <Avatar
                  size={120}
                  src={staff.photoPicture || 'https://via.placeholder.com/150'}
                  alt="Staff Avatar"
                  style={{ borderRadius: '50%', marginBottom: '10px', width: '100%', maxWidth: '120px' }}
                />
              </Col>
              <Col xs={24} sm={18} lg={18}>
                <h2>{`${staff.firstname} ${staff.lastname}`}</h2>
                <p style={{ fontSize: '16px' }}>{staff.employeeCode}</p>
                <p style={{ fontSize: '16px' }}>
                  {staff.status ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>}
                </p>
              </Col>
            </Row>

            <Row style={detailsSectionStyle} gutter={16}>
              <Col xs={24} sm={12} lg={6}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="First Name">{staff.firstname}</Descriptions.Item>
                  <Descriptions.Item label="Email">{staff.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone">{staff.mobileNumber}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Last Name">{staff.lastname}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{staff.gender}</Descriptions.Item>
                  <Descriptions.Item label="Date of Birth">
                    {moment(staff.dateOfBirth).format('DD-MM-YYYY')}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Blood Group">{staff.bloodGroup}</Descriptions.Item>
                  <Descriptions.Item label="Joining Date">
                    {moment(staff.joiningDate).format('DD-MM-YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Expire Date">
                    {staff.expireDate ? moment(staff.expireDate).format('DD-MM-YYYY') : 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Descriptions layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Package Assigned">{staff.package}</Descriptions.Item>
                  <Descriptions.Item label="Designation">{staff.designation}</Descriptions.Item>
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
                <Descriptions title="Permanent Address" layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Building No">
                    {staff.permanentAddress[0]?.buildingNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="Street">{staff.permanentAddress[0]?.street}</Descriptions.Item>
                  <Descriptions.Item label="Area">{staff.permanentAddress[0]?.area}</Descriptions.Item>
                  <Descriptions.Item label="District">{staff.permanentAddress[0]?.district}</Descriptions.Item>
                  <Descriptions.Item label="State">{staff.permanentAddress[0]?.state}</Descriptions.Item>
                  <Descriptions.Item label="Postal Code">{staff.permanentAddress[0]?.postalCode}</Descriptions.Item>
                </Descriptions>
              </Col>
              <Col xs={24} sm={12}>
                <Descriptions title="Communication Address" layout="vertical" column={1} size="middle">
                  <Descriptions.Item label="Building No">
                    {staff.communicationAddress[0]?.buildingNo}
                  </Descriptions.Item>
                  <Descriptions.Item label="Street">{staff.communicationAddress[0]?.street}</Descriptions.Item>
                  <Descriptions.Item label="Area">{staff.communicationAddress[0]?.area}</Descriptions.Item>
                  <Descriptions.Item label="District">{staff.communicationAddress[0]?.district}</Descriptions.Item>
                  <Descriptions.Item label="State">{staff.communicationAddress[0]?.state}</Descriptions.Item>
                  <Descriptions.Item label="Postal Code">
                    {staff.communicationAddress[0]?.postalCode}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ margin: '-15px' }}>
      <Button type="primary" onClick={goBack} style={{ marginBottom: '20px' }}>
        Back to Staff List
      </Button>

      <Card style={customCardStyle} bordered={false}>
        <Row>
          <Col span={24}>
            <Tabs
              tabPosition="top"
              activeKey={activeTabKey}
              onChange={(key) => setActiveTabKey(key)}
              destroyInactiveTabPane={false}
              style={{ height: '100%' }}
            >
              <TabPane tab="Basic Details" key="1" />
              <TabPane tab="Address Details" key="2" />
            </Tabs>
          </Col>

          {/* Content Section */}
          <Col span={24}>
            <div
              className="custom-scrollbar"
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

export default StaffDetail;

// Inline styles
const customCardStyle = {
  width: '100%',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
  borderRadius: '8px',
  background: '#fff',
  border: 'none',
};
