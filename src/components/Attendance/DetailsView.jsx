// DetailsView.jsx
import React from 'react';
import { Card, Button, Table, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';

const { Title } = Typography;

const DetailsView = ({
  details,
  paymentDetails,
  onBack,
  onSaveAttendance,
  onPunchOut,
  showPunchButtons = false,
  showQRCode = false,
  cardSize = 'large',
  isAttendanceTable = false,
}) => {
  const isPunchInDisabled = (details.inTime && details.inTime !== '') || (details.outTime && details.outTime !== '');
  const isPunchOutDisabled = !(details.inTime && details.inTime !== '') || (details.outTime && details.outTime !== '');

  const activeStatus = details.active;
  const joiningDate = details.type === 'Member' 
    ? (details.startDate ? moment(details.startDate).format('DD/MM/YYYY') : '') 
    : (details.joiningDate ? moment(details.joiningDate).format('DD/MM/YYYY') : '');
 
    const expireDate = details.endDate && moment(details.endDate).isValid() 
  ? moment(details.endDate).format('DD/MM/YYYY') 
  : '';

  
  const isMember = details.type === 'Member';
  const cardBackgroundColor = activeStatus ? '#ffffff' : '#FF9999';

  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });

  const defaultImage = 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg';
  const imageUrl = (details.type === 'Member' && details.memberPhoto && details.memberPhoto !== 'undefined' && details.memberPhoto !== 'null')
  ? details.memberPhoto
  : (details.type === 'Staff' && details.photoPicture && details.photoPicture !== 'undefined' && details.photoPicture !== 'null')
    ? details.photoPicture
    : defaultImage;

  const name = details.name || '';
  const identifier = details.type === 'Member' 
    ? `${details.memberID}-${name}` 
    : `${details.employeeCode}-${name}`;

  const handlePunchIn = () => {
    const type = details.type === 'Member' ? 'member' : 'staff';
    onSaveAttendance(identifier, type);
  };

  const handlePunchOut = () => {
    const type = details.type === 'Member' ? 'member' : 'staff';
    onPunchOut(identifier, type);
  };

  const paymentColumns = [
    {
      title: 'Total Amount',
      dataIndex: 'packageAmount',
      key: 'packageAmount',
      render: (text) => `₹${text.toFixed(2)}`,
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      render: (text) => `₹${text.toFixed(2)}`, 
    },
    {
      title: 'Pending Amount',
      dataIndex: 'pending',
      key: 'pending',
      render: (text, record) => {
        const color = record.pending > 0 ? 'red' : 'green';
        return (
          <span style={{ color: color }}>
            {record.pending > 0 ? `₹${record.pending.toFixed(2)}` : 'Nil'}
          </span>
        );
      },
    },
  ];

  const cardWidth = isSmallScreen ? '100%' : isMediumScreen ? '50%' : '40%';
  const paymentCardWidth = isSmallScreen ? '100%' : isMediumScreen ? '50%' : '30%';
  const qrCardWidth = isSmallScreen ? '100%' : isMediumScreen ? '30%' : '25%';

  return (
    <div className="details-container">
      {onBack && (
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          style={{ position: 'absolute', top: 0, left: 6 }}
        >
          Back
        </Button>
      )}
      <div className="details-content">
        <Card className="member-card" bordered={false} style={{ backgroundColor: cardBackgroundColor, width: cardWidth, flexShrink: 0 }}>
          <div className="member-photo-wrapper">
            <img
              src={imageUrl}
              alt={`${name}'s photo`}
              className="member-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultImage;
              }}
            />
          </div>
          <div className="member-info">
            <div className="centered-info">
              <p className='member-id'>{details.type === 'Member' ? details.memberID : details.employeeCode}</p>
              <p className='status' style={{ color: activeStatus ? 'green' : 'red' }}>{`(${activeStatus ? 'Active' : 'Inactive'})`}</p>
              <p className='name'>{name}</p>
            </div>
            {isMember && <p><strong>Biometric ID:</strong> {details.biometricID || ''}</p>}
            <p><strong>Joining Date:</strong> {joiningDate}</p>
            <p><strong>Expire Date:</strong> {expireDate}</p>
            {isMember && <p><strong>Package / Price:</strong> {`${details.packageType} / ₹${details.totalAmount}`}</p>}
            <p><strong>In Time:</strong> {details.inTime}</p>
            <p><strong>Out Time:</strong> {details.outTime}</p>
          </div>
          <div className="attendance-status">
            <div className="attendance-box">
              <p className="attendance-detail"><strong>Month:</strong> {details.month}</p>
              <p className="attendance-detail"><strong>Attendance:</strong> {details.attendanceCount} Days</p>
            </div>
          </div>
          {showPunchButtons && (
            <div className="attendance-buttons">
              <Button
                type="primary"
                onClick={handlePunchIn}
                disabled={isPunchInDisabled}
              >
                Punch In
              </Button>
              <Button
                type="primary"
                onClick={handlePunchOut}
                disabled={isPunchOutDisabled}
              >
                Punch Out
              </Button>
            </div>
          )}
        </Card>

        {/* {isMember && paymentDetails && (
          <Card className="payment-card" bordered={false} style={{ width: paymentCardWidth, flexShrink: 0 }}>
            <Title level={4}>Payment Details:</Title>
            <Table
              columns={paymentColumns}
              dataSource={[paymentDetails]}
              pagination={false}
              rowKey="memberID"
              bordered
              style={{ width: '100%' }} // Ensure the table fits within the card
            />
          </Card>
        )} */}

        {showQRCode && (
          <Card className="qr-card" bordered={false} style={{ width: qrCardWidth, flexShrink: 0 }}>
            <div className="qr-code">
              <img alt="QR Code" className="qr-code-img" />
            </div>
          </Card>
        )}
      </div>

      <style jsx>{`
        .details-container {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 20px 5px;
          margin-top: -20px;
        }
        .details-content {
          display: flex;
          flex-direction: ${isSmallScreen ? 'column' : 'row'};
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 20px;
          gap: 10px;
        }
        .member-photo-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .member-photo {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 10%;
        }
        .member-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .centered-info p {
          text-align: center;
          margin-bottom: 20px;
        }
        .status {
          color: ${activeStatus ? 'green' : 'red'};
          font-weight: 600;
          font-size: 13px;
        }
        .member-id, .name {
          color: #FF0000;
          font-weight: 600;
          font-size: 14px;
        }
        .member-info p {
          margin: 0.5em 0;
          display: flex;
          align-items: center;
        }
        .member-info p strong {
          width: 120px;
          display: inline-block;
          text-align: right;
          padding-right: 10px;
        }
        .attendance-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .attendance-box {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .attendance-detail {
          margin: 0;
        }
        .attendance-buttons {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .payment-card {
          height: auto;
        }
        .qr-card {
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default DetailsView;
