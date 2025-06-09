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

export interface FacialAreaWithEyes extends Region {
  left_eye?: [number, number];
  right_eye?: [number, number];
}

export interface ExtractFacesResult {
  facial_area: FacialAreaWithEyes;
  confidence: number;
  is_real?: boolean;
  antispoof_score?: number;
}

export interface FacialAreas {
  img1: Region;
  img2: Region;
}

export interface FaceVerificationResult {
  verified: boolean;
  distance: number;
  threshold: number;
  model: string;
  facial_areas: FacialAreas;
  time: number;
}
