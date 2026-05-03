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
import { usePedometer } from "@/hooks/use-pedometer";
import { useTotalSteps } from "@/hooks/use-total-steps";
import { useAruki } from "@/hooks/use-aruki";
import { useGachaCollection } from "@/hooks/use-gacha-collection";
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
  const icon = useThemeColor({}, "icon");

  const { steps } = usePedometer();
  const totalSteps = useTotalSteps(steps);
  const { aruki, gachaTickets, spendArukiForGacha } = useAruki(totalSteps);
  const { addItem } = useGachaCollection();

  const stepsToNextAruki = 100 - (totalSteps % 100);
  const arukiToNextTicket = 10 - (aruki % 10 === 0 && aruki > 0 ? 10 : aruki % 10);

  const handleGacha = async () => {
    if (gachaTickets <= 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const spent = await spendArukiForGacha();
    if (!spent) return;
    setIsLoading(true);
    const item = GACHA_ITEMS[Math.floor(Math.random() * GACHA_ITEMS.length)];
    await addItem(item.id);
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

      <View style={styles.inner}>
        <View style={[styles.statsCard, { borderColor: icon }]}>
          <View style={styles.statRow}>
            <ThemedText style={styles.statLabel}>総歩数</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {totalSteps.toLocaleString()} 歩
            </ThemedText>
          </View>

          <View style={[styles.divider, { backgroundColor: icon }]} />

          <View style={styles.statRow}>
            <View>
              <ThemedText style={styles.statLabel}>あるきポイント</ThemedText>
              <ThemedText style={[styles.statHint, { color: icon }]}>
                あと {stepsToNextAruki} 歩で +1 あるき
              </ThemedText>
            </View>
            <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: tint }]}>
              {aruki} あるき
            </ThemedText>
          </View>

          <View style={[styles.divider, { backgroundColor: icon }]} />

          <View style={styles.statRow}>
            <View>
              <ThemedText style={styles.statLabel}>ガチャチケット</ThemedText>
              {gachaTickets === 0 && (
                <ThemedText style={[styles.statHint, { color: icon }]}>
                  あと {arukiToNextTicket} あるきで +1 枚
                </ThemedText>
              )}
            </View>
            <ThemedText type="defaultSemiBold" style={[styles.statValue, { color: tint }]}>
              {gachaTickets} 枚
            </ThemedText>
          </View>
        </View>

        <View style={styles.legend}>
          <ThemedText style={[styles.legendText, { color: icon }]}>
            100歩 → 1あるき　／　10あるき → ガチャ1回
          </ThemedText>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: gachaTickets > 0 ? tint : icon },
          ]}
          onPress={handleGacha}
          activeOpacity={0.8}
          disabled={isLoading || gachaTickets <= 0}
        >
          <ThemedText style={styles.buttonText} lightColor="#fff" darkColor="#fff">
            {gachaTickets > 0 ? "ガチャを引く（10あるき）" : "チケットが足りません"}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.collectionButton, { borderColor: icon }]}
          onPress={() => router.push("/(tabs)/gatcha-list")}
          activeOpacity={0.8}
        >
          <ThemedText style={[styles.collectionButtonText, { color: icon }]}>
            コレクションを見る
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
  inner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 20,
  },
  statsCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 16,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 15,
  },
  statValue: {
    fontSize: 20,
  },
  statHint: {
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    opacity: 0.2,
  },
  legend: {
    alignItems: "center",
  },
  legendText: {
    fontSize: 12,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 32,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
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
  collectionButton: {
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: "center",
    borderWidth: 1,
  },
  collectionButtonText: {
    fontSize: 15,
  },
});
