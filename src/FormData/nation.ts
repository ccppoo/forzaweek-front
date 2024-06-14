import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

import { i18nTextFieldSchema } from './i18n';

export const nationEditSchema = z.object({
  id: z.optional(z.string()),
  imageURL: z.optional(z.string()),
  i18n: z.array(i18nTextFieldSchema),
  name_en: z.optional(z.string()),
});

export type NationEditSchema = z.infer<typeof nationEditSchema>;

export const nationEditSchemaDefault: NationEditSchema = {
  imageURL: undefined,
  name_en: undefined,
  i18n: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
};
