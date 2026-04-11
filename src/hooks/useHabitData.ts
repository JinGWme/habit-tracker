import { useState, useEffect } from "react";

const HABIT_DATA_PREFIX = "habit-tracker-data-";
const OLD_HABIT_DATA_KEY = "habit-tracker-data";

export interface HabitData {
  [date: string]: {
    [habitId: string]: boolean;
  };
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getMonthKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${HABIT_DATA_PREFIX}${year}-${month}`;
};

export function useHabitData(date: Date) {
  const [data, setData] = useState<HabitData>({});

  const dateString = formatDate(date);

  useEffect(() => {
    // 1. Loading Logic
    // Load current month, previous month and next month (to handle weekly scores at the edges of a month)
    const currentMonthKey = getMonthKey(date);

    const prevMonthDate = new Date(date);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthKey = getMonthKey(prevMonthDate);

    const nextMonthDate = new Date(date);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonthKey = getMonthKey(nextMonthDate);

    const loadData = () => {
      const currentMonthData = JSON.parse(
        localStorage.getItem(currentMonthKey) || "{}",
      );
      const prevMonthData = JSON.parse(
        localStorage.getItem(prevMonthKey) || "{}",
      );
      const nextMonthData = JSON.parse(
        localStorage.getItem(nextMonthKey) || "{}",
      );
      setData({ ...prevMonthData, ...currentMonthData, ...nextMonthData });
    };

    loadData();

    // Listen for storage changes in other tabs
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, [date.getFullYear(), date.getMonth()]);

  const updateHabit = (habitId: string, completed: boolean) => {
    const mKey = getMonthKey(date);
    const currentMonthData = JSON.parse(localStorage.getItem(mKey) || "{}");

    const newMonthData = {
      ...currentMonthData,
      [dateString]: {
        ...currentMonthData[dateString],
        [habitId]: completed,
      },
    };

    localStorage.setItem(mKey, JSON.stringify(newMonthData));

    // Update local state by merging with other potentially loaded data
    setData((prev) => ({
      ...prev,
      ...newMonthData,
    }));
  };

  const getHabitStatus = (habitId: string) => {
    return data[dateString]?.[habitId] ?? false;
  };

  return { updateHabit, getHabitStatus, data };
}
