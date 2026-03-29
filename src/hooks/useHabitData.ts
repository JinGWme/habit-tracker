import { useState, useEffect } from "react";

const HABIT_DATA_KEY = "habit-tracker-data";

export interface HabitData {
  [date: string]: {
    [habitId: string]: boolean;
  };
}

export function useHabitData(date: Date) {
  const [data, setData] = useState<HabitData>({});

  const dateString = date.toLocaleDateString("en-CA");

  useEffect(() => {
    const storedData = localStorage.getItem(HABIT_DATA_KEY);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const updateHabit = (habitId: string, completed: boolean) => {
    const newData = {
      ...data,
      [dateString]: {
        ...data[dateString],
        [habitId]: completed,
      },
    };
    setData(newData);
    localStorage.setItem(HABIT_DATA_KEY, JSON.stringify(newData));
  };

  const getHabitStatus = (habitId: string) => {
    return data[dateString]?.[habitId] ?? false;
  };

  return { updateHabit, getHabitStatus, data };
}
