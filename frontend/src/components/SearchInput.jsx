import React from 'react';

const SearchInput = ({ keyword, setKeyword }) => {
  return (
    <input
      type="text"
      className="search-input"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      placeholder="キーワードを入力"
      style={{
        flex: 1,
        padding: '7px',
        marginTop: '-13px',
        border: '1px solid #ccc',
        borderRadius: '6px',
        fontSize: '1rem',
      }}
    />
  );
};

export default SearchInput;
