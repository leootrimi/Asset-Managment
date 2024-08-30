import React, { useState } from 'react';

const Setting = ({ onUpdate }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [valuableCount, setValuableCount] = useState(1);
  const [valuableNames, setValuableNames] = useState(['']);
  const [deprecationValues, setDeprecationValues] = useState(['']);

  const handleValuableCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    if (count >= 1) {
      setValuableCount(count);
      setValuableNames(Array(count).fill(''));
      setDeprecationValues(Array(count).fill(''));
    }
  };

  const handleValuableNameChange = (index, value) => {
    const newValuableNames = [...valuableNames];
    newValuableNames[index] = value;
    setValuableNames(newValuableNames);
  };

  const handleDeprecationValueChange = (index, value) => {
    const newDeprecationValues = [...deprecationValues];
    newDeprecationValues[index] = value;
    setDeprecationValues(newDeprecationValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onUpdate === 'function') {
      onUpdate({
        name,
        surname,
        email,
        jobTitle,
        department,
        valuableCount,
        valuableNames,
        deprecationValues,
      });
    } else {
      console.error('onUpdate prop is not a function');
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Surname:</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Job Title:</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        </div>
        <div>
          <label>Department:</label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div>
          <label>Valuable Count:</label>
          <input
            type="number"
            value={valuableCount}
            min="1"
            onChange={handleValuableCountChange}
          />
        </div>
        {Array.from({ length: valuableCount }).map((_, index) => (
          <div key={index}>
            <label>Valuable {index + 1} Name:</label>
            <input
              type="text"
              value={valuableNames[index] || ''}
              onChange={(e) => handleValuableNameChange(index, e.target.value)}
            />
            <label>Deprecation Value (€):</label>
            <input
              type="number"
              value={deprecationValues[index] || ''}
              onChange={(e) => handleDeprecationValueChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default Setting;
