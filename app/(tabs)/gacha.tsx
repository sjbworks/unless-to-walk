import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function GachaScreen() {
  const tint = useThemeColor({}, "tint");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.center}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tint }]}
          onPress={() => router.push("/(tabs)/gatcha-list")}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText} lightColor="#fff" darkColor="#fff">
            ガチャを引く
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 32,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
