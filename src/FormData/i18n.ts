import { z } from 'zod';

export const i18nLangCode = z.object({
  code: z.string(),
  country: z.union([z.string(), z.literal('')]),
});

export const i18nTextFieldSchema = z.object({
  lang: i18nLangCode,
  value: z.string(),
});

export type I18nLangCode = z.infer<typeof i18nLangCode>;
export type I18nTextFieldSchema = z.infer<typeof i18nTextFieldSchema>;
