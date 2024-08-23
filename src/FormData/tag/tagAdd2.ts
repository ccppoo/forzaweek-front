// schema for adding tags to post - car, decal, track, tuning, ... etc
import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { i18nTextFieldSchema } from '@/FormData/i18n';
import { i18nMap, i18nMapName, i18nName } from '@/FormData/i18n';
import { image, tag } from '@/FormData/post';
import { tagKindGeneralID } from '@/config/api';
import { supportLangs } from '@/config/i18n';
import { getDefaults } from '@/utils/zod';

import { tagKindReadType, tagKindSchemaType } from './kind';

const taggingItem = z.object({
  id: z.optional(z.string()),
  name: z.string(),
});

const taggingItemForm = z.object({
  tags: z.array(taggingItem).default([]),
});

const taggingItemReadOnly = taggingItem.required({
  id: true,
});

const taggingItemFormReadOnly = taggingItemForm;
