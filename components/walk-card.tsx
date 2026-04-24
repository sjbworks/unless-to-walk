import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

export type WalkCardProps = {
  steps: number;
  comment: string;
  image: ImageSourcePropType | string;
  points: number;
};

export function WalkCard({ steps, comment, image, points }: WalkCardProps) {
  const background = useThemeColor({}, "background");
  const icon = useThemeColor({}, "icon");
  const source = typeof image === "string" ? { uri: image } : image;

  return (
    <View
      style={[styles.card, { backgroundColor: background, borderColor: icon }]}
    >
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} />
      </View>
      <View style={styles.body}>
        <ThemedText style={styles.comment}>{comment}</ThemedText>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {steps.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: icon }]}>
              歩数
            </ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: icon }]} />
          <View style={styles.stat}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {points.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: icon }]}>
              ポイント
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  body: {
    padding: 16,
    gap: 12,
  },
  comment: {
    fontSize: 15,
    lineHeight: 22,
  },
  stats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stat: {
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontSize: 22,
  },
  statLabel: {
    fontSize: 12,
  },
  divider: {
    width: 1,
    height: 32,
    opacity: 0.3,
  },
});
