import { z } from 'zod';

// import { i18nTextFieldSchema } from '@/FormData/i18n';
import { supportLangs } from '@/config/i18n';

const tagName = z.object({
  unknown: z.optional(z.string()),
  en: z.optional(z.string()),
  ko: z.optional(z.string()),
  jp: z.optional(z.string()),
});

export const _searchResultBase = z.object({
  name: tagName,
  image_url: z.optional(z.string()),
  inputValue: z.optional(z.string()),
});

export const searchLookUpTagCategory = _searchResultBase;

const searchLookUpTagItem = _searchResultBase.extend({
  category: z.optional(z.string({ description: 'cateogry tag id' })),
  merged_to: z.optional(z.string({ description: 'merge target tag id' })),
  parent: z.optional(z.string({ description: 'parent tag id' })),
});

const tagItem = z.object({
  id: z.string(),
  category: z.optional(z.string()),
  merged_to: z.optional(z.string()),
  parent: z.optional(z.string()),
});

const tagSearchQuery = z.object({
  lookup_tag: z.record(z.string(), searchLookUpTagItem),
  lookup_category: z.record(z.string(), searchLookUpTagCategory),
  tags: z.array(tagItem),
});

export type TagName = z.input<typeof tagName>;
export type TagSearchQueryResponse = z.input<typeof tagSearchQuery>;
