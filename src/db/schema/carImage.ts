export interface CarImage {
  id?: number;
  main: string;
  images: string[];
}

export interface CarImageBase {
  first: string;
  images: string[];
}

export interface CarImage2 extends CarImageBase {
  id: string;
}
