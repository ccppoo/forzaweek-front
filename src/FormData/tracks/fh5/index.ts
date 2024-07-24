import { z } from 'zod';

import * as i18n from '@/FormData/i18n';
import { documentBase } from '@/FormData/base';
import { FH5_Base } from '@/FormData/game';
import { image, tag } from '@/FormData/post';

import { trackCategory } from './category';
import { trackFormat } from './format';
import { fullPathImage } from './fullPathImage';
import { trackWorld } from './world';

// import type {i18nMap} from '@/FormData/i18n'
export const trackEditSchema = documentBase
  .merge(FH5_Base)
  .merge(trackCategory)
  .merge(trackFormat)
  .merge(trackWorld)
  .merge(i18n.i18nName)
  .merge(i18n.i18nLiberalTranslation)
  .merge(fullPathImage)
  .merge(image.multipleImages)
  .merge(tag.tagDependent);

export const trackSchemaType = trackEditSchema.merge(i18n.i18nMapName).required({
  id: true,
  name: true,
  fullPathImage: true,
  imageURLs: true,
  category: true,
  format: true,
  world: true,

  tags: true,
});

export type TrackSchemaType = z.infer<typeof trackSchemaType>;

export type TrackEditSchema = z.infer<typeof trackEditSchema>;

const tempNameDefault = [
  {
    lang: 'en',
    value: 'Arch of Mulege Circuit',
  },
  {
    lang: 'ko',
    value: '물레헤 아치 서킷',
  },
];

const tempLiberalDefault = [
  {
    lang: 'en',
    value: 'Arch of Mulege Circuit',
  },
  {
    lang: 'ko',
    value: '물레헤 아치 서킷',
  },
];
export const trackEditSchemaDefault: TrackEditSchema = {
  game: 'FH5',
  category: 'road',
  format: 'circuit',
  laps: 3,
  world: 'Mexico',
  fullPathImage: {
    zoom_out: undefined,
    zoom_in: undefined,
  },
  imageURLs: [], // 데칼 사진
  firstImage: undefined,
  name: tempNameDefault,
  liberal_translation: tempLiberalDefault,
  tags: [], // 데칼 태그
};
