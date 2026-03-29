import { useHabitData } from "../hooks/useHabitData";
import { HABITS } from "../constants/habits";
import { getWeeklyScore } from "../utils/scoring";
import "./WeeklySummary.css";

function WeeklySummary() {
  const currentDate = new Date();
  const { data } = useHabitData(currentDate);

  const weeklyScore = getWeeklyScore(data, currentDate);

  const summary = HABITS.map((habit) => {
    let count = 0;
    // Calculate for the past 7 days including today
    for (let i = 0; i < 7; i++) {
      const d = new Date(currentDate);
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString("en-CA");
      if (data[dateString]?.[habit.id]) {
        count++;
      }
    }
    return { name: habit.name, count };
  });

  return (
    <div>
      <header className="weekly-summary-header">
        <h2>本周总结</h2>
        <div className="weekly-score">
          <span>本周累计积分: </span>
          <strong>{weeklyScore}</strong>
        </div>
      </header>
      <div className="summary-list">
        {summary.map((habit) => (
          <div key={habit.name} className="summary-card">
            <h3>{habit.name}</h3>
            <p>最近 7 天已完成 {habit.count} / 7 次</p>
            <progress value={habit.count} max={7}></progress>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklySummary;
