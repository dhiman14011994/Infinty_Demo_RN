export interface HomeRemedies {
  id: number;
  title: string;
  duration: number;
  pace: number;
  equipment_req: string;
  enabled: number;
  image: string;
  videos: string;
}

export interface ReliefExercise {
  description: string;
  id: number;
  image: string;
  sub_title: string;
  tags: string[];
  title: string;
  videos: string;
}

export interface HomeRemediesDtls {
  description: string;
  enabled: number;
  id: number;
  image: string;
  tags: string[],
  title: string;
  videos: string;
}

export interface ReliefExerciseDtls {
  description: string;
  enabled: number;
  id: number;
  image: string,
  sub_title: string,
  tags: string[],
  title: string;
  videos: string;
}