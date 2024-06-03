import type { CarInfo, Tags } from '@/types';

export type CarActions = {
  setCar: (car: CarInfo | undefined) => void;
  removeCar: () => void;
};

export type TagActions = {
  setTags: (tags: Tags) => void;
  removeTag: (tag: string) => void;
  removeAllTags: () => void;
  addTag: (tag: string) => void;
};
