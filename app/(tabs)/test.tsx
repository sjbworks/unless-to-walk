import { WalkCard } from "@/components/walk-card";
import { getWalkTitle } from "@/constants/walk-titles";
import { usePedometer } from "@/hooks/use-pedometer";
import { useTotalSteps } from "@/hooks/use-total-steps";
import { useWalkImage } from "@/hooks/use-walk-image";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestScreen() {
  const { steps, isLoading } = usePedometer();
  const totalSteps = useTotalSteps(steps);
  const image = useWalkImage(steps);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <WalkCard
            steps={steps}
            comment={getWalkTitle(totalSteps)}
            image={image}
            points={Math.floor(steps / 10)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  loader: {
    marginTop: 40,
  },
});
