import { useHabitData } from "../hooks/useHabitData";
import "./WeeklySummary.css";

const habits = [
  { id: "lunch", name: "🍱 午饭 8 成饱" },
  { id: "afternoon-snack", name: "🚫 下午不吃零食" },
  { id: "dinner", name: "🍽️ 晚饭 8 成饱" },
  { id: "evening-snack", name: "🚫 晚上不吃零食" },
];

function WeeklySummary() {
  const { data } = useHabitData(new Date());

  const summary = habits.map((habit) => {
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0];
      if (data[dateString]?.[habit.id]) {
        count++;
      }
    }
    return { name: habit.name, count };
  });

  return (
    <div>
      <header className="weekly-summary-header">
        <h2>每周总结</h2>
      </header>
      <div className="summary-list">
        {summary.map((habit) => (
          <div key={habit.name} className="summary-card">
            <h3>{habit.name}</h3>
            <p>本周已完成 {habit.count} / 7 次</p>
            <progress value={habit.count} max={7}></progress>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklySummary;
