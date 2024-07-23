import type { Track } from '@/db/schema/track';
import type { Tags } from '@/types';

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
