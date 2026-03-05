import React, { useEffect, useState } from 'react';
import { Button, Table, Input, message, Typography } from 'antd';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getallPaymentDetails } from '../../Services/data.services'; // Assuming this is the correct path to your service file

const PaymentHistory = ({ goToReports }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMediumOrLargerScreen = useMediaQuery({ query: '(min-width: 769px)' });

  // Fetch payment details from the API using the service function
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      setLoading(true);
      try {
        const response = await getallPaymentDetails();

        // Log the response to verify the structure
        console.log('Response from API:', response);

        // Accessing the data array correctly from the response
        if (response.data && Array.isArray(response.data)) {
          const payments = response.data; // Accessing the array of payment details inside 'data'
          setPaymentData(payments);
          setFilteredData(payments);
        } else {
          message.error('Unexpected API response format.');
        }
      } catch (error) {
        console.error('API call failed:', error);
        message.error('Failed to fetch payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  // Handle search filter for name, memberID, or mobileNumber
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = paymentData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.memberID.toLowerCase().includes(value.toLowerCase()) ||
        item.mobileNumber.includes(value)
    );
    setFilteredData(filtered);
  };

  return (
    <div style={{ marginTop: '-20px', marginLeft: '-15px', marginRight: '-25px' }}>
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

            .search-input {
              width: 100% !important;
            }

            .table-responsive {
              overflow-x: hidden; /* Prevent horizontal scroll */
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

            .search-input {
              width: 200px !important;
            }

            .table-responsive {
              overflow-x: hidden; /* Prevent horizontal scroll */
            }
          }

          /* For larger screens */
          @media (min-width: 1025px) {
            .ant-table-cell {
              padding: 16px;
            }

            .search-input {
              width: 200px !important;
            }

            .table-responsive {
              overflow-x: visible; /* Allow horizontal scroll if necessary */
            }
          }

          /* Adding space between back button and search input on medium and large screens */
          @media (min-width: 769px) {
            .action-row {
              display: flex;
              justify-content: flex-start;
              gap: 20px;
            }
          }
        `}
      </style>

      <Typography.Title level={3}>Payment History</Typography.Title>

      <div className="action-row">
        <Button onClick={goToReports} type="primary" style={{ marginBottom: '20px' }}>
          Back to Reports
        </Button>

        {/* Search Input */}
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
          style={{ width: 200, marginBottom: 20 }} // Adjusted width for search input
        />
      </div>

      <div className="table-responsive">
        {/* Table for displaying filtered payment details */}
        <Table
          dataSource={filteredData}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        >
          {/* Conditionally render columns based on screen size */}
          {isSmallScreen ? (
            <>
              <Table.Column title="Member ID" dataIndex="memberID" key="memberID" />
              <Table.Column title="Name" dataIndex="name" key="name" />
              <Table.Column title="Mobile Number" dataIndex="mobileNumber" key="mobileNumber" />
              <Table.Column title="Paid Amount" dataIndex="paidAmount" key="paidAmount" />
            </>
          ) : (
            <>
              <Table.Column title="Payment ID" dataIndex="paymentId" key="paymentId" />
              <Table.Column title="Member ID" dataIndex="memberID" key="memberID" />
              <Table.Column title="Name" dataIndex="name" key="name" />
              <Table.Column title="Mobile Number" dataIndex="mobileNumber" key="mobileNumber" />
              <Table.Column title="Package Type" dataIndex="packageType" key="packageType" />
              <Table.Column title="Package Amount" dataIndex="packageAmount" key="packageAmount" />
              <Table.Column title="Paid Amount" dataIndex="paidAmount" key="paidAmount" />
              <Table.Column title="Pending Amount" dataIndex="pending" key="pending" />
              <Table.Column
                title="Paid Date"
                dataIndex="paidDate"
                key="paidDate"
                render={(date) => new Date(date).toLocaleDateString()} // Format the date
              />
              <Table.Column title="Payment Mode" dataIndex="paymentMode" key="paymentMode" />
            </>
          )}
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
