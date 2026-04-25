import { ImageSourcePropType } from "react-native";
import { useMemo } from "react";

const walkingImages: ImageSourcePropType[] = [
  require("@/assets/images/top/walking-nomal.png"),
  require("@/assets/images/top/walking-faster.png"),
  require("@/assets/images/top/walking-kayu.png"),
  require("@/assets/images/top/walking-looking-down.png"),
  require("@/assets/images/top/walking-power.png"),
  require("@/assets/images/top/walking-skip.png"),
  require("@/assets/images/top/walking-slow.png"),
  require("@/assets/images/top/walking-tired.png"),
  require("@/assets/images/top/walking-yakara.png"),
];

const inactiveImages: ImageSourcePropType[] = [
  require("@/assets/images/top/stopping.png"),
  require("@/assets/images/top/lying-down.png"),
];

const LOW_STEPS_THRESHOLD = 500;

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function useWalkImage(steps: number): ImageSourcePropType {
  return useMemo(() => {
    if (steps < LOW_STEPS_THRESHOLD) {
      return pickRandom(inactiveImages);
    }
    return pickRandom(walkingImages);
  }, [steps < LOW_STEPS_THRESHOLD]);
}
