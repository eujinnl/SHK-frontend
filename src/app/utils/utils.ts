export type levelInfo = {
  levelInt: number;
  topic: string;
};

export const levels: Record<number,levelInfo> = {
  0: { levelInt: 0, topic: "Introduction to Basics" },
  1: { levelInt: 1, topic: "Intermediate Concepts" },
  2: { levelInt: 2, topic: "Advanced Techniques" },
  3: { levelInt: 3, topic: "Pro Level Challenges" },
  4: { levelInt: 4, topic: "Expert Tactics" },
  5: { levelInt: 5, topic: "Mastery Skills" },
  6: { levelInt: 6, topic: "Strategy Development" },
  7: { levelInt: 7, topic: "High-Level Applications" },
  8: { levelInt: 8, topic: "Elite Techniques" },
  9: { levelInt: 9, topic: "Grandmaster Tactics" },
};

export interface Achievement {
  title: string;
  description: string;
  date: string;
}

export const mongoConfig = {
  user: 'csports-rw-user',
  password: 'lekB*3sd,1dh',
  host: 'localhost',
  port: '27017',
  db: 'csports',
};

export function minMaxVal(min: number, max: number, value: number): number {
  return Math.min(Math.max(min, value), max);
}

export function getScreenSizeWithAspectRatio(
  width: number,
  height: number,
  aspectRatio: number
) {
  const containerRatio = width / height;

  // containerRatio more than ratio? Width needs adjustment
  const targetWidth =
    containerRatio >= aspectRatio ? height * aspectRatio : width;
  const targetHeight =
    containerRatio >= aspectRatio ? height : width / aspectRatio;
  return { width: targetWidth, height: targetHeight };
}