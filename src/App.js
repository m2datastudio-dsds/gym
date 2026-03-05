import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Global.css';

import Login from './pages/Login.jsx';
import SideNav from './pages/SideNav.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AttendanceTable from './components/Attendance/AttendanceTable.jsx';
import AttendanceEntry from './components/Attendance/AttendanceEntry.jsx';
import Packages from './components/Packages/Packages.jsx';
import Members from './components/Members/Members.jsx';
import ResponsiveHeader from './pages/ResponsiveHeader.jsx';
import Staffs from './components/Staff/Staffs.jsx';
import Payment from './components/Payment/Payment.jsx';
import Reports from './components/Reports/Reports.jsx';
import FollowUp from './components/Followup/FollowUp.jsx';
import Enquiry from './components/Enquiry/Enquiry.jsx';
import EnquiryList from './components/Reports/EnquiryReports.jsx';
import DietPlan from './components/DietPlan/DietList.jsx';
import Exercise from './components/Exercise/ExerciseList.jsx';
import Expenses from './components/Expenses/ExpensesList.jsx';
import BusinessInfo from './components/BusinessInfo/BusinessInfo.jsx';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  // Detect screen size changes and handle layout adjustments (without auto-collapse)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsMobile(true);
        setCollapsed(true); // Keep collapsed for mobile view
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuClick = () => {
    setCollapsed(!collapsed); // Manually toggle collapsed state on menu icon click
  };

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* Header */}
      <ResponsiveHeader collapsed={collapsed} isMobile={isMobile} onIconClick={handleMenuClick} />
      
      {/* Main Layout */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        {/* SideNav */}
        <SideNav collapsed={collapsed} onMenuClick={handleMenuClick} />
        
        {/* Main Content */}
        <div style={{ flexGrow: 1, padding: '20px', marginTop: '64px', transition: 'margin-left 0.3s', marginLeft: collapsed ? '80px' : '200px' }}>
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="package" element={<Packages />} />
            <Route path="staff" element={<Staffs />} />
            <Route path="attendance" element={<AttendanceTable />} />
            <Route path='attendance-entry' element={ <AttendanceEntry /> } />
            <Route path='payment' element={ <Payment /> } />
            <Route path='reports' element={ <Reports />} />
            <Route path='followup' element={ <FollowUp /> } />
            <Route path='enquiry' element={ < Enquiry />} />
            <Route path='enquiryList' element={ <EnquiryList /> } />
            <Route path='diet' element={ <DietPlan /> } />
            <Route path='exercise' element={ <Exercise /> } />
            <Route path='expense' element={ <Expenses /> } />
            <Route path='businessinfo' element={ <BusinessInfo /> } />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidenav/*" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
