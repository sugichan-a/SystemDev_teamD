import React from "react";

function DateInput({ value, onChange }) {
  return (
    <input
      type="date"
      className="border rounded-lg px-4 py-2 font-roboto"
      value={value}
      onChange={onChange}
      name="orderDate"
    />
  );
}

export default DateInput;
