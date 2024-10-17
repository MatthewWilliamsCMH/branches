import React, { useState } from 'react';

const DeleteMemberForm = ({ onDelete }) => {
  const [memberId, setMemberId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete(memberId);
    setMemberId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete Family Member</h2>
      <input
        type="text"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
        placeholder="Member ID"
        required
      />
      <button type="submit">Delete Member</button>
    </form>
  );
};

export default DeleteMemberForm;