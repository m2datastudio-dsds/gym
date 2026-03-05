import React, { useState } from 'react';
import MemberTable from './MemberTable.jsx';
import AddMember from './AddMembers.jsx';
import EditMember from './EditMember.jsx';
const Members = () => {
  const [view, setView] = useState('table'); // table, add, edit
  const [editingMemberID, setEditingMemberID] = useState(null);

  const handleAddMemberClick = () => {
    setView('add');
  };

  const handleEditMemberClick = (memberID) => {
    setEditingMemberID(memberID);
    setView('edit');
  };

  const handleBackClick = () => {
    setView('table');
    setEditingMemberID(null);
  };

  return (
    <div>
      {view === 'table' && <MemberTable onAddMember={handleAddMemberClick} onEditMember={handleEditMemberClick} />}
      {view === 'add' && <AddMember onBack={handleBackClick} />}
      {view === 'edit' && <EditMember memberId={editingMemberID} onBack={handleBackClick} />}
    </div>
  );
};

export default Members;
