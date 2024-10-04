import React from 'react';

const MemberDetails = ({ member }) => {
  return (
    <div className="member-details">
      <h2>{member.name}</h2>
      <li>Age: {member.age}</li>
      <li>Relationship: {member.relationship}</li>
      <li>DOB: {member.dateOfBirth}</li>
      <li>Gender: {member.gender}</li>      
    </div>
  );
};

export default MemberDetails;