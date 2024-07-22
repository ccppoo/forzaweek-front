import { z } from 'zod';

import * as i18n from '@/FormData/i18n';
import { documentBase } from '@/FormData/base';
import { FH5_Base } from '@/FormData/game';
import { image, tag } from '@/FormData/post';

import { trackCategory } from './category';
import { trackFormat } from './format';
import { fullPathImage } from './fullPathImage';
import { trackWorld } from './world';

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

export const trackSchemaType = trackEditSchema.required({
  id: true,

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
    value: 'Horizon Mexico Circuit',
  },
  {
    lang: 'ko',
    value: '호라이즌 멕시코 서킷',
  },
];

export const trackEditSchemaDefault: TrackEditSchema = {
  game: 'FH5',
  category: 'road',
  format: 'circuit',
  laps: 3,
  world: 'Mexico',
  fullPathImage: {
    large: undefined,
    small: undefined,
  },
  imageURLs: [], // 데칼 사진
  firstImage: undefined,
  name: tempNameDefault,
  liberal_translation: i18n.i18nDefaultValue,
  tags: [], // 데칼 태그
};
