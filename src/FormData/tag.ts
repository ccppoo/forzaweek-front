import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

import { i18nTextFieldSchema } from './i18n';

export const tagEditSchema = z.object({
  id: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema),
  name_en: z.optional(z.string()),
  description: z.array(i18nTextFieldSchema),
  kind: z.optional(z.string()),

  mergedTo: z.optional(z.string()),
});

export const tagSchemaType = z.object({
  id: z.string(),
  name: z.array(i18nTextFieldSchema),
  name_en: z.string(),
  description: z.array(i18nTextFieldSchema),
  kind: z.string(),
  mergedTo: z.string(),
});

export type TagSchemaType = z.infer<typeof tagSchemaType>;

export type TagEditSchema = z.infer<typeof tagEditSchema>;

export const tagEditSchemaDefault: TagEditSchema = {
  id: undefined,
  name: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
  name_en: undefined,
  description: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
  kind: 'general',
  mergedTo: undefined,
};
