import { z } from 'zod';

import type { SupportLang } from '@/config/i18n';
import { supportLangs } from '@/config/i18n';

import { i18nArrayMap, i18nMap } from './base';

export { i18nMap, i18nArrayMap, i18nMapDefault, i18nMapName, i18nMapDescription };

// FIXME: 이런식으로 동적으로 만들면 Zod, TS에서 타입추론을 못함
// const i18nMap_Zod = supportLangs.reduce((a, v) => ({ ...a, [v]: z.string() }), {});
// export const i18nMapName = z.object({
//   name: z.object(i18nMap_Zod),
// });

const i18nMapDefault = {
  en: undefined,
  ko: undefined,
  jp: undefined,
};

const i18nMapName = z.object({
  name: i18nMap,
});

const i18nMapDescription = z.object({
  description: i18nMap,
});

const i18nDefaultValue = [...supportLangs].map((langDefault) => {
  return { lang: langDefault, value: '' };
});

const i18nTextFieldSchema = z.object({
  lang: z.string(),
  value: z.string(),
});
