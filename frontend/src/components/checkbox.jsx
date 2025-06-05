import React from "react";

function Checkbox({ label, checked, onChange, name }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="mr-2"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <label className="font-roboto text-gray-700">{label}</label>
    </div>
  );
}

export default Checkbox;
