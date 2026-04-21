import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WalkCard } from "@/components/walk-card";

export default function TestScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <WalkCard
          steps={8432}
          comment="今日も気持ちよく歩けた！"
          imageUri="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800"
          points={120}
        />
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
});
