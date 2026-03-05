// MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav.jsx';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}

      <SideNav />
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', marginLeft: '200px' }}>
        <Outlet />  {/* This renders the route's content */}
      </div>
    </div>
  );
};

export default MainLayout;
