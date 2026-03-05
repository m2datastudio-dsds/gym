import React, { useState, useEffect } from 'react';
import { Table, Radio, Select, message, Input, Typography, Button, Row, Col } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { getMemberAttendancebyMonth, getStaffAttendancebyMonth } from '../../Services/data.services';
import { GiCheckMark } from "react-icons/gi";
import { RiCloseLine } from "react-icons/ri";
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

const AttendanceReport = ({ goToReports }) => {

  const currentMonth = moment().format('MMMM');
  const currentYear = moment().year();

  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('Member');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [searchTerm, setSearchTerm] = useState('');

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMediumOrLargerScreen = useMediaQuery({ query: '(min-width: 769px)' });

  const daysInMonth = moment(`${selectedYear}-${selectedMonth}`, 'MMMM-YYYY').daysInMonth();
  const today = moment().date();

  const getMonthNumber = (monthName) => moment().month(monthName).format("M");

  const fetchAttendance = async (type) => {
    setLoading(true);
    try {
        let data;
        const monthNumber = getMonthNumber(selectedMonth);
        if (type === 'Member') {
            data = await getMemberAttendancebyMonth(monthNumber, selectedYear);
        } else {
            data = await getStaffAttendancebyMonth(monthNumber, selectedYear);
        }
        console.log("Fetched attendance data:", data); // Debugging line
        setAttendanceData(data);
        setFilteredData(data);
        setLoading(false);
    } catch (error) {
        message.error('Failed to fetch attendance data');
        setLoading(false);
    }
};

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = attendanceData.filter((record) =>
      (record.name && record.name.toLowerCase().includes(value.toLowerCase())) ||
      (record.memberID && record.memberID.toLowerCase().includes(value.toLowerCase())) ||
      (record.employeeCode && record.employeeCode.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchAttendance(selectedType);
  }, [selectedType, selectedMonth, selectedYear]);

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(value)) {
      setSelectedYear(parseInt(value, 10));
    }
  };

  const renderDayColumns = () => {
    const dayColumns = [];
    for (let i = today; i >= 1; i--) {
      const date = moment(`${selectedYear}-${selectedMonth}-${i}`, 'YYYY-MMMM-D').format('YYYY-MM-DD');
      dayColumns.push({
        title: `${moment(date).format('MMM')} ${i}`,
        dataIndex: `day-${i}`,
        key: `day-${i}`,
        render: (text, record) => {
          const attendanceDetails = record.attendanceDetails || [];
          const attendanceDetail = attendanceDetails.find(detail =>
            moment(detail.attendanceDate).format('YYYY-MM-DD') === date
          );
          return attendanceDetail ? (
            <GiCheckMark style={{ color: 'green', fontSize: '16px' }} />
          ) : (
            <RiCloseLine style={{ color: 'red', fontSize: '16px' }} />
          );
        },
      });
    }
    return dayColumns;
  };

  const processDataForTable = () => {
    return filteredData.map((record) => {
        const newRecord = { ...record };
        const attendanceDetails = record.attendanceDetails || [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = moment(`${selectedYear}-${selectedMonth}-${i}`, 'YYYY-MMMM-D').format('YYYY-MM-DD');
            const attendanceDetail = attendanceDetails.find(detail =>
                moment(detail.attendanceDate).format('YYYY-MM-DD') === date
            );
            newRecord[`day-${i}`] = attendanceDetail ? '✓' : '✗'; // Use checkmark for present, cross for absent
        }
        return newRecord;
    });
};

  const tableColumns = [
    {
      title: 'S No.',
      key: 'index',
      width: 40,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'ID',
      dataIndex: selectedType === 'Member' ? 'memberID' : 'employeeCode',
      key: 'id',
      width: 70,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 140,
    },
    {
      title: 'Total Days',
      key: 'totalDays',
      width: 70,
      render: () => daysInMonth,
    },
    {
      title: 'Present Days',
      key: 'presentDays',
      width: 90,
      render: (record) =>
        record.attendanceDetails
          ? record.attendanceDetails.filter(detail => detail.inTime !== null).length
          : 0,
    },
    ...(isMediumOrLargerScreen ? renderDayColumns() : []),
  ];

  return (
    <div style={{ marginTop: '-25px', marginLeft: '-10px', marginRight: '-15px' }}>
      <Typography.Title level={3}>Attendance Report</Typography.Title>

      <Row gutter={[4, 8]} align="middle" justify="start" style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={4} md={2}>
          <Button type="primary" onClick={goToReports} style={{ width: '100%' }}>
            Back to Reports
          </Button>
        </Col>
        <Col xs={1} sm={1} md={1} />
        <Col xs={24} sm={5} md={3}>
          <Radio.Group
            onChange={(e) => setSelectedType(e.target.value)}
            value={selectedType}
          >
            <Radio value="Member">Member</Radio>
            <Radio value="Staff">Staff</Radio>
          </Radio.Group>
        </Col>
        <Col xs={12} sm={4} md={2}>
          <Select
            value={selectedMonth}
            style={{ width: '100%' }}
            onChange={handleMonthChange}
          >
            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
              <Option key={month} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={12} sm={4} md={2}>
          <Input
            value={selectedYear}
            style={{ width: '100%' }}
            onChange={handleYearChange}
            placeholder="Year"
            type="number"
          />
        </Col>
        <Col xs={24} sm={6} md={3}>
          <Input
            placeholder="Search"
            value={searchTerm}
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
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      <Table
        columns={tableColumns}
        dataSource={processDataForTable()}
        rowKey={(record) => (selectedType === 'Member' ? record.memberID : record.employeeCode)}
        loading={loading}
        pagination={false}
        scroll={isMediumOrLargerScreen ? { x: 'max-content' } : undefined}
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
        tableLayout={isSmallScreen ? 'auto' : 'fixed' }
      />
    </div>
  );
};

export default AttendanceReport;
