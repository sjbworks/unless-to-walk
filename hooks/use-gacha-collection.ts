import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "gacha_collection";

type Collection = Record<string, number>; // itemId -> pull count

async function loadCollection(): Promise<Collection> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Collection;
  } catch {}
  return {};
}

async function saveCollection(data: Collection): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useGachaCollection() {
  const [collection, setCollection] = useState<Collection>({});

  useEffect(() => {
    loadCollection().then(setCollection);
  }, []);

  const addItem = useCallback(async (itemId: string) => {
    setCollection((prev) => {
      const next = { ...prev, [itemId]: (prev[itemId] ?? 0) + 1 };
      saveCollection(next);
      return next;
    });
  }, []);

  return { collection, addItem };
}
