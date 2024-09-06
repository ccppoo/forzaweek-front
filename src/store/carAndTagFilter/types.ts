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
