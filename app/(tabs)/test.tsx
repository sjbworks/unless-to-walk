import { WalkCard } from "@/components/walk-card";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <WalkCard
          steps={8432}
          comment="今日も気持ちよく歩けた！"
          image={require("@/assets/images/top/walking-nomal.png")}
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
