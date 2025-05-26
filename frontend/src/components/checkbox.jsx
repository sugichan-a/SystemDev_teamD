import React, { useState } from 'react';

const Checkbox = ({ label, defaultChecked = false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ marginRight: '8px' }}
      />
      {label}
    </label>
  );
};

export default Checkbox;