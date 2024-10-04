import React, { useState } from 'react';

const AddMemberForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [relationship, setRelationship] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, age, relationship });
    setName('');
    setAge('');
    setRelationship('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Family Member</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
      />
      <input
        type="text"
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
        placeholder="Relationship"
        required
      />
      <button type="submit">Add Member</button>
    </form>
  );
};

export default AddMemberForm;