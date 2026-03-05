// import React, { useState } from 'react';
// import { Button, Table, Input, DatePicker, Space, Select, Typography, Pagination } from 'antd';
// import { SearchOutlined, CloseCircleOutlined, DownloadOutlined } from '@ant-design/icons';
// import { IoEye } from "react-icons/io5";
// import { FaPen } from "react-icons/fa";
// import moment from 'moment';
// import { useMediaQuery } from 'react-responsive';

// const { RangePicker } = DatePicker;
// const { Option } = Select;
// const { Column } = Table;

// const PackageRenewal = ({ onBack }) => {
//   // Initial data source
//   const initialData = [
//     {
//       key: '1',
//       memberId: '184',
//       name: 'SARAN S',
//       mobileNo: '9841960273',
//       packageName: 'strength monthly pkg',
//       startDate: '01/05/2024',
//       expiredDate: '30/05/2024',
//       staffName: 'Manikandan A',
//     },
//     {
//       key: '2',
//       memberId: '080',
//       name: 'MONISH KUMAR E',
//       mobileNo: '9790882277',
//       packageName: 'strength monthly pkg',
//       startDate: '01/05/2024',
//       expiredDate: '30/05/2024',
//       staffName: 'sastha mohan',
//     },
//     // More sample data...
//   ];

//   // State management
//   const [dataSource, setDataSource] = useState(initialData);
//   const [globalSearchText, setGlobalSearchText] = useState('');
//   const [dateRange, setDateRange] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(8);

//   // Responsive breakpoints
//   const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });

//   // Handle global search text change
//   const handleGlobalSearch = (value) => {
//     setGlobalSearchText(value);
//     filterData(value, dateRange);
//   };

//   // Handle date range picker change
//   const handleDateRangeChange = (dates) => {
//     setDateRange(dates);
//     filterData(globalSearchText, dates);
//   };

//   // Filter data based on search text and date range
//   const filterData = (searchText, range) => {
//     const filteredData = initialData.filter((item) => {
//       const matchesSearchText =
//         item.name.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.memberId.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.mobileNo.includes(searchText);

//       const matchesDateRange = range.length
//         ? moment(item.startDate, 'DD/MM/YYYY').isBetween(range[0], range[1], 'days', '[]')
//         : true;

//       return matchesSearchText && matchesDateRange;
//     });

//     setDataSource(filteredData);
//   };

//   // Clear all filters and search fields
//   const handleClear = () => {
//     setGlobalSearchText('');
//     setDateRange([]);
//     setDataSource(initialData);
//   };

//   return (
//     <div className="container">
//       <Typography.Title level={3} style={{ color: '#0A21C0', alignSelf: 'flex-start' }} className='title'>Package Renewal</Typography.Title>
//       <div className={`header ${isSmallScreen ? 'header-small' : ''}`}>
//         <Space
//           direction={isSmallScreen ? 'vertical' : 'horizontal'}
//           style={{ width: isSmallScreen ? '100%' : 'auto', marginBottom: '20px' }}
//         >
//           <Button type="primary" onClick={onBack} style={{ width: isSmallScreen ? '100%' : 'auto' }}>
//             Back
//           </Button>
//           <Input
//             placeholder="Search"
//             value={globalSearchText}
//             onChange={(e) => handleGlobalSearch(e.target.value)}
//             style={{ width: isSmallScreen ? '100%' : 200 }}
//             prefix={<SearchOutlined style={{ color: '#ccc' }} />}
//             suffix={
//               globalSearchText && (
//                 <CloseCircleOutlined
//                   style={{ color: '#ccc', cursor: 'pointer' }}
//                   onClick={() => handleGlobalSearch('')}
//                 />
//               )
//             }
//           />
//           <Button type="primary" icon={<DownloadOutlined />} style={{ width: isSmallScreen ? '100%' : '50px' }}></Button>
//           <RangePicker
//             value={dateRange}
//             onChange={handleDateRangeChange}
//             style={{ width: isSmallScreen ? '100%' : undefined }}
//           />
//           <Button type="primary" icon={<SearchOutlined />} style={{ width: isSmallScreen ? '100%' : undefined}}></Button>
//           <Button type="default" onClick={handleClear} style={{ width: isSmallScreen ? '100%' : undefined }}>
//             Clear
//           </Button>
//         </Space>
//       </div>
//       <div className="table-container">
//         <Table
//           bordered
//           dataSource={dataSource}
//           pagination={false}
//           rowKey="key"
//           className='responsive-table'
//           size={isSmallScreen ? 'small' : 'middle'}
//           scroll={isSmallScreen ? { x: '100%' } : undefined}
//         >
//           {/* Columns for large screens */}
//           {!isSmallScreen && (
//             <>
//               <Column title="Sl.No." dataIndex="key" key="key" />
//               <Column title="Member ID" dataIndex="memberId" key="memberId" />
//               <Column title="Name" dataIndex="name" key="name" />
//               <Column title="Mobile No" dataIndex="mobileNo" key="mobileNo" />
//               <Column title="Package Name" dataIndex="packageName" key="packageName" />
//               <Column title="Start Date" dataIndex="startDate" key="startDate" />
//               <Column title="Expired Date" dataIndex="expiredDate" key="expiredDate" />
//               <Column title="Staff Name" dataIndex="staffName" key="staffName" />
//               <Column 
//                 title="Renew"
//                 key="renew"
//                 render={() => (
//                   <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button type="link" icon={<FaPen style={{ fontSize: '20px' }} />} />
//                   </div>
//                 )}
//               />
//               <Column 
//                 title="View Details"
//                 key="viewDetails"
//                 render={() => (
//                   <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button type="link" icon={<IoEye style={{ color: '#E30B5C', fontSize: '20px' }} />} />
//                   </div>
//                 )}
//               />
//             </>
//           )}

//           {/* Columns for small screens */}
//           {isSmallScreen && (
//             <>
//               <Column title="Name" dataIndex="name" key="name" />
//               <Column title="Package Name" dataIndex="packageName" key="packageName" />
//               <Column title="Staff Name" dataIndex="staffName" key="staffName" />
//               <Column 
//                 title="Renew"
//                 key="renew"
//                 render={() => (
//                   <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <Button type="link" icon={<FaPen style={{ fontSize: '20px' }} />} />
//                   </div>
//                 )}
//               />
//             </>
//           )}
//         </Table>
//         <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
//           <Pagination
//             current={currentPage}
//             pageSize={rowsPerPage}
//             total={dataSource.length}
//             onChange={(page) => setCurrentPage(page)}
//             showSizeChanger={false}
//           />
//           <Select
//             defaultValue={rowsPerPage}
//             onChange={(value) => setRowsPerPage(value)}
//             style={{ width: 100 }}
//           >
//             <Option value={4}>4 / page</Option>
//             <Option value={6}>6 / page</Option>
//             <Option value={8}>8 / page</Option>
//           </Select>
//         </div>
//         <div style={{ marginTop: '20px' }}>
//           <strong>Renewal Amount: ₹1,60,500.00</strong>
//         </div>
//       </div>
//       <style jsx>{`
//         .container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin: 8px;
//           width: 100%;
//           margin-top: -8px;
//         }

//         .header {
//           margin-bottom: 20px;
//           display: flex;
//           justify-content: flex-start;
//           width: 100%;
//           align-items: center;
//         }

//         .header-small {
//           flex-direction: column;
//           align-items: flex-start;
//         }

//         .table-container {
//           width: 100%;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PackageRenewal;






import React, { useState, useEffect } from 'react';
import { Button, Table, Input, DatePicker, Space, Select, Typography, Pagination } from 'antd';
import { SearchOutlined, CloseCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import { IoEye } from "react-icons/io5";
import { FaPen } from "react-icons/fa";
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Column } = Table;

const PackageRenewal = ({ onBack, expiredDetails }) => {
  const [dataSource, setDataSource] = useState(expiredDetails); // Use the passed expiredDetails
  const [globalSearchText, setGlobalSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });

  useEffect(() => {
    console.log('Received expiredDetails in PackageRenewal:', expiredDetails);
    setDataSource(expiredDetails); // Update dataSource when expiredDetails changes
  }, [expiredDetails]);

  const handleGlobalSearch = (value) => {
    setGlobalSearchText(value);
    filterData(value, dateRange);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
    filterData(globalSearchText, dates);
  };

  const filterData = (searchText, range) => {
    const filteredData = expiredDetails.filter((item) => {
      const matchesSearchText =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.memberId.toLowerCase().includes(searchText.toLowerCase()) ||
        item.mobileNo.includes(searchText);

      const matchesDateRange = range.length
        ? moment(item.startDate, 'DD/MM/YYYY').isBetween(range[0], range[1], 'days', '[]')
        : true;

      return matchesSearchText && matchesDateRange;
    });

    setDataSource(filteredData);
  };

  const handleClear = () => {
    setGlobalSearchText('');
    setDateRange([]);
    setDataSource(expiredDetails); // Reset to original data
  };

  return (
    <div className="container">
      <Typography.Title level={3} style={{ color: '#0A21C0', alignSelf: 'flex-start' }}>Package Renewal</Typography.Title>
      <div className={`header ${isSmallScreen ? 'header-small' : ''}`}>
        <Space
          direction={isSmallScreen ? 'vertical' : 'horizontal'}
          style={{ width: isSmallScreen ? '100%' : 'auto', marginBottom: '20px' }}
        >
          <Button type="primary" onClick={onBack} style={{ width: isSmallScreen ? '100%' : 'auto' }}>Back</Button>
          <Input
            placeholder="Search"
            value={globalSearchText}
            onChange={(e) => handleGlobalSearch(e.target.value)}
            style={{ width: isSmallScreen ? '100%' : 200 }}
            prefix={<SearchOutlined style={{ color: '#ccc' }} />}
            suffix={
              globalSearchText && (
                <CloseCircleOutlined
                  style={{ color: '#ccc', cursor: 'pointer' }}
                  onClick={() => handleGlobalSearch('')}
                />
              )
            }
          />
          <Button type="primary" icon={<DownloadOutlined />} style={{ width: isSmallScreen ? '100%' : '50px' }}></Button>
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            style={{ width: isSmallScreen ? '100%' : undefined }}
          />
          <Button type="primary" icon={<SearchOutlined />} style={{ width: isSmallScreen ? '100%' : undefined }}></Button>
          <Button type="default" onClick={handleClear} style={{ width: isSmallScreen ? '100%' : undefined }}>Clear</Button>
        </Space>
      </div>
      <div className="table-container">
        <Table
          bordered
          dataSource={dataSource}
          pagination={false}
          rowKey="key"
          className="responsive-table"
          size={isSmallScreen ? 'small' : 'middle'}
        >
          <Column title="Sl.No." dataIndex="key" key="key" />
          <Column title="Member ID" dataIndex="memberId" key="memberId" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Mobile No" dataIndex="mobileNo" key="mobileNo" />
          <Column title="Package Name" dataIndex="packageName" key="packageName" />
          <Column title="Start Date" dataIndex="startDate" key="startDate" />
          <Column title="Expired Date" dataIndex="expiredDate" key="expiredDate" />
          <Column
            title="Renew"
            key="renew"
            render={() => (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="link" icon={<FaPen style={{ fontSize: '20px' }} />} />
              </div>
            )}
          />
          <Column
            title="View Details"
            key="viewDetails"
            render={() => (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="link" icon={<IoEye style={{ color: '#E30B5C', fontSize: '20px' }} />} />
              </div>
            )}
          />
        </Table>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 8px;
          width: 100%;
          margin-top: -8px;
        }

        .header {
          margin-bottom: 20px;
          display: flex;
          justify-content: flex-start;
          width: 100%;
          align-items: center;
        }

        .header-small {
          flex-direction: column;
          align-items: flex-start;
        }

        .table-container {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default PackageRenewal;

