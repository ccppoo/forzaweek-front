import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

export const i18nDefaultValue = [...supportLangs].map((langDefault) => {
  return { lang: langDefault, value: '' };
});

export const i18nTextFieldSchema = z.object({
  lang: z.string(),
  value: z.string(),
});

export const i18nName = z.object({
  name_en: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema),
});

export const i18nLiberalTranslation = z.object({
  liberal_translation: z.array(i18nTextFieldSchema),
});

export type I18nTextField = z.infer<typeof i18nTextFieldSchema>;
export type I18nTextFieldSchema = z.infer<typeof i18nTextFieldSchema>;
export type I18nNameDependent = z.infer<typeof i18nName>;
export type I18nLiberalTranslation = z.infer<typeof i18nLiberalTranslation>;
