import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { i18nTextFieldSchema } from '@/FormData/i18n';
// import { i18nMap, i18nMapName, i18nName } from '@/FormData/i18n';
import { image, tag } from '@/FormData/post';
import { supportLangs } from '@/config/i18n';

const i18nMap = z.object({
  en: z.optional(z.string()),
  ko: z.optional(z.string()),
  jp: z.optional(z.string()),
});

const tagBase = z.object({
  id: z.optional(z.string()),
  name: i18nMap,
  imageURL: z.optional(z.string()),
  description: i18nMap,
});

const tagHorizontalRelation = z.object({
  mergedTo: z.optional(z.string()),
  merged_from: z.optional(z.array(z.string()).default([])),
});

const tagVerticalRelation = z.object({
  parent: z.optional(z.string()),
  children: z.optional(z.array(z.string()).default([])),
});

const tagHasCategory = z.object({
  category: z.optional(z.string()),
});

export const tagItem = tagBase
  .merge(tagHasCategory)
  .merge(tagHorizontalRelation)
  .merge(tagVerticalRelation);

export const tagItemReadOnly = tagItem.required({
  name: true,
  description: true,
  category: true,
});

export const tagCategory = tagBase.merge(tagHorizontalRelation).merge(tagVerticalRelation);

export const tagCategoryReadOnly = tagCategory.required({
  name: true,
  description: true,
});

export type TagItem = z.input<typeof tagItem>;
export type TagItemReadOnly = z.input<typeof tagItemReadOnly>;
export type TagCategory = z.input<typeof tagCategory>; // when  editing, creating tag category
export type TagCategoryReadOnly = z.input<typeof tagCategoryReadOnly>;
