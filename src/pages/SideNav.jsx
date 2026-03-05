import React from 'react';
import { Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { RiDashboardFill, RiMoneyRupeeCircleFill } from 'react-icons/ri';
import { FaUsers, FaClipboardList, FaWallet, FaInfoCircle, FaMailBulk } from 'react-icons/fa';
import { FaClipboardCheck } from 'react-icons/fa6';
import { IoMdPricetags } from 'react-icons/io';
import { BiSolidUserAccount, BiSolidMessageRoundedDots } from 'react-icons/bi';
import { GiFruitBowl, GiWeightLiftingUp } from 'react-icons/gi';
import { PiNotepadFill } from 'react-icons/pi';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: ${(props) => (props.collapsed ? '80px' : '200px')};
  height: 100vh; /* Full screen height */
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #001529; /* Ant Design dark theme color */
  transition: width 0.3s;
  z-index: 1001;
  overflow: hidden; /* Prevent overflow issues */

  /* Custom scrollbar styles for mobile */
  @media (max-width: 899px) {
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
    ::-webkit-scrollbar-track {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const ButtonContainer = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  .ant-btn {
    background-color: #1890ff;
    border-color: #1890ff; 
    color: white; 
    padding: 18px;
  }
`;

const SideNav = ({ collapsed, onMenuClick }) => {
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(`/sidenav/${e.key}`);
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <ButtonContainer>
        <Button
          type="primary"
          onClick={onMenuClick}
          icon={<MenuOutlined style={{ fontSize: '20px', color: 'white' }} />}
        />
      </ButtonContainer>
      <Menu
        mode="inline"
        theme="dark" // Apply the Ant Design dark theme
        inlineCollapsed={collapsed}
        onClick={handleMenuClick}
      >
        <Menu.Item key="dashboard" icon={<RiDashboardFill />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="members" icon={<FaUsers />}>
          Members
        </Menu.Item>
        <Menu.Item key="package" icon={<IoMdPricetags />}>
          Package Type
        </Menu.Item>
        <Menu.Item key="payment" icon={<RiMoneyRupeeCircleFill />}>
          Payments
        </Menu.Item>
        <Menu.Item key='reports' icon={<FaClipboardList />}>
          Reports
        </Menu.Item>
        <Menu.Item key="staff" icon={<BiSolidUserAccount />}>
          Staff
        </Menu.Item>
        <Menu.Item key="enquiry" icon={<BiSolidMessageRoundedDots />}>
          Enquiry
        </Menu.Item>
        <Menu.Item key="followup" icon={<FaClipboardCheck />}>
          Follow-up
        </Menu.Item>
        <Menu.Item key="diet" icon={<GiFruitBowl />}>
          Diet-Plan
        </Menu.Item>
        <Menu.Item key="exercise" icon={<GiWeightLiftingUp />}>
          Exercise-Plan
        </Menu.Item>
        <Menu.Item key="expense" icon={<FaWallet />}>
          Expense
        </Menu.Item>
        <Menu.Item key="businessinfo" icon={<FaInfoCircle />}>
          Business Info
        </Menu.Item>
        <Menu.Item key="attendance" icon={<PiNotepadFill />}>
          Attendance List
        </Menu.Item>
      </Menu>
    </SidebarContainer>
  );
};

export default SideNav;
