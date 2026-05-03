import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useGachaCollection } from "@/hooks/use-gacha-collection";
import { GACHA_ITEMS } from "@/constants/gacha-items";

const NUM_COLUMNS = 2;
const GAP = 12;
const PADDING = 16;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_SIZE = (SCREEN_WIDTH - PADDING * 2 - GAP) / NUM_COLUMNS;

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

export default function CollectionScreen() {
  const { collection } = useGachaCollection();
  const tint = useThemeColor({}, "tint");
  const background = useThemeColor({}, "background");
  const icon = useThemeColor({}, "icon");

  const collectedCount = GACHA_ITEMS.filter((item) => (collection[item.id] ?? 0) > 0).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: background }]} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={[styles.backText, { color: tint }]}>← 戻る</ThemedText>
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold" style={styles.title}>コレクション</ThemedText>
        <ThemedText style={[styles.progress, { color: icon }]}>
          {collectedCount} / {GACHA_ITEMS.length} 種
        </ThemedText>
      </View>

      <View style={[styles.progressBar, { backgroundColor: icon, opacity: 0.15 }]}>
        <View
          style={[
            styles.progressFill,
            { backgroundColor: tint, width: `${(collectedCount / GACHA_ITEMS.length) * 100}%` },
          ]}
        />
      </View>

      <FlatList
        data={GACHA_ITEMS}
        keyExtractor={(item) => item.id}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const count = collection[item.id] ?? 0;
          const collected = count > 0;
          const rarityColor = RARITY_COLOR[item.rarity] ?? "#888";
          const rarityLabel = RARITY_LABEL[item.rarity] ?? item.rarity;

          return (
            <View style={[styles.card, { backgroundColor: background, borderColor: collected ? rarityColor : icon }]}>
              <View style={[styles.imageContainer, !collected && styles.imageContainerLocked]}>
                <Image
                  source={item.image}
                  style={[styles.image, !collected && styles.imageLocked]}
                />
                {!collected && (
                  <View style={styles.lockOverlay}>
                    <ThemedText style={styles.lockText}>?</ThemedText>
                  </View>
                )}
                {count > 1 && (
                  <View style={[styles.countBadge, { backgroundColor: tint }]}>
                    <ThemedText style={styles.countText} lightColor="#fff" darkColor="#fff">
                      ×{count}
                    </ThemedText>
                  </View>
                )}
              </View>
              <View style={styles.cardBody}>
                {collected ? (
                  <>
                    <ThemedText type="defaultSemiBold" style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </ThemedText>
                    <View style={[styles.rarityBadge, { backgroundColor: rarityColor }]}>
                      <ThemedText style={styles.rarityText} lightColor="#fff" darkColor="#fff">
                        {rarityLabel}
                      </ThemedText>
                    </View>
                  </>
                ) : (
                  <ThemedText style={[styles.itemName, { color: icon }]}>
                    未取得
                  </ThemedText>
                )}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: PADDING,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    minWidth: 60,
  },
  backText: {
    fontSize: 15,
  },
  title: {
    fontSize: 17,
  },
  progress: {
    fontSize: 13,
    minWidth: 60,
    textAlign: "right",
  },
  progressBar: {
    height: 4,
    marginHorizontal: PADDING,
    marginBottom: 12,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  list: {
    paddingHorizontal: PADDING,
    paddingBottom: 24,
  },
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  card: {
    width: ITEM_SIZE,
    borderRadius: 12,
    borderWidth: 1.5,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    position: "relative",
  },
  imageContainerLocked: {
    backgroundColor: "#1a1a1a",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  imageLocked: {
    opacity: 0,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  lockText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#444",
  },
  countBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    fontSize: 11,
    fontWeight: "bold",
  },
  cardBody: {
    padding: 10,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 13,
    flexShrink: 1,
  },
  rarityBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 8,
    flexShrink: 0,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
