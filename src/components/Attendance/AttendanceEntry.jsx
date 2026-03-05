import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Input, Select, Form, Button, Spin, notification, Card } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { getAllStaffname, getAllmembername, getmemberLatestAttendance, getStaffLatestAttendance, 
         savememberAttendance, saveStaffAttendance,
         updatememberAttendanceOutTime, updateStaffAttendanceOutTime,
         getLatestPayment 
       } from '../../Services/data.services';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import moment from 'moment';
import DetailsView from './DetailsView';

const { Option } = Select;

const AttendanceEntry = () => {
  const [staffOptions, setStaffOptions] = useState([]);
  const [memberOptions, setMemberOptions] = useState([]);
  const [memberID, setMemberID] = useState('');
  const [staffID, setStaffID] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [details, setDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  const detailsRef = useRef(null);

  useEffect(() => {
    const fetchStaffOptions = async () => {
      try {
        const staffData = await getAllStaffname();
        if (staffData.code === 200 && staffData.staffdetails) {
          setStaffOptions(staffData.staffdetails.map(staff => ({
            value: `${staff.employeeCode}-${staff.name}`,
            label: `${staff.employeeCode}-${staff.name}`,
          })));
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.response?.data?.message || 'Failed to fetch staff data.',
        });
        console.error('Error fetching staff data:', error);
      }
    };

    const fetchMemberOptions = async () => {
      try {
        const memberData = await getAllmembername();
        if (memberData.code === 200 && memberData.members) {
          setMemberOptions(memberData.members.map(member => ({
            value: `${member.memberID}-${member.name}`,
            label: `${member.memberID}-${member.name}`,
          })));
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.response?.data?.message || 'Failed to fetch member data.',
        });
        console.error('Error fetching member data:', error);
      }
    };

    fetchStaffOptions();
    fetchMemberOptions();
  }, []);

  const handleSaveAttendance = async (identifier, type) => {
    try {
      setLoading(true);
      if (type === 'member') {
        await savememberAttendance(identifier);
      } else if (type === 'staff') {
        await saveStaffAttendance(identifier);
      }

      notification.success({
        message: 'Success',
        description: 'Attendance saved successfully!',
      });

      const [id] = identifier.split('-');
      await handleSearch(id, type);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to save attendance.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePunchOut = async (identifier, type) => {
    try {
      setLoading(true);
      if (type === 'member') {
        await updatememberAttendanceOutTime(identifier);  
      } else if (type === 'staff') {
        await updateStaffAttendanceOutTime(identifier);  
      }

      notification.success({
        message: 'Success',
        description: 'Attendance out time updated successfully!',
      });

      const [id] = identifier.split('-');
      await handleSearch(id, type);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to update attendance out time.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (value, type) => {
    if (!value) {
      setDetails(null);
      setPaymentDetails(null);
      return;
    }

    setLoading(true);

    try {
      let result;
      if (type === 'member') {
        result = await getmemberLatestAttendance(value);
        setSelectedStaff(null);
        setStaffID('');
      } else {
        result = await getStaffLatestAttendance(value);
        setSelectedMember(null);
        setMemberID('');
      }

      if (result) {
        // Fetch and format attendance details
        const currentMonth = moment().format('MMMM');
        const formattedResult = {
          ...result,
          month: currentMonth,  
          attendanceCount: result.attendanceCount,
          inTime: result.inTime ? moment(result.inTime).format('hh:mm a') : '',
          outTime: result.outTime ? moment(result.outTime).format('hh:mm a') : '',
        };

        setDetails(formattedResult);
        setMemberID('');
        setStaffID('');
        setSelectedMember(null);
        setSelectedStaff(null);

      } else {
        notification.info({
          message: 'No Data Found',
          description: `No attendance records found for the given ${type === 'member' ? 'Member' : 'Staff'} ID.`,
        });
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || `Failed to fetch ${type === 'member' ? 'Member' : 'Staff'} attendance details.`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (details && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [details]);


  const clearMemberFields = () => {
    setMemberID('');
    setSelectedMember(null);
    setDetails(null);
    setPaymentDetails(null);
  };

  const clearStaffFields = () => {
    setStaffID('');
    setSelectedStaff(null);
    setDetails(null);
    setPaymentDetails(null);
  };

  const colSpan = isLargeScreen ? 5 : isMediumScreen ? 5 : 24;
  const buttonColSpan = isSmallScreen ? 12 : 6;
  const fieldWidth = '100%';
  const buttonWidth = '90%';
  const containerWidth = isLargeScreen ? '80%' : '100%';

  const clearButtonStyle = {
    width: buttonWidth,
    height: '33px',
    lineHeight: 'normal',
    marginLeft: '0px',
    fontSize: isMediumScreen ? '12px' : '14px',
    padding: isMediumScreen ? '0 5px' : '0 15px', 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {loading && <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Spin size="large" />
      </div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: isSmallScreen ? 'column' : 'row', marginTop: '20px' }}>
        <div style={{ width: containerWidth, padding: '0' }}>
          <Form layout="vertical">
            <Row gutter={isSmallScreen ? [8, 1] : [16, 16]} align="middle">
              <Col span={colSpan}>
                <Form.Item label="Search by Member">
                  <Select
                    showSearch
                    placeholder="Select a member"
                    value={selectedMember}
                    onChange={value => {
                      setSelectedMember(value);
                      handleSearch(value, 'member');
                    }}
                    onClear={() => {
                      setSelectedMember(null);
                      setDetails(null);
                      setPaymentDetails(null);
                    }}
                    suffixIcon={<DownOutlined />}
                    options={memberOptions}
                    style={{ width: fieldWidth }}
                    allowClear
                    filterOption={(input, option) => 
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={buttonColSpan}>
                <Button type='primary' block onClick={clearMemberFields} style={clearButtonStyle}>
                  Clear
                </Button>
              </Col>
            </Row>

            <Row gutter={isSmallScreen ? [8, 1] : [16, 16]} align="middle" style={isSmallScreen ? { marginTop: '20px' } : {}}>
              <Col span={colSpan}>
                <Form.Item label="Search by Staff">
                  <Select
                    showSearch
                    placeholder="Select a staff"
                    value={selectedStaff}
                    onChange={value => {
                      setSelectedStaff(value);
                      handleSearch(value, 'staff');
                    }}
                    onClear={() => {
                      setSelectedStaff(null);
                      setDetails(null);
                      setPaymentDetails(null);
                    }}
                    suffixIcon={<DownOutlined />}
                    options={staffOptions}
                    style={{ width: fieldWidth }}
                    allowClear
                    filterOption={(input, option) => 
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={buttonColSpan}>
                <Button type='primary' block onClick={clearStaffFields} style={clearButtonStyle}>
                  Clear
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        {/* Render the QR card below the form fields on small screens */}
        {isSmallScreen && (
          <Card className="qr-card" bordered={false} style={{ width: '100%', marginTop: '20px' }}>
            <div className="qr-code">
              <img src='' alt="QR Code" className="qr-code-img" />
            </div>
          </Card>
        )}

        {/* Render the QR card beside the form fields on larger screens */}
        {!isSmallScreen && (
          <Card className="qr-card" bordered={false} style={{ width: '20%', marginRight: '50px' }}>
            <div className="qr-code">
              <img src='' alt="QR Code" className="qr-code-img" />
            </div>
          </Card>
        )}
      </div>

      <div ref={detailsRef} style={{ width: '100%', marginTop: '20px' }}>
        {details && (
          <DetailsView 
            details={details}
            paymentDetails={paymentDetails}
            onSaveAttendance={handleSaveAttendance}
            onPunchOut={handlePunchOut}
            showPunchButtons={true} 
            showQRCode={false} 
            cardSize="small" 
          />
        )}
      </div>
    </div>
  );
};

export default AttendanceEntry;
