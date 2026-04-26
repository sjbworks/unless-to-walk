type WalkTitle = { threshold: number; title: string };

const WALK_TITLES: WalkTitle[] = [
  { threshold: 3_000_000, title: "伝説の歩行者（特に意味はない）" },
  { threshold: 1_000_000, title: "歩くことしか取り柄がない人" },
  { threshold: 500_000, title: "歩くことが目的になった人" },
  { threshold: 300_000, title: "歩く理由を忘れた人" },
  { threshold: 100_000, title: "歩くことに疑問を持ち始めた人" },
  { threshold: 50_000, title: "歩くことに慣れてきた人" },
  { threshold: 10_000, title: "まだ歩いてる人" },
  { threshold: 0, title: "歩くだけの人" },
];

export function getWalkTitle(totalSteps: number): string {
  return (
    WALK_TITLES.find(({ threshold }) => totalSteps >= threshold)?.title ??
    WALK_TITLES[WALK_TITLES.length - 1].title
  );
}
