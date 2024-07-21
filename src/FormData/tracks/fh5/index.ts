import { z } from 'zod';

import * as i18n from '@/FormData/i18n';
import { documentBase } from '@/FormData/base';
import { image, tag } from '@/FormData/post';

import { trackCategory } from './category';
import { trackFormat } from './format';
import { trackWorld } from './world';

export const trackEditSchema = documentBase
  .merge(trackCategory)
  .merge(trackFormat)
  .merge(trackWorld)

  .merge(i18n.i18nName)
  .merge(i18n.i18nLiberalTranslation)
  .merge(image.multipleImages)
  .merge(tag.tagDependent);

export const trackSchemaType = trackEditSchema.required({
  id: true,

  firstImage: true,
  imageURLs: true,
  category: true,
  format: true,
  format_topology: true,
  world: true,

  tags: true,
});

export type TrackSchemaType = z.infer<typeof trackSchemaType>;

export type TrackEditSchema = z.infer<typeof trackEditSchema>;

export const trackEditSchemaDefault: TrackEditSchema = {
  category: 'road',
  format: 'circuit',
  format_topology: 'circular',
  laps: 1,
  world: 'Mexico',
  imageURLs: [], // 데칼 사진
  firstImage: undefined,
  name: i18n.i18nDefaultValue,
  liberal_translation: i18n.i18nDefaultValue,
  tags: [], // 데칼 태그
};
