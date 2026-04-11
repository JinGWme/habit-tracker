import { HabitData } from "../hooks/useHabitData";
import { HABITS } from "../constants/habits";

export function getDailyScore(data: HabitData, date: Date): number {
  const dateString = date.toLocaleDateString("en-CA");
  const dayData = data[dateString] || {};

  let completedCount = 0;
  for (const habit of HABITS) {
    if (dayData[habit.id]) {
      completedCount++;
    }
  }

  return (completedCount * (completedCount + 1)) / 2;
}

export function getWeeklyScore(data: HabitData, date: Date): number {
  let totalScore = 0;

  const currentDate = new Date(date);
  const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

  // Calculate the difference to Monday
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const mondayDate = new Date(currentDate);
  mondayDate.setDate(currentDate.getDate() - diffToMonday);
  mondayDate.setHours(0, 0, 0, 0);

  // Calculate for 7 days (Monday to Sunday)
  for (let i = 0; i < 7; i++) {
    const iterDate = new Date(mondayDate);
    iterDate.setDate(mondayDate.getDate() + i);
    totalScore += getDailyScore(data, iterDate);
  }

  return totalScore;
}
