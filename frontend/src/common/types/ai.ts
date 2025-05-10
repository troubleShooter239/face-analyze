export interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AnalyzeProcessedFace {
  region: Region;
  age: number;
  face_confidence: number;
  dominant_gender: string;
  gender: { [key: string]: number };
  dominant_emotion: string;
  emotion: { [key: string]: number };
  dominant_race: string;
  race: { [key: string]: number };
}
