import { z } from 'zod';

import { i18nMapDefault } from '@/schema/i18n';
import { tagBase } from '@/schema/tag/base';

import { hasTagCategory } from './category';
import { tagHorizontalRelation, tagVerticalRelation } from './relation';

export const tag = tagBase
  .merge(hasTagCategory)
  .merge(tagHorizontalRelation)
  .merge(tagVerticalRelation);

export type Tag = z.infer<typeof tag>;
export type TagInput = z.input<typeof tag>;

export const tags = z.object({
  tags: z.array(z.string()).default([]),
});

export type Tags = z.infer<typeof tags>;

export const tagDefault: TagInput = {
  id: undefined,
  name: i18nMapDefault,
  description: i18nMapDefault,
  category: undefined,
  children: [],
  imageURL: undefined,
  mergedFrom: [],
  mergedTo: undefined,
  parent: undefined,
  color: '#000000',
};
