import React, { useState, useEffect  } from 'react';
import { Row, Col, Card, DatePicker, Button, Typography } from 'antd';
import { FaCalendarTimes } from 'react-icons/fa';
import { FaClipboardQuestion } from "react-icons/fa6";
import { GiWallet } from 'react-icons/gi';
import { MdWorkHistory } from "react-icons/md";
import { useMediaQuery } from 'react-responsive';
import PackageRenewal from './PackageRenewal'; 
import EnquiryList from './EnquiryList';
import PaymentHistory from './PaymentListReport';
import { getEnquiryCount } from '../../Services/data.services';
import { getPendingPayments } from '../../Services/data.services';
import { getExpiredMembers, getIrregularMemberCount } from '../../Services/data.services';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const FollowUp = () => {
  // State to manage the selected date range
  const [dateRange, setDateRange] = useState([]);
  const [view, setView] = useState('followup');  // State to manage view
  const [enquiryCount, setEnquiryCount] = useState(0); // State for enquiry count
  const [pendingPayment, setPendingPayment] = useState(0);
  const [expiredDetails, setExpiredDetails] = useState([]); // Initialize properly
  const [expiredCount, setExpiredCount] = useState(0);
  const [irregularCount, setIrregularCount] = useState(0); // State for irregular count


  // Define breakpoints
  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });

  // Function to clear the date range
  const clearDateRange = () => {
    setDateRange([]);
  };

  const fetchEnquiryCount = async () => {
    try {
      const data = await getEnquiryCount();
      setEnquiryCount(data.count); // Update the count from the response
    } catch (error) {
      console.error('Error fetching enquiry count:', error);
    }
  };

  const fetchPendingPayments = async () => {
    try {
        const data = await getPendingPayments();
        setPendingPayment(data.totalPending || 0); // Update state with the total pending amount
    } catch (error) {
        console.error("Error fetching pending payments:", error.message);
    }
};

const fetchExpiredCount = async () => {
  try {
      const response = await getExpiredMembers(); // Ensure this function exists in your service
      console.log('Expired members response:', response); // Log the response
      setExpiredCount(response.expiredCount || 0);
      setExpiredDetails(response.expiredMembers || []);
  } catch (error) {
      console.error("Error fetching expired count:", error.message);
  }
};
 
const fetchIrregularCount = async () => {
  try {
    const month = moment().format('M'); // Current month (1-12)
    const year = moment().format('YYYY'); // Current year
    const data = await getIrregularMemberCount(month, year);
    console.log('Irregular member count response:', data);
    setIrregularCount(data.irregularCount || 0); // Update the count from the API response
  } catch (error) {
    console.error('Error fetching irregular member count:', error);
  }
};
    
  useEffect(() => {
    fetchEnquiryCount(); // Fetch enquiry count on component mount
    fetchPendingPayments(); // Fetch pending payments on component mount
    fetchExpiredCount(); // Fetch expired count on component mount
    fetchIrregularCount(); // Fetch irregular count on component mount
  }, []);


  // Function to handle card click and set view
  const handleCardClick = (viewName) => {
    if (viewName === 'packagerenewal') {
      fetchExpiredCount(); // Fetch expired details when switching to package renewal view
    }
    setView(viewName);
  };

  // Function to go back to the Follow-up view
  const handleBackClick = () => {
    setView('followup');
  };

  return (
    <div style={{ marginTop: '-10px' }}>
      {view === 'followup' && (
        <>
          <Title level={3} style={{ marginBottom: '20px' }}>Follow-up</Title>
          {/* Date Range and Search Section */}
          <Row gutter={16} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <Col xs={24} sm={24} md={12} style={{ display: 'flex', alignItems: 'center' }}>
              <RangePicker
                style={{ width: '100%', maxWidth: '280px' }}
                value={dateRange}
                onChange={(dates) => setDateRange(dates)}
              />
              <Button type="primary" style={{ marginLeft: '8px' }}>Search</Button>
              <Button type="default" style={{ marginLeft: '8px' }} onClick={clearDateRange}>Clear</Button>
            </Col>
          </Row>

          {/* Statistics Cards Section */}
          <Row gutter={[16, 16]}>
            {/* Enquiry Card */}
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('enquirylist')}>
                <div className="card-content">
                  <div className="card-title-section">
                    <Title level={isSmallScreen ? 5 : 4} className="card-title">Enquiry</Title>
                    <FaClipboardQuestion className="card-icon" />
                  </div>
                  <div className="card-value-section">
                    <Title level={isSmallScreen ? 1 : 2} className="card-value">{enquiryCount}</Title>
                  </div>
                  <div className="card-description-section">
                    <p className="card-description"></p>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Due Payment Card */}
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card className="custom-card" bordered={false} hoverable onClick={() => handleCardClick('paymenthistory')}>
                <div className="card-content">
                  <div className="card-title-section">
                    <Title level={isSmallScreen ? 5 : 4} className="card-title">Due Payment</Title>
                    <GiWallet className="card-icon" />
                  </div>
                  <div className="card-value-section">
                    <Title level={isSmallScreen ? 1 : 2} className="card-value">{pendingPayment}</Title>
                  </div>
                  <div className="card-description-section">
                    <p className="card-description"></p>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Package Renewal Card */}
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card className="custom-card" bordered={false}  >
                <div className="card-content">
                  <div className="card-title-section">
                    <Title level={isSmallScreen ? 5 : 4} className="card-title">Package Renewal</Title>
                    <MdWorkHistory className="card-icon" />
                  </div>
                  <div className="card-value-section">
                    <Title level={isSmallScreen ? 1 : 2} className="card-value">{expiredCount}</Title>
                  </div>
                  <div className="card-description-section">
                    <p className="card-description"></p>
                  </div>
                </div>
              </Card>
            </Col>

            {/* Irregular Member Card */}
            <Col xs={24} sm={12} md={6} lg={6}>
              <Card className="custom-card" bordered={false}>
                <div className="card-content">
                  <div className="card-title-section">
                    <Title level={isSmallScreen ? 5 : 4} className="card-title">Irregular Member</Title>
                    <FaCalendarTimes className="card-icon" />
                  </div>
                  <div className="card-value-section">
                    <Title level={isSmallScreen ? 1 : 2} className="card-value">{irregularCount}</Title>
                  </div>
                  <div className="card-description-section">
                    <p className="card-description"> </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </>
      )}

      {/* Conditional Rendering for Each Component */}
      {/* {view === 'packagerenewal' && (
        <PackageRenewal onBack={handleBackClick} expiredDetails={expiredDetails} />
      )} */}

      {view === 'enquirylist' && <EnquiryList onBack={ handleBackClick} />}
      {view === 'paymenthistory' && <PaymentHistory goToReports={handleBackClick} />}

      {/* Custom CSS for Card Styling */}
      <style jsx>{`
        .custom-card {
          transition: transform 0.3s, background-color 0.3s;
          height: 130px; 
          display: flex;
          flex-direction: column;
          border: 1px solid #e0e0e0;
          width: 100%;
          position: relative;
        }

        .custom-card:hover {
          transform: scale(1.05);
          background-color: #f5f7fa;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          padding: 15px;
          position: relative;
        }

        .card-title-section {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: ${isSmallScreen ? '-15px' : '-25px'};
          margin-left: ${isSmallScreen ? '-15px' : '-15px'};
        }

        .card-title {
          color: #333;
          margin: 0;
          flex: 1;
        }

        .card-icon {
          font-size: ${isSmallScreen ? '30px' : '32px'}; 
          color: #1890ff; 
          align-self: center;
        }

        .card-value-section {
          text-align: left;
          margin-bottom: ${isSmallScreen ? '5px' : '20px'};
          margin-top: ${isSmallScreen ? '0' : '-5px'};
        }

        .card-value {
          color: #1890ff;
          margin: 0;
        }

        .card-description-section {
          text-align: left;
          position: absolute;
          bottom: ${isSmallScreen ? '15px' : '20px'};
          left: 3px;
        }

        .card-description {
          color: #888;
          font-size: 16px;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default FollowUp;
