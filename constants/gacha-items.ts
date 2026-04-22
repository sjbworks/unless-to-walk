export type GachaItem = {
  id: string;
  steps: number;
  comment: string;
  imageUri: string;
  points: number;
};

export const GACHA_ITEMS: GachaItem[] = [
  {
    id: '1',
    steps: 8432,
    comment: '今日も気持ちよく歩けた！',
    imageUri: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
    points: 120,
  },
  {
    id: '2',
    steps: 12050,
    comment: '公園を一周してリフレッシュ！',
    imageUri: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800',
    points: 200,
  },
  {
    id: '3',
    steps: 5210,
    comment: '雨だったけど少し歩いた',
    imageUri: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=800',
    points: 75,
  },
  {
    id: '4',
    steps: 15000,
    comment: '今日は15,000歩超えた！すごい！',
    imageUri: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
    points: 350,
  },
  {
    id: '5',
    steps: 3200,
    comment: 'ちょっとだけ外に出た日',
    imageUri: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800',
    points: 45,
  },
];
