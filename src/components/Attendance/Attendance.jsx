import React from 'react';
import { Table, Typography, Input, Button, Row, Col, DatePicker, Select } from 'antd';
import { SearchOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Attendance = ({ onViewDetails, data, onSearch, onDateChange, onMemberChange, members, selectedMember, searchValue, placeholder }) => {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });

  const columns = [
    { title: 'No.', dataIndex: 'no', key: 'no', responsive: ['lg'] },
    { title: 'Type', dataIndex: 'type', key: 'type', responsive: ['lg'] },
    { title: 'ID', dataIndex: 'id', key: 'id', responsive: ['lg'] },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Mobile No.', dataIndex: 'mobileNumber', key: 'mobileNumber', responsive: ['lg'] },
    { title: 'Attendance Date', dataIndex: 'attendanceDate', key: 'attendanceDate', responsive: ['lg'] },
    { title: 'In Time', dataIndex: 'inTime', key: 'inTime' },
    { title: 'Out Time', dataIndex: 'outTime', key: 'outTime' },
    {
      title: 'View',
      key: 'view',
      render: (text, record) => (
        <Button icon={<EyeOutlined />} onClick={() => onViewDetails(record)} />
      ),
    },
  ];

  return (
    <div className="table-container">
      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col span={isSmallScreen ? 24 : 6}>
          <RangePicker style={{ width: '100%' }} onChange={onDateChange} format='DD-MM-YYYY' />
        </Col>
        <Col span={isSmallScreen ? 24 : 6}>
          <Select
            showSearch
            placeholder={placeholder}
            value={selectedMember}
            optionFilterProp="children"
            onChange={onMemberChange}
            style={{ width: '100%' }}
            allowClear
          >
            {members.map(member => (
              <Option key={member.id} value={member.id}>
                {member.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={isSmallScreen ? 24 : 6}>
          <Input
            placeholder="Search text"
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            prefix={<SearchOutlined style={{ color: '#ccc' }} />}
            suffix={
              searchValue && (
                <CloseCircleOutlined
                  style={{ color: '#ccc', cursor: 'pointer' }}
                  onClick={() => {
                    onSearch('');
                    onDateChange(null); // Clear date selection when search is cleared
                  }}
                />
              )
            }
          />
        </Col>
        <Col span={isSmallScreen ? 24 : 4}>
          <Button type="primary" onClick={() => onSearch('')}>Clear</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={isSmallScreen || isMediumScreen ? { x: '100%' } : undefined}
      />
    </div>
  );
};

export default Attendance;
