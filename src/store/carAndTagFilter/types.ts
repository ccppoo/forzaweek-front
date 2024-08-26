// import type { TagItem } from '@/FormData/tag/tag';
// import type { Car2 } from '@/db/schema/car';
// import type { CarInfo2 } from '@/types/car';
export type CarID = string;
export type TagID = string;

export type CarActions = {
  setCar: (car: CarID | undefined) => void;
  removeCar: () => void;
};

export type TagActions = {
  setTags: (tags: TagID[]) => void;
  removeTag: (tag: TagID) => void;
  removeAllTags: () => void;
  addTag: (tag: TagID) => void;
};
