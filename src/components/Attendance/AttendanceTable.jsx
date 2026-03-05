// AttendanceTable.jsx
import React, { useState, useEffect } from 'react';
import { Spin, Radio, notification } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Attendance from './Attendance';
import DetailsView from './DetailsView';
import { getAttendanceWithDetails, getStaffAttendanceWithDetails, getAllmembername, getAllStaffname, getLatestPayment } from '../../Services/data.services';
import moment from 'moment';

const AttendanceTable = () => {
  const [view, setView] = useState('table');
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedType, setSelectedType] = useState('Member');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState([]); 
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    fetchAttendanceData(selectedType);
    fetchNames(selectedType); 
  }, [selectedType]);

  const fetchAttendanceData = async (type) => {
    setLoading(true);
    try {
      const data = type === 'Member'
        ? await getAttendanceWithDetails()
        : await getStaffAttendanceWithDetails();
  
      const formattedData = data.map((item, index) => ({
        key: index + 1,
        no: index + 1,
        type: item.type,
        id: type === 'Member' ? item.memberID : item.employeeCode,
        memberID: item.memberID,
        employeeCode: item.employeeCode,
        name: item.name,
        mobileNumber: item.mobileNumber,
        attendanceDate: item.attendanceDate ? moment(item.attendanceDate).format('DD-MM-YYYY') : '',
        inTime: item.inTime ? moment(item.inTime).format('hh:mm a') : '',
        outTime: item.outTime ? moment(item.outTime).format('hh:mm a') : '',
        biometricID: type === 'Member' ? item.biometricID : item.biometricId,
        memberPhoto: item.memberPhoto,
        photoPicture: item.photoPicture,
        packageType: item.packageType,
        totalAmount: item.totalAmount || 0,
        paidAmount: item.paidAmount || 0,
        pendingAmount: item.pendingAmount || 0,
        active: type === 'Member' ? item.active : item.status,
        startDate: type === 'Member' && item.startDate ? moment(item.startDate).format('DD/MM/YYYY') : '',
        joiningDate: type === 'Staff' && item.joiningDate ? moment(item.joiningDate).format('DD/MM/YYYY') : '',
        expireDate: item.endDate ? moment(item.endDate).isValid() ? moment(item.endDate).format('DD/MM/YYYY') : '' : '',
        attendanceCount: item.attendanceCount,
        month: item.attendanceDate ? moment(item.attendanceDate).format('MMMM') : '',
        endDate: item.endDate,
      }));
  
      setAttendanceData(formattedData);
      setFilteredData(formattedData);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch attendance data',
      });
    } finally {
      setLoading(false);
    }
  };
  

  const fetchNames = async (type) => {
    try {
      if (type === 'Member') {
        const response = await getAllmembername();
        const formattedNames = response.members.map(item => ({
          id: item.memberID,
          name: item.name
        }));
        setNames(formattedNames);
      } else {
        const response = await getAllStaffname();
        const formattedNames = response.staffdetails.map(item => ({
          id: item.employeeCode,
          name: item.name
        }));
        setNames(formattedNames);
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Failed to fetch ${type} names`,
      });
    }
  };

  const handleViewDetails = async (details) => {
    setLoading(true);


    setSelectedDetails(details);
    setView('details');
    setLoading(false);
  };

  const handleBack = () => {
    setView('table');
    setSelectedDetails(null);
    setSelectedMember(null);
    setSearchValue('');
    setFilteredData(attendanceData);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    const newData = attendanceData.filter(
      (item) =>
        (item.name || '').toLowerCase().includes(value.toLowerCase()) ||
        (item.id || '').toLowerCase().includes(value.toLowerCase()) ||
        (item.mobileNumber || '').toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(newData);
  };

  const handleDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const newData = attendanceData.filter(
        (item) => moment(item.attendanceDate, 'DD-MM-YYYY').isBetween(start, end, null, '[]')
      );
      setFilteredData(newData);
    } else {
      setFilteredData(attendanceData);
    }
  };

  const handleMemberChange = (value) => {
    setSelectedMember(value);
    if (value) {
      const newData = attendanceData.filter((item) => item.id === value);
      setFilteredData(newData);
    } else {
      setFilteredData(attendanceData);
    }
  };

  return (
    <div style={{ padding: isSmallScreen ? '10px' : '20px' }}>
      {view === 'table' && (
        <>
          <Radio.Group onChange={handleTypeChange} value={selectedType} style={{ marginBottom: '20px' }}>
            <Radio value="Member">Member</Radio>
            <Radio value="Staff">Staff</Radio>
          </Radio.Group>
          <Spin spinning={loading}>
            <Attendance
              onViewDetails={handleViewDetails}
              data={filteredData}
              onSearch={handleSearch}
              onDateChange={handleDateChange}
              onMemberChange={handleMemberChange}
              members={names}
              selectedMember={selectedMember}
              searchValue={searchValue}
              placeholder={selectedType === 'Member' ? 'Select a member' : 'Select a staff'}
            />
          </Spin>
        </>
      )}
      {view === 'details' && selectedDetails && (
        <DetailsView 
          details={selectedDetails} 
          onBack={handleBack}
          showQRCode={true} 
          showPunchButtons={false}
          cardSize="large" 
          isAttendanceTable={true} 
        />
      )}
    </div>
  );
};

export default AttendanceTable;
