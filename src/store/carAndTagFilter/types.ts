import type { Car2 } from '@/db/schema/car';
import type { Tags } from '@/types';
import type { CarInfo2 } from '@/types/car';

export type CarActions = {
  setCar: (car: Car2 | undefined) => void;
  removeCar: () => void;
};

export type TagActions = {
  setTags: (tags: Tags) => void;
  removeTag: (tag: string) => void;
  removeAllTags: () => void;
  addTag: (tag: string) => void;
};
