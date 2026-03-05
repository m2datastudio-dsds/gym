import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Row, Col, Tag, Typography } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getallEnquiries } from '../../Services/data.services';

const { Option } = Select;
const { Title } = Typography;

const EnquiryList = ({ onBack }) => {
    const [enquiries, setEnquiries] = useState([]);
    const [filteredEnquiries, setFilteredEnquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const isMediumOrLargerScreen = useMediaQuery({ query: '(min-width: 769px)' });

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            const data = await getallEnquiries();
            const formattedEnquiries = data.enquiries.map((enquiry, index) => ({
                ...enquiry,
                key: index + 1,
                enquiryDate: enquiry.enquiryDate ? enquiry.enquiryDate.split('T')[0] : '',
                expectedJoiningDate: enquiry.expectedJoiningDate ? enquiry.expectedJoiningDate.split('T')[0] : '',
                followUpDate: enquiry.followUpDate ? enquiry.followUpDate.split('T')[0] : '',
                name: `${enquiry.firstName} ${enquiry.lastName}`,
            }));
            setEnquiries(formattedEnquiries);
            setFilteredEnquiries(formattedEnquiries);
        } catch (error) {
            console.error('Error fetching enquiries:', error);
        }
    };

    const handleSearch = (value) => {
        setSearchTerm(value);
        applyFilters(value, filterStatus);
    };

    const handleStatusFilter = (value) => {
        const statusValue = value || 'All';
        setFilterStatus(statusValue);
        applyFilters(searchTerm, statusValue);
    };

    const applyFilters = (searchTerm, filterStatus) => {
        let filtered = enquiries;
        if (searchTerm) {
            filtered = filtered.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.mobileNumber.includes(searchTerm)
            );
        }

        if (filterStatus !== 'All') {
            filtered = filtered.filter((item) => item.status === filterStatus);
        }

        setFilteredEnquiries(filtered);
    };

    return (
        <div style={{ marginLeft: '-10px' }}>
            <style>
                {`
          .ant-table {
            width: 100%;
          }

          /* Adjust the table column widths for small and medium screens */
          @media (max-width: 768px) {
            .ant-table-cell {
              white-space: normal;
              word-wrap: break-word;
              padding: 8px;
            }

            .ant-btn {
              font-size: 12px;
              padding: 4px 8px;
            }

            .ant-table-thead > tr > th {
              padding: 8px !important;
            }

            .ant-table-tbody > tr > td {
              padding: 8px !important;
            }
          }

          @media (min-width: 769px) and (max-width: 1024px) {
            .ant-table-cell {
              white-space: normal;
              padding: 12px;
            }

            .ant-btn {
              font-size: 14px;
            }

            .ant-table-thead > tr > th {
              padding: 12px !important;
            }

            .ant-table-tbody > tr > td {
              padding: 12px !important;
            }
          }

          @media (min-width: 1025px) {
            .ant-table-cell {
              padding: 16px;
            }

            .ant-avatar {
              width: 56px;
              height: 56px;
            }

            .ant-table-thead > tr > th {
              padding: 16px !important;
            }

            .ant-table-tbody > tr > td {
              padding: 16px !important;
            }
          }
        `}
            </style>

            <Title level={3}>Enquiry Reports</Title>

            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Button type="primary" onClick={onBack} style={{ width: isSmallScreen ? '100%' : 'auto' }}>
                    Back
                </Button>

                <Col xs={24} sm={12} md={4}>
                    <Input
                        placeholder="Search by name or mobile"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        prefix={<SearchOutlined />}
                        suffix={
                            searchTerm && (
                                <CloseCircleOutlined
                                    style={{ color: '#ccc', cursor: 'pointer' }}
                                    onClick={() => handleSearch('')}
                                />
                            )
                        }
                    />
                </Col>
                <Col xs={24} sm={12} md={4}>
                    <Select
                        defaultValue="All"
                        value={filterStatus}
                        onChange={handleStatusFilter}
                        allowClear
                        style={{ width: '100%' }}
                    >
                        <Option value="All">All</Option>
                        <Option value="Pending">Pending</Option>
                        <Option value="Completed">Completed</Option>
                    </Select>
                </Col>
            </Row>

            <Table dataSource={filteredEnquiries} pagination={{ pageSize: 5 }} rowKey="id">
                {/* Hide Si. No. on small screens */}
                {!isSmallScreen && (
                    <Table.Column
                        title="Si. No."
                        dataIndex="key"
                        key="key"
                        width={50}
                    />
                )}
                <Table.Column
                    title="Name"
                    dataIndex="name"
                    key="name"
                    width={150}
                />
                <Table.Column
                    title="Mobile"
                    dataIndex="mobileNumber"
                    key="mobileNumber"
                    width={150}
                />
                <Table.Column
                    title="Enquiry For"
                    dataIndex="enquiryFor"
                    key="enquiryFor"
                    width={200}
                />
                <Table.Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                        <Tag color={status === 'Completed' ? 'green' : 'orange'}>
                            {status}
                        </Tag>
                    )}
                    width={100}
                />

                {/* Conditionally render additional columns for medium and larger screens */}
                {isMediumOrLargerScreen && (
                    <>
                        <Table.Column
                            title="Email Id"
                            dataIndex="email"
                            key="email"
                            width={150}
                        />
                        <Table.Column
                            title="Enquiry Date"
                            dataIndex="enquiryDate"
                            key="enquiryDate"
                            width={150}
                        />
                        <Table.Column
                            title="Expected Joining Date"
                            dataIndex="expectedJoiningDate"
                            key="expectedJoiningDate"
                            width={150}
                        />
                        <Table.Column
                            title="Alternate Contact"
                            dataIndex="alternateContact"
                            key="alternateContact"
                            width={150}
                        />
                        <Table.Column
                            title="FollowUp Date"
                            dataIndex="followUpDate"
                            key="followUpDate"
                            width={150}
                        />
                    </>
                )}
            </Table>
        </div>
    );
};

export default EnquiryList;
