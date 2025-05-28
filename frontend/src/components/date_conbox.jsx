import React, { useState, useEffect } from 'react';

const DateSelector = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));
    if (selectedDay > daysInMonth) {
      setSelectedDay(1);
    }
  }, [selectedYear, selectedMonth]);

  return (
    <div className="flex space-x-2 p-4 bg-gray-100 rounded-lg">
      {/* 年 */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="p-2 border rounded"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}年
          </option>
        ))}
      </select>

      {/* 月 */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="p-2 border rounded"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}月
          </option>
        ))}
      </select>

      {/* 日 */}
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(Number(e.target.value))}
        className="p-2 border rounded"
      >
        {days.map((day) => (
          <option key={day} value={day}>
            {day}日
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
