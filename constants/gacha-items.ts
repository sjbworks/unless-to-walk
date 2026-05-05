import { ImageSourcePropType } from "react-native";

export type GachaItem = {
  id: string;
  name: string;
  comment: string;
  image: ImageSourcePropType;
  rarity: "star1" | "star2" | "star3";
};

export const GACHA_ITEMS: GachaItem[] = [
  {
    id: "1",
    name: "クーポン",
    comment: "歩いてゲットした特別クーポン！使えるかも？",
    image: require("@/assets/images/items/coupon.png"),
    rarity: "star1",
  },
  {
    id: "2",
    name: "メモ",
    comment: "どこかで拾った大切そうなメモ。",
    image: require("@/assets/images/items/memo.png"),
    rarity: "star1",
  },
  {
    id: "3",
    name: "ペッパーミル",
    comment: "こだわりのペッパーミル。料理が捗りそう！",
    image: require("@/assets/images/items/pepper-mill.png"),
    rarity: "star2",
  },
  {
    id: "4",
    name: "レシート",
    comment: "歩いた証のレシート。思い出の一枚。",
    image: require("@/assets/images/items/receipt.png"),
    rarity: "star1",
  },
  {
    id: "5",
    name: "VIPカード",
    comment: "レア！VIPカードをゲット！どこで使えるんだろう？",
    image: require("@/assets/images/items/vipcard.png"),
    rarity: "star3",
  },
];
