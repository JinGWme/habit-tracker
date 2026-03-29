import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const navigate = useNavigate();

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

  const startDayOfWeek = startOfMonth.getDay() === 0 ? 6 : startOfMonth.getDay() - 1; // Mon = 0, Sun = 6

  const daysInMonth = endOfMonth.getDate();
  const days = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDayClick = (day: Date) => {
    // Format YYYY-MM-DD local time correctly
    const dateString = day.toLocaleDateString("en-CA"); // YYYY-MM-DD
    navigate(`/day/${dateString}`);
  };

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {currentMonth.toLocaleDateString("zh-CN", { year: "numeric", month: "long" })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </header>

      <div className="calendar-grid">
        {["一", "二", "三", "四", "五", "六", "日"].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-cell ${day ? 'active' : 'empty'} ${day && day.toDateString() === new Date().toDateString() ? 'today' : ''}`}
            onClick={() => day && handleDayClick(day)}
          >
            {day ? day.getDate() : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
