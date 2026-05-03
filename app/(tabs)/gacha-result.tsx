import { useEffect, useMemo } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { GACHA_ITEMS } from "@/constants/gacha-items";

const { width: W, height: H } = Dimensions.get("window");

const COLORS = [
  "#FF6B6B", "#FFE66D", "#4ECDC4", "#45B7D1",
  "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8",
  "#F7DC6F", "#BB8FCE",
];

const RARITY_COLOR: Record<string, string> = {
  common: "#888888",
  uncommon: "#4CAF50",
  rare: "#FF9800",
};

const RARITY_LABEL: Record<string, string> = {
  common: "コモン",
  uncommon: "アンコモン",
  rare: "レア",
};

type PieceConfig = {
  x: number;
  delay: number;
  color: string;
  size: number;
  rotations: number;
};

function ConfettiPiece({ x, delay, color, size, rotations }: PieceConfig) {
  const translateY = useSharedValue(-20);
  const opacity = useSharedValue(1);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(H + 60, { duration: 2600, easing: Easing.in(Easing.quad) })
    );
    rotate.value = withDelay(
      delay,
      withTiming(rotations * 360, { duration: 2600, easing: Easing.linear })
    );
    opacity.value = withDelay(delay + 2000, withTiming(0, { duration: 300 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: x,
          top: 0,
          width: size,
          height: size * 0.5,
          backgroundColor: color,
          borderRadius: 2,
        },
        style,
      ]}
    />
  );
}

export default function GachaResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = GACHA_ITEMS.find((i) => i.id === id) ?? GACHA_ITEMS[0];
  const tint = useThemeColor({}, "tint");
  const background = useThemeColor({}, "background");
  const icon = useThemeColor({}, "icon");

  const cardScale = useSharedValue(0.3);
  const cardOpacity = useSharedValue(0);

  const pieces = useMemo<PieceConfig[]>(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        x: Math.random() * W,
        delay: Math.random() * 600,
        color: COLORS[i % COLORS.length],
        size: 8 + Math.random() * 8,
        rotations: 1 + Math.random() * 4,
      })),
    []
  );

  useEffect(() => {
    cardOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));
    cardScale.value = withDelay(200, withSpring(1, { damping: 8, stiffness: 120 }));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const rarityColor = RARITY_COLOR[item.rarity] ?? "#888";
  const rarityLabel = RARITY_LABEL[item.rarity] ?? item.rarity;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {pieces.map((piece, i) => (
          <ConfettiPiece key={i} {...piece} />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          おめでとう！
        </ThemedText>
        <Animated.View style={[styles.card, { backgroundColor: background, borderColor: icon }, cardStyle]}>
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <View style={styles.body}>
            <View style={styles.nameRow}>
              <ThemedText type="defaultSemiBold" style={styles.itemName}>
                {item.name}
              </ThemedText>
              <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
                <ThemedText style={styles.rarityText} lightColor="#fff" darkColor="#fff">
                  {rarityLabel}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.comment}>{item.comment}</ThemedText>
          </View>
        </Animated.View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: tint }]}
          onPress={() => router.push("/(tabs)/gatcha-list")}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText} lightColor="#fff" darkColor="#fff">
            コレクションを見る
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "transparent", borderWidth: 1, borderColor: icon }]}
          onPress={() => router.push("/(tabs)/gacha")}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.buttonText}>
            ガチャに戻る
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  body: {
    padding: 16,
    gap: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 20,
  },
  rarityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  comment: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
