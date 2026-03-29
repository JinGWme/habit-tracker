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

export function getWeeklyScore(data: HabitData, endDate: Date): number {
  let totalScore = 0;

  // Find the most recent Monday (or today if today is Monday)
  const currentDate = new Date(endDate);
  const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

  // Calculate the difference to Monday
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const mondayDate = new Date(currentDate);
  mondayDate.setDate(currentDate.getDate() - diffToMonday);
  mondayDate.setHours(0, 0, 0, 0);

  const iterDate = new Date(mondayDate);
  while (iterDate <= currentDate) {
    totalScore += getDailyScore(data, iterDate);
    iterDate.setDate(iterDate.getDate() + 1);
  }

  return totalScore;
}
