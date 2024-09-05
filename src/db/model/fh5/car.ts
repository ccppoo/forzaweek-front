import { DocumentBase } from '@/db/model/base';
import { dbIndexBuilder } from '@/db/model/config';
import { MultiImageURL } from '@/db/model/image';
import { nestedKey } from '@/db/utils';

interface FH5_Meta {
  division: string;
  rarity: string;
  boost: string;
  value: number;
}

interface FH5_Performance {
  speed: number;
  handling: number;
  acceleration: number;
  launch: number;
  braking: number;
  offroad: number;
}

export interface CarFH5 extends DocumentBase {
  baseCar: string;

  PI: number;

  meta: FH5_Meta;

  performance: FH5_Performance;
}

const carMetaKey = nestedKey('meta', ['division', 'rarity', 'boost', 'value']);
const carPerformanceKey = nestedKey('performance', [
  'speed',
  'handling',
  'acceleration',
  'launch',
  'braking',
  'offroad',
]);

export interface CarImage extends DocumentBase, MultiImageURL {}

export const CarIndex = dbIndexBuilder({
  PK: '&id',
  duplicate: ['baseCar', 'PI', ...carMetaKey, ...carPerformanceKey],
});

export const CarImageIndex = dbIndexBuilder({
  PK: '&id',
});
