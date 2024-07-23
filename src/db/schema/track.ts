import type { i18n, i18nMap } from './i18n';

export interface Track {
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

export interface Track2 {
  id?: string; // Track ID
  game: string;
  category: string;
  format: string;
  laps: number;
  world: string;
  name: i18nMap;
  liberal_translation: i18nMap;
}

export type TrackFullPathImage = {
  zoom_out: string;
  zoom_in?: string;
};

export interface TrackImage {
  id?: string; // Track ID
  first?: string;
  images: string[];
  fullPathImage: TrackFullPathImage;
}
