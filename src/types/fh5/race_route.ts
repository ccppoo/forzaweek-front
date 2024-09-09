import type { GAME } from '@/types';

export type FH5_World = 'mexico' | 'hot_wheels' | 'rally' | 'event_island';
export type FH5_Format =
  | 'sprint'
  | 'trail'
  | 'course'
  | 'circuit'
  | 'scramble'
  | 'street'
  | 'crosscountry'
  | 'showcase'
  | 'drag';
export type FH5_Category =
  | 'crosscountry'
  | 'rally'
  | 'offroad'
  | 'road'
  | 'street'
  | 'drag'
  | 'hazard'
  | 'speed';

export type TrackSearchOptions = {
  game: GAME; // choice
  world: FH5_World[]; // select
  category: FH5_Category[]; // select
  format: FH5_Format[]; // select
  laps: number;
};

export const RACEROUTE_FH5_WORLD_ALL: FH5_World[] = [
  'mexico',
  'hot_wheels',
  'rally',
  'event_island',
];
export const RACEROUTE_FH5_FORMAT_ALL: FH5_Format[] = [
  'sprint',
  'trail',
  'course',
  'circuit',
  'scramble',
  'street',
  'crosscountry',
  'showcase',
  'drag',
];
export const RACEROUTE_FH5_CATEGORY_ALL: FH5_Category[] = [
  'crosscountry',
  'rally',
  'offroad',
  'road',
  'street',
  'drag',
  'hazard',
  'speed',
];
