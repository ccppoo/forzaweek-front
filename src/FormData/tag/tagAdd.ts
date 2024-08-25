// schema for adding tags to post - car, decal, track, tuning, ... etc
import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { i18nTextFieldSchema } from '@/FormData/i18n';
import { i18nMap, i18nMapName, i18nName } from '@/FormData/i18n';
import { image, tag } from '@/FormData/post';
import { supportLangs } from '@/config/i18n';
import { getDefaults } from '@/utils/zod';

const taggingItem = z.object({
  id: z.optional(z.string()),
  name: z.string(),
});

const taggingItemReadOnly = taggingItem.required({
  id: true,
});

export const taggingItemForm = z.object({
  tags: z.array(taggingItem).default([]),
});

export type TaggingItemForm = z.input<typeof taggingItemForm>;

export const taggingItemFormDefault: TaggingItemForm = {
  tags: [],
};
