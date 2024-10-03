import React, { useState } from 'react';

const SearchFamilyMember = () => {
  const [searchId, setSearchId] = useState('');
  const [familyMember, setFamilyMember] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setFamilyMember(null);

    try {
      const response = await fetch(`/api/family/search/${searchId}`);
      if (!response.ok) {
        throw new Error('Family member not found');
      }
      const data = await response.json();
      setFamilyMember(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Search Family Member</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Family Member ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {familyMember && (
        <div>
          <h3>{familyMember.name}</h3>
          <p>Date of Birth: {new Date(familyMember.birthDate).toLocaleDateString()}</p>
          <p>Parent: {familyMember.parent ? familyMember.parent.name : 'None'}</p>
          <p>Children:</p>
          <ul>
            {familyMember.children.map(child => (
              <li key={child._id}>{child.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchFamilyMember;