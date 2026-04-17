import { FlatList, Image, Text, View } from "react-native";
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
];

export default function TestScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Test</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Image source={item.image} style={{ width: 100, height: 100 }} />
        )}
      />
    </View>
  );
}
