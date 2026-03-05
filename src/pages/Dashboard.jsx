import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Progress } from 'antd';
import {
  FaUsers, FaUserCheck, FaUserTimes, FaMale, FaFemale, FaTransgender, 
  FaRegCalendarCheck, FaRupeeSign, FaRegMoneyBillAlt, FaHourglassHalf, 
  FaBirthdayCake, FaBirthdayCake as FaBirthdayStaff
} from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import { getDashboardStats } from '../Services/data.services';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardStats();
        setDashboardData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cardData = [
    { title: "Total Members", icon: <FaUsers />, value: dashboardData?.totalMembers || 0 },
    { title: "Active Members", icon: <FaUserCheck />, value: dashboardData?.activeMembers || 0 },
    { title: "Inactive Members", icon: <FaUserTimes />, value: dashboardData?.inactiveMembers || 0 },
    { title: "Men Members", icon: <FaMale />, value: dashboardData?.menMembers || 0 },
    { title: "Women Members", icon: <FaFemale />, value: dashboardData?.womenMembers || 0 },
    { title: "Transgender Members", icon: <FaTransgender />, value: dashboardData?.transgenderMembers || 0 },
    { title: "Today Follow-up", icon: <FaRegCalendarCheck />, value: dashboardData?.todayFollowup || 0 },
    { title: "Amount Received", icon: <FaRupeeSign />, value: `₹${(dashboardData?.amountReceived || 0).toFixed(2)}` },
    { title: "Total Expense", icon: <FaRegMoneyBillAlt />, value: `₹${(dashboardData?.totalExpense || 0).toFixed(2)}` },
    { title: "Amount Pending", icon: <FaHourglassHalf />, value: `₹${(dashboardData?.amountPending || 0).toFixed(2)}`},
    { title: "Today Birthday (members)", icon: <FaBirthdayCake />, value: dashboardData?.todayBirthdayMembers || 0 },
    { title: "Today Birthday (staff)", icon: <FaBirthdayStaff />, value: dashboardData?.todayBirthdayStaff || 0 }
  ];

const chartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Income',
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75,192,192,0.4)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'Expenses',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [35, 49, 70, 71, 46, 35, 30]
    }
  ]
};

const chartOptions = {
  maintainAspectRatio: false,  // Allow chart to resize freely
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

const tableData = [
  { key: '1', package: 'Strength Monthly Pkg', count: 18, value: 18 },
  { key: '2', package: 'Cardio Monthly Pkg', count: 4, value: 4 },
  { key: '3', package: 'Crossfit Monthly Pkg', count: 2, value: 2 },
  { key: '4', package: 'Strength Quarterly Pkg', count: 16, value: 16 },
  { key: '5', package: 'Strength Half Yearly Pkg', count: 9, value: 9 },
  { key: '6', package: 'Strength Annual Pkg', count: 10, value: 10 },
  { key: '7', package: 'Cardio Quarterly Pkg', count: 9, value: 9 }
];

const columns = [
  {
    title: 'Packages',
    dataIndex: 'package',
    key: 'package',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (value) => (
      <Progress percent={(value / 20) * 100} showInfo={true} strokeColor={twoColors} />
    ),
  }
];

const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

  return (
    <div>
      <style>
        {`
          .dashboard-container {
            max-height: 100vh; 
            overflow: auto;
            padding: 20px;
          }

          @media (max-width: 1200px) {
            .dashboard-container {
              max-height: 80vh;
              overflow-y: auto;
            }
          }

          @media (max-width: 768px) {
            .dashboard-container {
              max-height: 60vh;
              overflow-y: auto;
            }
          }

          .dashboard-container::-webkit-scrollbar {
            width: 7px;
          }

          .dashboard-container::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
          }

          .dashboard-container::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.5);
          }

          .dashboard-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 6px;
          }

          .custom-card {
            transition: transform 0.3s, background-color 0.3s;
            margin-Top: -10px;
            height: 120px;
          }

          .custom-card:hover {
            transform: scale(1.05);
            background-color: #D4F0FD;
          }

          .custom-card .ant-card-head {
            border-bottom: none;
          }

          .custom-card .ant-card-head-title {
            font-size: 15px;
            margin-top: 15px;
            word-wrap: break-word;
            word-break: break-word;
            white-space: normal;
            display: block;
            flex: 1;
          }

          .custom-card .ant-card-body {
            font-weight: bold;
            display: flex;
            align-items: center;
            text-align: left;
            margin-Top: -25px;
          }

          .custom-card-icon {
            font-size: 30px;
            color: #1890ff;
            margin-left: auto;
          }

          .lato-bold {
            font-weight: bold;
          }

          .table-container {
            max-height: 230px; /* Decrease height of table */
            overflow-y: auto;
          }

          .table-container::-webkit-scrollbar {
            width: 8px;
          }

          .table-container::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
            border-radius: 6px;
          }

          .table-container::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.4);
          }

          .table-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 6px;
          }
        `}
      </style>
      <div className="dashboard-container">
        <Row gutter={[16, 16]}>
          {cardData.map((data, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={index}>
              <Card className="custom-card" title={data.title} bordered={false}>
                <div className="lato-bold">
                  {data.value}
                </div>
                {data.icon && <span className="custom-card-icon">{data.icon}</span>}
              </Card>
            </Col>
          ))}
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} lg={12}>
            <Card title="Income and Expenses" bordered={false}>
              <div style={{ height: '230px' }}> 
                <Bar data={chartData1} options={chartOptions} />
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Packages" bordered={false}>
              <div className="table-container">
                <Table dataSource={tableData} columns={columns} pagination={false} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
