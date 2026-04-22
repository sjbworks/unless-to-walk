import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NUM_COLUMNS = 3;
const GAP = 2;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_SIZE = (SCREEN_WIDTH - GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Fourth Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    title: "Fifth Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    title: "Sixth Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "d4e5f6a7-b8c9-0123-defa-234567890123",
    title: "Seventh Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "e5f6a7b8-c9d0-1234-efab-345678901234",
    title: "Eighth Item",
    image: require("@/assets/images/react-logo.png"),
  },
  {
    id: "f6a7b8c9-d0e1-2345-fabc-456789012345",
    title: "Ninth Item",
    image: require("@/assets/images/react-logo.png"),
  },
];

export default function Gacha() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View style={styles.content}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={styles.cell}>
              <Image source={item.image} style={styles.image} />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  cell: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
});
