import React, { useEffect, useState } from 'react';
import { Table, Button, Avatar, Tag, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive'; // Import from react-responsive
import StaffDetail from './StaffDetail'; // Import the StaffDetail component
import { getAllStaffs } from '../../Services/data.services'; 

const StaffList = ({ goToReports }) => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null); // Track the selected staff object

  // Media query hooks to check screen size
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMediumOrLargerScreen = useMediaQuery({ query: '(min-width: 769px)' });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const data = await getAllStaffs();
        setStaffs(data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaffData();
  }, []);

  // Handle view button click to show staff details
  const handleViewDetails = (staff) => {
    setSelectedStaff(staff); // Set the selected staff object
  };

  return (
    <div style={{ marginTop: '-25px' , marginLeft: '-10px'}}> {/* Added marginTop to move content up */}
      <style>
        {`
          /* Ensure the table is fully responsive and avoids horizontal scroll */
          .ant-table {
            width: 100%;
          }

          /* Adjust the table column widths for small and medium screens */
          @media (max-width: 768px) {
            .ant-table-cell {
              white-space: normal; /* Allow text to wrap */
              word-wrap: break-word;
              padding: 8px; /* Reduce padding for small screens */
            }

            .ant-avatar {
              width: 40px;
              height: 40px;
            }

            .ant-btn {
              font-size: 12px;
              padding: 4px 8px; /* Make the button smaller on small screens */
            }
          }

          @media (min-width: 769px) and (max-width: 1024px) {
            .ant-table-cell {
              white-space: normal;
              padding: 12px; /* Adjust padding for medium screens */
            }

            .ant-avatar {
              width: 48px;
              height: 48px;
            }

            .ant-btn {
              font-size: 14px;
            }
          }

          /* For larger screens */
          @media (min-width: 1025px) {
            .ant-table-cell {
              padding: 16px;
            }

            .ant-avatar {
              width: 56px;
              height: 56px;
            }
          }
        `}
      </style>

      {selectedStaff ? (
        // If a staff member is selected, display StaffDetail component with the selected staff object
        <StaffDetail staff={selectedStaff} goBack={() => setSelectedStaff(null)} />
      ) : (
        <>
          <Typography.Title level={3}>Staff List</Typography.Title>

          {/* Back Button */}
          <Button type="primary" onClick={goToReports} style={{ marginBottom: '20px' }}>
            Back to Reports
          </Button>

          {/* Staff Table */}
          <Table
            dataSource={staffs}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          >
            {/* Columns to display on all screens */}
            <Table.Column
              title="Photo"
              dataIndex="photoPicture"
              key="photoPicture"
              render={(photo) => (
                <Avatar
                  size={56}
                  style={{ border: '3px solid #4CAF50' }}
                  src={photo || 'https://via.placeholder.com/150'}
                />
              )}
            />
            <Table.Column
              title="Employee Code"
              dataIndex="employeeCode"
              key="employeeCode"
            />
            <Table.Column
              title="Name"
              dataIndex="firstname"
              key="firstname"
              render={(text, record) => `${record.firstname} ${record.lastname}`}
            />

            {/* Conditionally render additional columns for medium and larger screens */}
            {isMediumOrLargerScreen && (
              <>
                <Table.Column
                  title="Email"
                  dataIndex="email"
                  key="email"
                />
                <Table.Column
                  title="Mobile"
                  dataIndex="mobileNumber"
                  key="mobileNumber"
                />
                <Table.Column
                  title="Package"
                  dataIndex="package"
                  key="package"
                />
                <Table.Column
                  title="Blood Group"
                  dataIndex="bloodGroup"
                  key="bloodGroup"
                />
                <Table.Column
                  title="Designation"
                  dataIndex="designation"
                  key="designation"
                />
                <Table.Column
                  title="Status"
                  dataIndex="status"
                  key="status"
                  render={(status) => (
                    <Tag color={status ? 'green' : 'red'}>
                      {status ? 'ACTIVE' : 'INACTIVE'}
                    </Tag>
                  )}
                />
              </>
            )}

            {/* Action Column - Always displayed */}
            <Table.Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Button type="primary" onClick={() => handleViewDetails(record)}>
                  View
                </Button>
              )}
            />
          </Table>
        </>
      )}
    </div>
  );
};

export default StaffList;
