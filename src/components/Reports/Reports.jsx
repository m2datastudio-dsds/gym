import React, { useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive'; // Import react-responsive
import MemberImage from '../../assets/images/Members.png';
import StaffImage from '../../assets/images/Staffs.png';
import EnquiryImage from '../../assets/images/Enquiry.png';
import ExpenseImage from '../../assets/images/Expense.png';
import PaymentlistImage from '../../assets/images/PaymentList.png';
import PaymentHistoryImage from '../../assets/images/PaymentHistory.png';
import AttendanceImage from '../../assets/images/Attendance.png';

import MembersList from './MembersList';
import StaffList from './StaffList';
import EnquiryReports from './EnquiryReports';
import PaymentHistory from './PaymentHistory';
import PaymentListReport from './PaymentListReport';
import AttendanceReport from './AttendanceReport';
import ExpenseReports from './ExpenseReports';

const { Title } = Typography;

const Reports = () => {
  const [view, setView] = useState('reports'); // Manage view state

  // Define breakpoints for responsiveness
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const handleCardClick = (viewName) => {
    setView(viewName); // Set the view based on the card clicked
  };

  const handleBackClick = () => {
    setView('reports'); // Set back to reports view
  };

  return (
    <div style={{ padding: '20px' }}>
      {view === 'reports' && (
        <>
          <Row gutter={[16, 16]}>
            {/* Adjust column spans based on screen size */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('membersList')}>
                <div className="card-content">
                  <div className="card-text">
                    <Title level={4} className="card-title">Members List</Title>
                  </div>
                  <div className="card-icon">
                    <img src={MemberImage} alt="Members" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              </Card>
            </Col>

            {/* Repeat for each card */}
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('staffList')}>
                <div className="card-content">
                  <div className="card-text">
                    <Title level={4} className="card-title">Staff List</Title>
                  </div>
                  <div className="card-icon">
                    <img src={StaffImage} alt="Staffs" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('enquiryReports')}>
                <div className="card-content">
                  <div className="card-text">
                    <Title level={4} className="card-title">Enquiry List</Title>
                  </div>
                  <div className="card-icon">
                    <img src={EnquiryImage} alt="Staffs" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('expenseList')}>
                <div className="card-content">
                  <div className="card-text">
                    <Title level={4} className="card-title">Expense List</Title>
                  </div>
                  <div className="card-icon">
                    <img src={ExpenseImage} alt="Staffs" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('paymentList')}>
                <div className="card-content">
                  <div className="card-text">
                    <Title level={4} className="card-title">Payment List</Title>
                  </div>
                  <div className="card-icon">
                    <img src={PaymentlistImage} alt="Staffs" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('paymentHistory')}>
                <div className="card-content">
                  <div className="card-text">
                    <Title level={4} className="card-title">Payment History</Title>
                  </div>
                  <div className="card-icon">
                    <img src={PaymentHistoryImage} alt="Staffs" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('attendanceReport')}>
                <div className="card-content">
                  <div className="card-text">
                    <Title level={4} className="card-title">Attendance Report</Title>
                  </div>
                  <div className="card-icon">
                    <img src={AttendanceImage} alt="Attendance" style={{ width: '50px', height: '50px' }} />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Conditional Rendering for Members List */}
      {view === 'membersList' && <MembersList goToReports={handleBackClick} />}
      {view === 'staffList' && <StaffList goToReports={handleBackClick} />}
      {view === 'enquiryReports' && <EnquiryReports goToReports={handleBackClick} />}
      {view === 'paymentList' && <PaymentListReport goToReports={handleBackClick} />}
      {view === 'paymentHistory' && <PaymentHistory goToReports={handleBackClick} />}
      {view === 'attendanceReport' && <AttendanceReport goToReports={handleBackClick} />}
      {view === 'expenseList' && <ExpenseReports goToReports={handleBackClick} />}

      <style jsx>{`
        .custom-card {
          transition: transform 0.3s, background-color 0.3s;
          height: 130px; 
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e0e0e0;
          width: 100%; /* Default to full width for smaller screens */
          max-width: ${isMobile ? '100%' : '300px'}; /* Adjust width based on screen size */
        }

        .custom-card:hover {
          transform: scale(1.05);
          background-color: #f5f7fa;
        }

        .card-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0 20px;
        }

        .card-text {
          text-align: left;
          flex: 1;
          padding-right: 30px;
        }

        .card-title {
          color: #333;
          margin-bottom: 0;
        }

        .card-icon {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
        }

        /* Responsive Styles */
        @media (max-width: 767px) {
          .custom-card {
            height: 120px;
          }
        }
      `}</style>
    </div>
  );
};

export default Reports;
