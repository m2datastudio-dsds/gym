import React, { useState, useEffect } from 'react';
import { Table, Button, Avatar, Tag, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive'; // Import from react-responsive
import { getAllMembers } from '../../Services/data.services'; // Adjust the path as needed
import MemberDetails from './MemberDetails'; // Importing the details component

const MembersList = ({ goToReports }) => {
  const [membersData, setMembersData] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null); // State to track selected member's ID

  // Media query hooks
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMediumOrLargerScreen = useMediaQuery({ query: '(min-width: 769px)' });

  // Fetch members data using the backend API service function
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getAllMembers(); // Call the service function
        if (response.code === 200) {
          setMembersData(response.members);
        } else {
          console.error('Failed to fetch members:', response.message);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  // Handle view button click to show member details
  const handleViewDetails = (id) => {
    setSelectedMemberId(id); // Store only the member ID
  };

  return (
    <div style={{ marginTop: '-25px', marginLeft: '-10px' }}> {/* Added marginTop to move content up */}
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
      {selectedMemberId ? (
        // Render MemberDetails component when a member is selected
        <MemberDetails
          memberId={selectedMemberId} // Pass memberId instead of member
          goBack={() => setSelectedMemberId(null)} // Function to go back to the list
        />
      ) : (
        <>
          <Typography.Title level={3}>Members List</Typography.Title>
          {/* Back Button */}
          <Button type="primary" onClick={goToReports} style={{ marginBottom: '20px' }}>
            Back to Reports
          </Button>

          {/* Members Table */}
          <Table
            dataSource={membersData}
            rowKey="id" // Ensure `id` is unique for each member
            pagination={{ pageSize: 5 }} // Optional: adjust pagination
          >
            {/* Columns to display on all screens */}
            <Table.Column
              title="Photo"
              dataIndex="memberPhoto"
              key="memberPhoto"
              render={(photo) => (
                <Avatar
                  size={56}
                  style={{ border: '3px solid #4CAF50' }}
                  src={photo || 'https://via.placeholder.com/150'}
                />
              )}
            />
            <Table.Column
              title="Member ID"
              dataIndex="memberID"
              key="memberID"
            />
            <Table.Column
              title="Name"
              dataIndex="firstName"
              key="firstName"
              render={(text, record) => `${record.firstName} ${record.lastName}`}
            />

            {/* Columns to display only on medium and larger screens */}
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
                  dataIndex="packageType"
                  key="packageType"
                />
                <Table.Column
                  title="Blood Group"
                  dataIndex="bloodGroup"
                  key="bloodGroup"
                />
                <Table.Column
                  title="Gender"
                  dataIndex="gender"
                  key="gender"
                />
                <Table.Column
                  title="Status"
                  dataIndex="active"
                  key="active"
                  render={(active) => (
                    <Tag color={active ? 'green' : 'red'}>
                      {active ? 'ACTIVE' : 'INACTIVE'}
                    </Tag>
                  )}
                />
              </>
            )}

            {/* Action Column - Always the last column */}
            <Table.Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Button type="primary" onClick={() => handleViewDetails(record.id)}>
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

export default MembersList;
