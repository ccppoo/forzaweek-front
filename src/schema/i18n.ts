import { z } from 'zod';

import type { SupportLang } from '@/config/i18n';
import { supportLangs } from '@/config/i18n';

// FIXME: 이런식으로 동적으로 만들면 Zod, TS에서 타입추론을 못함
// const i18nMap_Zod = supportLangs.reduce((a, v) => ({ ...a, [v]: z.string() }), {});
// export const i18nMapName = z.object({
//   name: z.object(i18nMap_Zod),
// });

export const i18nMap = z.object({
  en: z.string().optional(),
  ko: z.string().optional(),
  jp: z.string().optional(),
});

export const i18nArrayMap = z.object({
  en: z.array(z.string()).default([]),
  ko: z.array(z.string()).default([]),
  jp: z.array(z.string()).default([]),
});

export const i18nMapName = z.object({
  name: z.optional(
    z.object({
      en: z.string(),
      ko: z.string(),
    }),
  ),
});

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
