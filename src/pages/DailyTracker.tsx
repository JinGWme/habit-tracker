import { useNavigate, useParams } from "react-router-dom";
import { useHabitData, formatDate } from "../hooks/useHabitData";
import { useSwipeable } from "react-swipeable";
import { HABITS } from "../constants/habits";
import { getDailyScore, getWeeklyScore } from "../utils/scoring";
import "./DailyTracker.css";

function DailyTracker() {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();

  let currentDate = new Date();
  if (date) {
    const [year, month, day] = date.split("-");
    if (year && month && day) {
      currentDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day),
      );
    }
  }

  // The useHabitData hook provides getHabitStatus for currentDate, and 'data' object.
  const { updateHabit, getHabitStatus, data } = useHabitData(currentDate);

  const dailyScore = getDailyScore(data, currentDate);
  const weeklyScore = getWeeklyScore(data, currentDate);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (tomorrow <= new Date()) {
        const dateString = formatDate(tomorrow);
        navigate(`/day/${dateString}`);
      }
    },
    onSwipedRight: () => {
      const yesterday = new Date(currentDate);
      yesterday.setDate(yesterday.getDate() - 1);
      const dateString = formatDate(yesterday);
      navigate(`/day/${dateString}`);
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

      <div className="score-board">
        <div className="score-card">
          <span>今日积分</span>
          <strong>{dailyScore}</strong>
        </div>
        <div className="score-card">
          <span>本周累计积分</span>
          <strong>{weeklyScore}</strong>
        </div>
      </div>

      <div className="habit-list">
        {HABITS.map((habit) => (
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
