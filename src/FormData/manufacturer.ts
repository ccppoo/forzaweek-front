import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

import { i18nTextFieldSchema } from './i18n';

export const manufacturerEditSchema = z.object({
  id: z.optional(z.string()),
  imageURL: z.optional(z.string()),
  origin: z.optional(z.string()),
  founded: z.optional(z.number()),
  i18n: z.array(i18nTextFieldSchema),
  name_en: z.optional(z.string()),
});

export type ManufacturerEditSchema = z.infer<typeof manufacturerEditSchema>;

export const manufacturerEditSchemaDefault: ManufacturerEditSchema = {
  imageURL: undefined,
  name_en: undefined,
  origin: undefined,
  founded: undefined,
  i18n: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
};
