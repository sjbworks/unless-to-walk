import { useEffect, useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { GACHA_ITEMS } from "@/constants/gacha-items";

function Spinner() {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return <Animated.View style={[styles.spinner, style]} />;
}

export default function GachaScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const tint = useThemeColor({}, "tint");

  const handleGacha = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsLoading(true);
    const item = GACHA_ITEMS[Math.floor(Math.random() * GACHA_ITEMS.length)];
    setTimeout(() => {
      setIsLoading(false);
      router.push({ pathname: "/(tabs)/gacha-result", params: { id: item.id } });
    }, 2500);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Modal visible={isLoading} transparent animationType="fade">
        <View style={styles.overlay}>
          <Spinner />
          <ThemedText style={styles.loadingText} lightColor="#fff" darkColor="#fff">
            ガチャを引いています...
          </ThemedText>
        </View>
      </Modal>

      <View style={styles.center}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tint }]}
          onPress={handleGacha}
          activeOpacity={0.8}
          disabled={isLoading}
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  spinner: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 6,
    borderColor: "rgba(255,255,255,0.2)",
    borderTopColor: "#fff",
    borderRightColor: "#fff",
  },
  loadingText: {
    fontSize: 16,
  },
});
