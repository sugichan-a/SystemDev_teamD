import React from "react";

function SearchInput({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search orders..."
      className="border rounded-lg px-4 py-2 font-roboto"
      value={value}
      onChange={onChange}
      name="search"
    />
  );
}

export default SearchInput;
