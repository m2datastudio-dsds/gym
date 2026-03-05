import React, { useEffect, useState } from 'react';
import { Layout, Badge, Tooltip } from 'antd';
import { MdEditCalendar } from "react-icons/md";
import { BellOutlined, UserOutlined, CloudSyncOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const StyledHeader = styled(Header)`
  position: fixed;
  width: calc(100% - ${(props) => (props.isMobile ? '80px' : props.collapsed ? '80px' : '200px')});
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #001529;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  left: ${(props) => (props.isMobile ? '80px' : props.collapsed ? '80px' : '200px')};
  transition: left 0.3s, width 0.3s;

  @media (max-width: 899px) {
    left: 80px;
    width: calc(100% - 80px);
    padding: 0 10px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
`;

const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: bold;

  @media (max-width: 899px) {
    font-size: 16px;
  }
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  flex: 1;
  justify-content: flex-end;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIcon = styled.div`
  font-size: 20px;
  color: #fff;
  margin: 0 10px;
`;

const ResponsiveHeader = ({ collapsed, isMobile, onIconClick }) => {
  const navigate = useNavigate();
  const [updateStatus, setUpdateStatus] = useState(null);
  const [downloadPercent, setDownloadPercent] = useState(null);
  const isElectron = typeof window !== 'undefined' && window.electron?.updater;

  useEffect(() => {
    if (!isElectron) return;
    const unsubStatus = window.electron.updater.onStatus((data) => {
      setUpdateStatus(data);
      if (data.status !== 'downloaded' && data.status !== 'available') setDownloadPercent(null);
    });
    const unsubProgress = window.electron.updater.onDownloadProgress((data) => {
      setDownloadPercent(data.percent != null ? Math.round(data.percent) : null);
    });
    return () => {
      if (typeof unsubStatus === 'function') unsubStatus();
      if (typeof unsubProgress === 'function') unsubProgress();
    };
  }, [isElectron]);

  const handleCalendarClick = () => {
    navigate('/sidenav/attendance-entry');
  };

  const handleCheckUpdates = () => {
    if (isElectron) window.electron.updater.checkForUpdates();
  };

  const updateStatusText =
    updateStatus?.status === 'checking'
      ? 'Checking for updates...'
      : updateStatus?.status === 'available'
        ? 'Update found. Downloading...'
        : updateStatus?.status === 'not-available'
          ? 'You are on the latest version.'
          : updateStatus?.status === 'error'
            ? updateStatus.error || 'Update check failed.'
            : updateStatus?.status === 'downloaded'
              ? 'Update ready. Restart to install.'
              : downloadPercent != null
                ? `Downloading: ${downloadPercent}%`
                : null;

  return (
    <StyledHeader collapsed={collapsed} isMobile={isMobile}>
      <HeaderContent>
        <HeaderTitle>Gym Management System</HeaderTitle>
      </HeaderContent>
      <CenterSection>
        {updateStatusText && (
          <span style={{ marginRight: 12, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
            {updateStatusText}
          </span>
        )}
        <IconContainer>
          {isElectron && (
            <Tooltip title="Check for Updates">
              <StyledIcon
                onClick={handleCheckUpdates}
                style={{ cursor: 'pointer' }}
              >
                <CloudSyncOutlined style={{ fontSize: '20px', color: 'white' }} />
              </StyledIcon>
            </Tooltip>
          )}
          <Tooltip title="Attendance">
            <StyledIcon as={MdEditCalendar} onClick={handleCalendarClick} style={{ cursor: 'pointer' }} />
          </Tooltip>
          <StyledIcon>
            <Badge count={5} style={{
              position: 'relative',
              top: 2,
              right: 20,
              backgroundColor: '#f5222d',
              color: '#fff',
              padding: '0 3px',
              fontSize: '12px'
            }}>
              <BellOutlined style={{ fontSize: '20px', color: 'white' }} />
            </Badge>
          </StyledIcon>
          <StyledIcon as={UserOutlined} />
        </IconContainer>
      </CenterSection>
    </StyledHeader>
  );
};

export default ResponsiveHeader;
