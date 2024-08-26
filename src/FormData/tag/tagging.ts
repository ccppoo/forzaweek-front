// schema for adding tags to post - car, decal, track, tuning, ... etc
import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

const i18nMap = z.object({
  unknown: z.optional(z.string()),
  en: z.optional(z.string()),
  ko: z.optional(z.string()),
  jp: z.optional(z.string()),
});

const taggingItem = z.object({
  id: z.optional(z.string()),
  name: i18nMap,
});

const taggingItemReadOnly = taggingItem.required({
  id: true,
});

export const taggingItemForm = z.object({
  tags: z.array(taggingItem).default([]),
});

export type TaggingItemForm = z.infer<typeof taggingItemForm>;
export type TaggingItemFormReadonly = z.infer<typeof taggingItemForm>;

export const taggingItemFormDefault: TaggingItemForm = {
  tags: [],
};
