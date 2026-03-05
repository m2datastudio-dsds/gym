import React, { useState, useEffect } from 'react';
import { Table, Typography, Input, Button, Space, Popconfirm, Pagination, Drawer, notification, Avatar } from 'antd';
import { SearchOutlined, CloseCircleOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getFromLocalForage, saveToLocalForage } from '../../Utils/syncUtils.jsx';
import { getAllStaffs, getStaffById, deleteStaff } from '../../Services/data.services.jsx';
import { useMediaQuery } from 'react-responsive';

const { Column } = Table;

const StaffTable = ({ onAddStaff, onEditStaff }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Define breakpoints for responsive design
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });

  const fetchStaffs = async () => {
    try {
      const staffData = await getAllStaffs();
      setStaffs(staffData);
    } catch (error) {
      console.error('Error fetching staffs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
    const intervalId = setInterval(fetchStaffs, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleView = async (id) => {
    try {
      const staff = await getStaffById(id);
      setSelectedStaff(staff);
      setDrawerVisible(true);
    } catch (error) {
      console.error('Error fetching staff details:', error.message);
      openNotificationWithIcon('error', 'Error', 'Failed to load staff details.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStaff(id);
      // Update the state to remove the deleted staff without refetching data
      setStaffs(staffs.filter(staff => staff.id !== id));
      openNotificationWithIcon('success', 'Delete Staff', 'Staff deleted successfully.');
    } catch (error) {
      console.error('Error deleting staff:', error.message);
      openNotificationWithIcon('error', 'Delete Staff', 'An error occurred while deleting staff.');
    }
  };


  const filteredStaffs = staffs.filter(staff =>
    staff.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.employeeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedStaffs = filteredStaffs.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const parseAddress = (addressString) => {
    if (!addressString || addressString === "{}") {
      return "No address provided";
    }

    let address;
    try {
      address = JSON.parse(addressString);
    } catch (error) {
      console.error('Error parsing address:', error);
      return "Invalid address format";
    }

    // Check if the address object is empty
    if (Object.keys(address).length === 0) {
      return "No address provided";
    }

    const { buildingNo, street, area, district, state, postalCode } = address;
    return `${buildingNo || ''}, ${street || ''}, ${area || ''}, ${district || ''}, ${state || ''} - ${postalCode || ''}`;
  };



  return (
    <div className='container'>
      <Typography.Title level={3} style={{ color: '#0A21C0' }} className='title'>
        Staff
      </Typography.Title>
      <div className='header'>
        <Input
          placeholder="Search"
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
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddStaff}>
          Add Staff
        </Button>
      </div>
      <div className='table-container'>
        <Table
          bordered
          dataSource={paginatedStaffs}
          pagination={false}
          loading={loading}
          rowKey="id"
          className="responsive-table"
          scroll={isSmallScreen || isMediumScreen ? { x: '100%' } : undefined}
        >
          {/* Conditionally render S.No column for medium and large screens */}
          {(isMediumScreen || isLargeScreen) && (
            <Column
              title="S.No"
              key="S.No"
              render={(text, record, index) => (currentPage - 1) * rowsPerPage + index + 1}
            />
          )}
          <Column
            title="Profile"
            dataIndex="photoPicture"
            key="photoPicture"
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
          <Column title="Employee Code" dataIndex="employeeCode" key="EmployeeCode" />
          <Column
            title="Name"
            key="Name"
            render={(text, record) => {
              const firstName = record.firstname ? record.firstname : '';
              const lastName = record.lastname ? record.lastname : '';
              return `${firstName} ${lastName}`.trim();
            }}
          />
          {/* Conditionally render Mobile No column for medium and large screens */}
          {!isSmallScreen && (
            <Column title="Mobile No" dataIndex="mobileNumber" key="Mobile" />
          )}
          {isMediumScreen || isLargeScreen ? (
            <>
              <Column title="Joining Date" dataIndex="joiningDate" key="JoiningDate" render={date => date ? moment(date).format('YYYY-MM-DD') : ' '} />
              <Column title="Blood Group" dataIndex="bloodGroup" key="BloodGroup" />
              <Column title="Designation" dataIndex="designation" key="Designation" />
              {/* <Column title="Status" key="Status" render={(text, record) => {
                const expireDate = new Date(record.expireDate);
                const today = new Date();
                const timeDiff = expireDate.getTime() - today.getTime();
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return dayDiff < 0 ? 'Expired' : 'Active';
              }} /> */}
              <Column
                title="Status"
                key="Status"
                render={(text, record) => (record.status ? 'Active' : 'Inactive')}
              />

            </>
          ) : null}
          {/* Render View column for all screens */}
          <Column
            title="View"
            key="View"
            render={(text, record) => (
              <Button onClick={() => handleView(record.id)}>View</Button>
            )}
          />
          <Column
            title="Action"
            key="Action"
            render={(text, record) => (
              <Space size="middle">
                <Button type="primary" icon={<EditOutlined />} onClick={() => onEditStaff(record.id)} />
                <Popconfirm title="Are you sure to delete this staff?" onConfirm={() => handleDelete(record.id)}>
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
        total={filteredStaffs.length}
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
        title="Staff Details"
        placement="right"
        closable={true}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={isLargeScreen ? 600 : isMediumScreen ? 500 : 300}  // Adjust width based on screen size
        className="custom-drawer"
      >
        {selectedStaff && (
          <div className='drawer-content'>
            <div className='drawer-header'>
              <div className='image-container'>
                <img
                  src={selectedStaff.photoPicture ? selectedStaff.photoPicture : 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'}
                  alt="Staff Photo"
                  className="profile-photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg';
                  }}
                />
              </div>
              <div className='name-container'>
                <span className="name">
                  {`${selectedStaff.firstname || ''} ${selectedStaff.lastname || ''}`.trim()}
                </span>
                <div className="employee-code">{selectedStaff.employeeCode}</div>
              </div>
            </div>
            <div className='drawer-section'>
              <div className='drawer-grid'>
                <div className='drawer-item'><strong>Email:</strong> {selectedStaff.email}</div>
                <div className='drawer-item'><strong>Mobile Number:</strong> {selectedStaff.mobileNumber}</div>
                <div className='drawer-item'><strong>Alternate Number:</strong> {selectedStaff.alternateNumber}</div>
                <div className='drawer-item'><strong>Gender:</strong> {selectedStaff.gender}</div>
                <div className='drawer-item'><strong>Age:</strong> {selectedStaff.age}</div>
                <div className='drawer-item'><strong>Date of Birth:</strong> {selectedStaff.dateOfBirth ? moment(selectedStaff.dateOfBirth).format('YYYY-MM-DD') : ' '}</div>
                <div className='drawer-item'><strong>Biometric ID:</strong> {selectedStaff.biometricId}</div>
                <div className='drawer-item'><strong>Joining Date:</strong> {selectedStaff.joiningDate ? moment(selectedStaff.joiningDate).format('YYYY-MM-DD') : ' '}</div>
                <div className='drawer-item'><strong>Blood Group:</strong> {selectedStaff.bloodGroup}</div>
                <div className='drawer-item'><strong>Designation:</strong> {selectedStaff.designation}</div>
                <div className='drawer-item'><strong>Status:</strong> {selectedStaff.status ? 'Active' : 'Inactive'}</div>
                {(() => {
                  const permAddr = parseAddress(selectedStaff.permanentAddress);
                  const commAddr = parseAddress(selectedStaff.communicationAddress);
                  return (
                    <>
                      {permAddr === 'No address provided' ? (
                        <div className='drawer-item'><strong>Permanent Address:</strong> No Address</div>
                      ) : (
                        <div className='drawer-item drawer-item--address'>
                          <strong>Permanent Address:</strong>
                          <span className='drawer-address-value'>{permAddr}</span>
                        </div>
                      )}
                      {commAddr === 'No address provided' ? (
                        <div className='drawer-item'><strong>Communication Address:</strong> No Address</div>
                      ) : (
                        <div className='drawer-item drawer-item--address'>
                          <strong>Communication Address:</strong>
                          <span className='drawer-address-value'>{commAddr}</span>
                        </div>
                      )}
                    </>
                  );
                })()}
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
          marginTop: -25px;
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

        .table-container {
          width: 100%;
          overflow-x: ${isSmallScreen || isMediumScreen ? 'auto' : 'hidden'}; /* Enable horizontal scroll on small and medium screens */
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

        .drawer-content {
          padding: 20px;
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
          flex: 1;
          text-align: ${isSmallScreen ? 'center' : 'left'};
        }

        .name {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .employee-code {
          font-size: 1.2rem;
          font-weight: bold;
        }

        .custom-drawer .ant-drawer-body {
          max-height: calc(100vh - 100px); /* Adjust based on your layout */
          overflow-y: auto;
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar {
          width: 7.5px; 
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .custom-drawer .ant-drawer-body::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default StaffTable;
