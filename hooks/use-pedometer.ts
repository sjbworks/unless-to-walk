import { Pedometer } from "expo-sensors";
import { useEffect, useState } from "react";

type PedometerState = {
  steps: number;
  isAvailable: boolean;
  isLoading: boolean;
};

export function usePedometer(): PedometerState {
  const [steps, setSteps] = useState(0);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount> | null = null;

    async function init() {
      const available = await Pedometer.isAvailableAsync();
      setIsAvailable(available);

      if (!available) {
        setIsLoading(false);
        return;
      }

      const now = new Date();
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);

      try {
        const result = await Pedometer.getStepCountAsync(start, now);
        setSteps(result.steps);
      } catch {
        // getStepCountAsync is not supported on all devices
      }

      subscription = Pedometer.watchStepCount((result) => {
        setSteps(result.steps);
      });

      setIsLoading(false);
    }

    init();

    return () => {
      subscription?.remove();
    };
  }, []);

  return { steps, isAvailable, isLoading };
}
