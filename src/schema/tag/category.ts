import { z } from 'zod';

import { i18nMapDefault } from '@/schema/i18n';
import { tagBase } from '@/schema/tag/base';

import { tagHorizontalRelation, tagVerticalRelation } from './relation';

export const tagCategory = tagBase.merge(tagHorizontalRelation).merge(tagVerticalRelation);

export const hasTagCategory = z.object({
  category: z.optional(z.string()), // id
});

export type HasTagCategory = z.infer<typeof hasTagCategory>;

export type TagCategoryInput = z.input<typeof tagCategory>;
export type TagCategory = z.infer<typeof tagCategory>;

export const tagCategoryDefault: TagCategoryInput = {
  id: undefined,
  name: i18nMapDefault,
  description: i18nMapDefault,
  children: [],
  imageURL: undefined,
  mergedFrom: [],
  mergedTo: undefined,
  parent: undefined,
  color: '#000000',
};
