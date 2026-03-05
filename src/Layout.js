import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './Global.css';

import SideNav from './pages/SideNav';
import Dashboard from './pages/Dashboard';
import AttendanceTable from './components/Attendance/AttendanceTable';
import AttendanceEntry from './components/Attendance/AttendanceEntry';
import Packages from './components/Packages/Packages';
import Members from './components/Members/Members';
import ResponsiveHeader from './pages/ResponsiveHeader';
import Staffs from './components/Staff/Staffs';
import Payment from './components/Payment/Payment';
import Reports from './components/Reports/Reports';
import FollowUp from './components/Followup/FollowUp';
import Enquiry from './components/Enquiry/Enquiry';
import EnquiryList from './components/Reports/EnquiryReports';
import DietPlan from './components/DietPlan/DietList';
import Exercise from './components/Exercise/ExerciseList';
import Expenses from './components/Expenses/ExpensesList';
import BusinessInfo from './components/BusinessInfo/BusinessInfo';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsMobile(true);
        setCollapsed(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <ResponsiveHeader collapsed={collapsed} isMobile={isMobile} onIconClick={handleMenuClick} />
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <SideNav collapsed={collapsed} onMenuClick={handleMenuClick} />
        <div style={{ flexGrow: 1, padding: '20px', marginTop: '64px', transition: 'margin-left 0.3s', marginLeft: collapsed ? '80px' : '200px' }}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="package" element={<Packages />} />
            <Route path="staff" element={<Staffs />} />
            <Route path="attendance" element={<AttendanceTable />} />
            <Route path="attendance-entry" element={<AttendanceEntry />} />
            <Route path="payment" element={<Payment />} />
            <Route path="reports" element={<Reports />} />
            <Route path="followup" element={<FollowUp />} />
            <Route path="enquiry" element={<Enquiry />} />
            <Route path="enquiryList" element={<EnquiryList />} />
            <Route path="diet" element={<DietPlan />} />
            <Route path="exercise" element={<Exercise />} />
            <Route path="expense" element={<Expenses />} />
            <Route path="businessinfo" element={<BusinessInfo />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
