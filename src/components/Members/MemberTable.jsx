import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Space, Popconfirm, Pagination, Drawer, notification, Avatar } from 'antd';
import { SearchOutlined, CloseCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { FaHeartPulse } from "react-icons/fa6";
import { saveToLocalForage } from '../../Utils/syncUtils';
import { getAllMembers, getMemberById, deleteMember, getLatestPayment } from '../../Services/data.services';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';

const { Column } = Table;

const MemberTable = ({ onAddMember, onEditMember }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1101px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1100px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isExtraSmallScreen = useMediaQuery({ query: '(max-width: 599px)' });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const result = await getAllMembers();
        if (result.code === 200) {
          setMembers(result.members);
          await fetchPaymentDetails(result.members); // Fetch payment details after getting members
        } else {
          console.error('Failed to fetch members:', result.message);
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const fetchPaymentDetails = async (membersList) => {
    try {
      const updatedMembers = await Promise.all(
        membersList.map(async (member) => {
          const paymentResult = await getLatestPayment(member.memberID);
          if (paymentResult.code === 200 && paymentResult.data) {
            // Update member with the latest payment details
            return {
              ...member,
              pendingAmount: paymentResult.data.pending,
              paidAmount: paymentResult.data.paidAmount,
            };
          }
          return member;
        })
      );
      setMembers(updatedMembers); // Update state with members including payment details
    } catch (error) {
      console.error('Error fetching payment details:', error);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteMember(id);
      if (result.code === 200) {
        notification.success({
          message: 'Success',
          description: 'Member deleted successfully!',
        });
  
        const updatedMembers = members.filter((member) => member.id !== id);
        setMembers(updatedMembers);
  
        // Adjust the page if necessary
        const totalItems = updatedMembers.length;
        const totalPages = Math.ceil(totalItems / rowsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages);
        }
      } else {
        notification.error({
          message: 'Error',
          description: result.message,
        });
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      notification.error({
        message: 'Error',
        description: 'Something went wrong!',
      });
    }
  };
  
  

  const filteredMembers = members.filter(member =>
    (member.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (member.lastName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (member.memberID?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (member.packageType?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );


  const paginatedMembers = filteredMembers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getRowClassName = (record) => {
    return record.expiryDays === 'Expired' || record.expiryDays <= 0 ? 'expired-row' : '';
  };

  const showDrawer = async (id) => {
    try {
      const result = await getMemberById(id);
      if (result.code === 200) {
        setSelectedMember(result.member);
        setIsDrawerVisible(true);
      } else {
        console.error('Failed to fetch member details:', result.message);
      }
    } catch (error) {
      console.error('Error fetching member details:', error);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedMember(null);
  };

  /**
   * Formats address for display. Handles:
   * - JSON string from API/DB (permanentAddress, communicationAddress are stored as JSON strings)
   * - Single address object
   * - Array of address objects (legacy)
   */
  const formatAddress = (addressInput) => {
    if (addressInput == null || addressInput === '') {
      return 'No Address';
    }

    let addresses = [];
    if (typeof addressInput === 'string') {
      try {
        const parsed = JSON.parse(addressInput);
        addresses = Array.isArray(parsed) ? parsed : (parsed && typeof parsed === 'object' ? [parsed] : []);
      } catch {
        return 'No Address';
      }
    } else if (Array.isArray(addressInput)) {
      addresses = addressInput;
    } else if (typeof addressInput === 'object' && addressInput !== null) {
      addresses = [addressInput];
    }

    if (addresses.length === 0) {
      return 'No Address';
    }

    return addresses.map((address) => {
      const parts = [
        address.buildingNo,
        address.street,
        address.area,
        address.district,
        address.state,
        address.postalCode,
      ].filter(Boolean);
      return parts.length > 0 ? parts.join(', ') : 'No Address';
    }).join('; ');
  };


  return (
    <div className="container">
      <Typography.Title level={3} style={{ color: '#0A21C0' }} className="title">Members</Typography.Title>
      <div className="header">
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
                onClick={() => handleSearch('')}
              />
            )
          }
        />
        <div className="button-group">
          <Button type="primary" icon={<UploadOutlined />}>
            Import Member
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} className="button">
            Download
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddMember}>
            Add Member
          </Button>
        </div>
      </div>
      <div className="table-container">
        <Table
          bordered
          dataSource={paginatedMembers}
          pagination={false}
          loading={loading}
          rowKey="id"
          className="responsive-table"
          scroll={isSmallScreen ? { x: '100%' } : undefined}
          rowClassName={getRowClassName}
          size="middle"
        >
          {/* Common columns for all screens */}
          <Column
            title="Profile"
            dataIndex="memberPhoto"
            key="memberPhoto"
            render={(photo) => {
              const defaultImage = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg';
              return (
                <Avatar
                  size={50}
                  style={{ border: '3px solid #4CAF50' }}
                  src={
                    <img
                      src={photo || defaultImage}
                      alt="Profile"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                  }
                />
              );
            }}
          />
          <Column
            title="MemberID"
            dataIndex="memberID"
            key="MemberID"
            render={(text) => text.padStart(3, '0')}
            sorter={(a, b) => a.memberID.localeCompare(b.memberID)} // Sorter for MemberID
          />
          <Column title="Member Name" key="Membername" render={(text, record) => `${record.firstName} ${record.lastName}`} />

          {/* Conditionally render columns for medium screens */}
          {isMediumScreen && (
            <>
              <Column title="Mobile" dataIndex="mobileNumber" key="Mobile" />
              <Column
                title="Packages"
                dataIndex="packageType"
                key="Packages"
                render={(text) => (text && text.trim() !== '') ? text : <>&nbsp;</>}
              />
              <Column
                title="Fitness"
                key="Fitness"
                render={() => (
                  <div className="fitness-icon">
                    <FaHeartPulse />
                  </div>
                )}
              />
            </>
          )}

          {/* Render additional columns for large screens */}
          {isLargeScreen && (
            <>
              <Column title="Mobile" dataIndex="mobileNumber" key="Mobile" />
              <Column
                title="Packages"
                dataIndex="packageType"
                key="Packages"
                render={(text) => (text && text.trim() !== '') ? text : <>&nbsp;</>}
              />
              <Column title="Blood Group" dataIndex="bloodGroup" key="blood" />
              <Column
                title="Pending"
                key="Pending"
                render={(text, record) => {
                  const pendingAmount = record.pendingAmount != null ? record.pendingAmount : 0; // Default to 0 if null or undefined
                  return `₹${pendingAmount.toFixed(2)}`; // Now toFixed will always work on a valid number
                }}
                sorter={(a, b) => (a.pendingAmount || 0) - (b.pendingAmount || 0)} // Fallback to 0 if sorting null or undefined values
              />

              <Column
                title="Expiry Days"
                dataIndex="expiryDays"
                key="expirydays"
                sorter={(a, b) => a.expiryDays - b.expiryDays}
              />
              <Column
                title="Fitness"
                key="Fitness"
                render={() => (
                  <div className="fitness-icon">
                    <FaHeartPulse />
                  </div>
                )}
              />
            </>
          )}

          {/* Common columns for all screens */}
          <Column
            title="View"
            key="View"
            render={(text, record) => (
              <Button onClick={() => showDrawer(record.id)}>View</Button>
            )}
          />
          <Column
            title="Action"
            key="Action"
            render={(text, record) => (
              <Space size="middle">
                <Button type="link" icon={<EditOutlined />} onClick={() => onEditMember(record.id)}></Button>
                <Popconfirm
                  title="Are you sure to delete this member?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </div>
      <Pagination
        className="pagination"
        current={currentPage}
        pageSize={rowsPerPage}
        pageSizeOptions={['8', '10', '20', '50']}
        showSizeChanger
        onShowSizeChange={(current, size) => setRowsPerPage(size)}
        total={filteredMembers.length}
        onChange={(page) => setCurrentPage(page)}
        itemRender={(current, type, originalElement) =>
          type === 'page' ? (
            <span className="pagination-item">{current}</span>
          ) : (
            originalElement
          )
        }
      />

      <Drawer
        title="Member Details"
        placement="right"
        closable={true}
        onClose={handleCloseDrawer}
        visible={isDrawerVisible}
        width={isLargeScreen ? 700 : isMediumScreen ? 500 : 300} // Adjust width based on screen size
        className="custom-drawer"
      >
        {selectedMember && (
          <div className="drawer-content">
            <div className="drawer-header">
              <div className="image-container">
                <img
                  src={selectedMember.memberPhoto ? selectedMember.memberPhoto : 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'}
                  alt="Member Photo"
                  className="profile-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg';
                  }}
                />
              </div>
              <div className="name-container">
                <span className="name">{`${selectedMember.firstName} ${selectedMember.lastName}`}</span>
                <div className="member-id">{selectedMember.memberID.padStart(3, '0')}</div>
              </div>
            </div>

            <div className="drawer-section">
              <div className="drawer-grid">
                <div className="drawer-item"><strong>Email:</strong> {selectedMember.email}</div>
                <div className="drawer-item"><strong>Mobile Number:</strong> {selectedMember.mobileNumber}</div>
                <div className="drawer-item"><strong>Gender:</strong> {selectedMember.gender}</div>
                <div className="drawer-item"><strong>Date of Birth:</strong> {moment(selectedMember.dateOfBirth).format('YYYY-MM-DD')}</div>
                <div className="drawer-item"><strong>Package:</strong> {selectedMember.packageType || ' '}</div>
                <div className="drawer-item"><strong>Blood Group:</strong> {selectedMember.bloodGroup}</div>
                <div className="drawer-item"><strong>Assign Trainer:</strong> {selectedMember.assignTrainer}</div>
                <div className="drawer-item"><strong>GST Type:</strong> {selectedMember.gstType}</div>
                {(() => {
                  const permAddr = formatAddress(selectedMember.permanentAddress);
                  const commAddr = formatAddress(selectedMember.communicationAddress);
                  return (
                    <>
                      {permAddr === 'No Address' ? (
                        <div className="drawer-item"><strong>Permanent Address:</strong> No Address</div>
                      ) : (
                        <div className="drawer-item drawer-item--address">
                          <strong>Permanent Address:</strong>
                          <span className="drawer-address-value">{permAddr}</span>
                        </div>
                      )}
                      {commAddr === 'No Address' ? (
                        <div className="drawer-item"><strong>Communication Address:</strong> No Address</div>
                      ) : (
                        <div className="drawer-item drawer-item--address">
                          <strong>Communication Address:</strong>
                          <span className="drawer-address-value">{commAddr}</span>
                        </div>
                      )}
                    </>
                  );
                })()}
                <div className="drawer-item"><strong>Fitness Date:</strong> {moment(selectedMember.fitnessDate).format('YYYY-MM-DD')}</div>
                <div className="drawer-item"><strong>Member ID:</strong> {selectedMember.memberID.padStart(3, '0')}</div>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -15px;
          width: 100%;
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

        .button-group {
          display: flex;
          gap: 10px;
          flex-direction: ${isSmallScreen ? 'column' : 'row'};
        }

        .table-container {
          width: ${isSmallScreen ? (isExtraSmallScreen ? '100%' : '90%') : '100%'};
          overflow-x: auto;
        }

        .pagination {
          margin-top: 15px;
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .pagination-item {
          margin: 0 8px;
        }

        .expired-row {
          background-color: #FFEAEB; /* Light red color for expired rows */
        }

        .fitness-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #E30B5C; /* Color of the icon */
          font-size: 22px; /* Size of the icon */
        }

        .modal-content {
          padding: 20px;
        }

        .modal-section {
          margin-bottom: 20px;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .modal-item {
          display: flex;
          flex-direction: row;
        }

        .name {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .member-id {
          font-size: 1.2rem;
          font-weight: bold;
        }

        strong {
          font-weight: bold;
        }

        .drawer-content {
          padding: 20px;
        }

        .drawer-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ccc;
          flex-direction: ${isSmallScreen ? 'column' : 'row'};
          align-items: ${isSmallScreen ? 'center' : 'flex-start'};
        }

        .image-container {
          margin-right: ${isSmallScreen ? '0' : '80px'};
          margin-bottom: ${isSmallScreen ? '20px' : '0'};
        }

        .profile-photo {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #4CAF50;
        }

        .name-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: ${isSmallScreen ? 'center' : 'flex-start'};
        }

        .name {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .member-id {
          font-size: 1.2rem;
          font-weight: bold;
          margin-top: 5px;
        }

        .drawer-section {
          margin-bottom: 20px;
        }

        .drawer-grid {
          display: grid;
          grid-template-columns: repeat(${isSmallScreen ? 1 : 'auto-fill'}, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }

        .drawer-item {
          display: flex;
          flex-direction: row;
        }

        .drawer-item--address {
          flex-direction: column;
          align-items: flex-start;
          grid-column: 1 / -1;
        }

        .drawer-address-value {
          display: block;
          margin-top: 4px;
          word-break: break-word;
          line-height: 1.4;
          color: rgba(0, 0, 0, 0.85);
        }

        strong {
          font-weight: bold;
        }

        .custom-drawer .ant-drawer-body {
          max-height: calc(100vh - 100px);
          overflow-y: auto;
          overflow-x: auto; /* Add horizontal scroll for x-axis */
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar {
          width: 7.5px;
          height: 7.5px; /* Add height for horizontal scrollbar */
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px; /* Add radius for scrollbar thumb */
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 6px; /* Add radius for scrollbar track */
        }
      `}</style>
    </div>
  );
};

export default MemberTable;
