import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

import { i18nLangCode, i18nTextFieldSchema } from './i18n';
import { I18nTextFieldSchema } from './i18n';

export const nationEditSchema = z.object({
  // en은 반드시 포함
  langs: z
    .array(i18nLangCode)
    .refine((langCodes) => langCodes.some((langCode) => langCode.code == 'en')),
  i18n: z.array(i18nTextFieldSchema),
});

export type NationEditSchema = z.infer<typeof nationEditSchema>;

export const nationEditSchemaDefault: NationEditSchema = {
  langs: [...supportLangs],
  i18n: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),

  // [
  //   {
  //     lang: { code: 'en', country: '' },
  //     value: '',
  //   },
  // ],
};
