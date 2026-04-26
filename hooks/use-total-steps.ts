import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";

type StoredSteps = {
  total: number;
  lastDate: string; // "YYYY-MM-DD"
  lastDaySteps: number;
};

const STORAGE_KEY = "walk_steps";

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

async function loadStored(): Promise<StoredSteps> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredSteps;
  } catch {}
  return { total: 0, lastDate: toDateString(new Date()), lastDaySteps: 0 };
}

async function saveStored(data: StoredSteps): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useTotalSteps(todaySteps: number): number {
  const [totalSteps, setTotalSteps] = useState(0);
  const storedRef = useRef<StoredSteps | null>(null);

  useEffect(() => {
    loadStored().then((stored) => {
      storedRef.current = stored;
      const today = toDateString(new Date());
      if (stored.lastDate === today) {
        setTotalSteps(stored.total);
      } else {
        const updated: StoredSteps = {
          total: stored.total + stored.lastDaySteps,
          lastDate: today,
          lastDaySteps: 0,
        };
        storedRef.current = updated;
        setTotalSteps(updated.total);
        saveStored(updated);
      }
    });
  }, []);

  // todaySteps が更新されるたびに累計を再計算して保存
  useEffect(() => {
    if (storedRef.current === null) return;

    const today = toDateString(new Date());
    const base =
      storedRef.current.lastDate === today
        ? storedRef.current.total - storedRef.current.lastDaySteps
        : storedRef.current.total + storedRef.current.lastDaySteps;

    const newTotal = base + todaySteps;
    const updated: StoredSteps = {
      total: newTotal,
      lastDate: today,
      lastDaySteps: todaySteps,
    };
    storedRef.current = updated;
    setTotalSteps(newTotal);
    saveStored(updated);
  }, [todaySteps]);

  return totalSteps;
}
