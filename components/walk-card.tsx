import { Image, StyleSheet, View } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";
import { ThemedText } from "@/components/themed-text";

export type WalkCardProps = {
  steps: number;
  comment: string;
  imageUri: string;
  points: number;
};

export function WalkCard({ steps, comment, imageUri, points }: WalkCardProps) {
  const background = useThemeColor({}, "background");
  const icon = useThemeColor({}, "icon");

  return (
    <View style={[styles.card, { backgroundColor: background, borderColor: icon }]}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.body}>
        <ThemedText style={styles.comment}>{comment}</ThemedText>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {steps.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: icon }]}>歩数</ThemedText>
          </View>
          <View style={[styles.divider, { backgroundColor: icon }]} />
          <View style={styles.stat}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              {points.toLocaleString()}
            </ThemedText>
            <ThemedText style={[styles.statLabel, { color: icon }]}>ポイント</ThemedText>
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
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
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
