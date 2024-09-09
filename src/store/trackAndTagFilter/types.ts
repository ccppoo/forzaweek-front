import type { Tags } from '@/types';

interface Track {
  id?: number;
  name: string;
  name_en: string;
  ko_sound: string;
  en_sound: string;
  ko_trans: string;
  en_trans: string;
  trackType: string;
  courseType: string;
}

export type TrackActions = {
  setTrack: (track: Track | undefined) => void;
  removeTrack: () => void;
};

export type TagActions = {
  setTags: (tags: Tags) => void;
  removeTag: (tag: string) => void;
  removeAllTags: () => void;
  addTag: (tag: string) => void;
};
