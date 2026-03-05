import React, { useState } from 'react';
import StaffTable from './StaffTable.jsx';
import AddStaff from './AddStaff.jsx';
import EditStaff from './EditStaff.jsx';
import { Button } from 'antd';

const Staffs = () => {
  const [currentView, setCurrentView] = useState('table');
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const handleAddStaff = () => {
    setCurrentView('add');
  };

  const handleEditStaff = (id) => {
    setSelectedStaffId(id);
    setCurrentView('edit');
  };

  const handleBack = () => {
    setCurrentView('table');
  };

  const handleSuccess = () => {
    setCurrentView('table');
  };

  return (
    <div>
      {currentView === 'table' && (
        <StaffTable onAddStaff={handleAddStaff} onEditStaff={handleEditStaff} />
      )}
      {currentView === 'add' && (
        <AddStaff onBack={handleBack} />
      )}
      {currentView === 'edit' && selectedStaffId && (
        <EditStaff visible={true} onClose={handleBack} onSuccess={handleSuccess} staffId={selectedStaffId} />
      )}
      {currentView !== 'table' && (
        <Button onClick={handleBack} style={{ position: 'absolute', top: 20, left: 20 }}>
          Back
        </Button>
      )}
    </div>
  );
};

export default Staffs;
