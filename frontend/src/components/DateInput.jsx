import React, { useRef, useEffect, useState } from 'react';

const DateInput = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [defaultDate, setDefaultDate] = useState('');

  // 初期表示用に、value が空なら今日の日付を設定
  useEffect(() => {
    if (!value) {
      const today = new Date().toISOString().split('T')[0];
      setDefaultDate(today);
    }
  }, [value]);

  const handleIconClick = () => {
    if (inputRef.current) {
      if (inputRef.current.showPicker) {
        inputRef.current.showPicker(); // 対応ブラウザのみ
      } else {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        ref={inputRef}
        type="date"
        value={value || defaultDate}
        onChange={onChange}
        style={{
          padding: '6px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

    </div>
  );
};

export default DateInput;
