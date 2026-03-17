import { useState } from "react";
import { useHabitData } from "../hooks/useHabitData";
import { useSwipeable } from "react-swipeable";
import "./DailyTracker.css";

const habits = [
  { id: "lunch", name: "🍱 午饭 8 成饱" },
  { id: "afternoon-snack", name: "🚫 下午不吃零食" },
  { id: "dinner", name: "🍽️ 晚饭 8 成饱" },
  { id: "evening-snack", name: "🚫 晚上不吃零食" },
];

function DailyTracker() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const [currentDate, setCurrentDate] = useState(yesterday);
  const { updateHabit, getHabitStatus } = useHabitData(currentDate);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (tomorrow <= new Date()) {
        setCurrentDate(tomorrow);
      }
    },
    onSwipedRight: () => {
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      setCurrentDate(yesterday);
    },
    trackMouse: true,
  });

  const dateString = currentDate.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const isToday = new Date().toDateString() === currentDate.toDateString();

  return (
    <div {...handlers} style={{ touchAction: "pan-y" }}>
      <header className="daily-tracker-header">
        <h2>{dateString}</h2>
        {isToday && <span>(今天)</span>}
      </header>

      <div className="habit-list">
        {habits.map((habit) => (
          <button
            key={habit.id}
            onClick={() => updateHabit(habit.id, !getHabitStatus(habit.id))}
            className={`habit-button ${
              getHabitStatus(habit.id) ? "completed" : ""
            }`}
          >
            {habit.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DailyTracker;
