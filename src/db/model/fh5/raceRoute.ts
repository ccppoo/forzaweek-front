import { DocumentBase } from '@/db/model/base';
import { dbIndexBuilder } from '@/db/model/config';
import { i18nFlatIndex, i18nFlatMap, i18nNameIndex } from '@/db/model/i18n';
import { nestedKey } from '@/db/utils';
import type { FH5_Category, FH5_Format, FH5_World } from '@/types/fh5/race_route';

export interface RaceRouteFH5 extends DocumentBase {
  name: i18nFlatMap;
  nameTranslated: i18nFlatMap;
  description: i18nFlatMap;

  world: FH5_World;
  laps: number;
  category: FH5_Category;
  raceFormat: FH5_Format;
  event?: string;
}

const nameTranslatedIndex = nestedKey('nameTranslated', i18nFlatIndex);

export const RaceRouteFH5Index = dbIndexBuilder({
  PK: '&id',
  unique: [...i18nNameIndex, ...nameTranslatedIndex],
  duplicate: ['world', 'category', 'raceFormat', 'event'],
});

interface FullPathImage {
  zoom_out?: string;
  zoom_in?: string;
}

interface CoordinateImage {
  x: number;
  y: number;
  imageURL: string;
}

export interface RaceRouteFH5Image extends DocumentBase {
  imageURLs: string[];
  fullPathImage: FullPathImage;
  coordinateImages: CoordinateImage[];
  iconURL: string;
}

export const RaceRouteFH5ImageIndex = dbIndexBuilder({
  PK: '&id',
});
