import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "aruki_spent";

async function loadSpent(): Promise<number> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return parseInt(raw, 10);
  } catch {}
  return 0;
}

async function saveSpent(spent: number): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, String(spent));
  } catch {}
}

type UseArukiResult = {
  aruki: number;
  gachaTickets: number;
  spendArukiForGacha: () => Promise<boolean>;
};

export function useAruki(totalSteps: number): UseArukiResult {
  const [spentAruki, setSpentAruki] = useState(0);
  const loadedRef = useRef(false);

  useEffect(() => {
    loadSpent().then((spent) => {
      setSpentAruki(spent);
      loadedRef.current = true;
    });
  }, []);

  const totalAruki = Math.floor(totalSteps / 100);
  const availableAruki = Math.max(0, totalAruki - spentAruki);
  const gachaTickets = Math.floor(availableAruki / 10);

  const spendArukiForGacha = async (): Promise<boolean> => {
    if (gachaTickets <= 0) return false;
    const newSpent = spentAruki + 10;
    setSpentAruki(newSpent);
    await saveSpent(newSpent);
    return true;
  };

  return { aruki: availableAruki, gachaTickets, spendArukiForGacha };
}
