import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

import { i18nTextFieldSchema } from './i18n';

// NOTE: 시리즈 추가 지원시 필드 항목에 추가 (FM : ..., FH4 : ...,)
export const FH5CarMetaSchema = z.object({
  rarity: z.optional(z.string()),
  boost: z.optional(z.string()),
  value: z.optional(z.number().gte(0)),
  division: z.optional(z.string()),
});

export const carEditSchema = z.object({
  id: z.optional(z.string()), // 차 자체 DocumnetID

  manufacturer: z.optional(z.string()), // 제조사 DocumentID

  name_en: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema), // 원래 이름
  short_name_en: z.optional(z.string()),
  short_name: z.array(i18nTextFieldSchema), // 짧은 이름

  imageURLs: z.array(z.string()),
  firstImage: z.optional(z.string()),

  production_year: z.optional(z.number().gte(1900).lte(2554)),
  engineType: z.optional(z.string()), // 내연, 전기, 수소, 등
  bodyStyle: z.optional(z.string()), // 세단, 헤치백, 등
  door: z.optional(z.number().gte(0)), // 문 숫자

  fh5_meta: z.optional(FH5CarMetaSchema), // 희귀도, 가격, 부스트
});

export type CarEditSchema = z.infer<typeof carEditSchema>;

export const carEditSchemaDefault: CarEditSchema = {
  imageURLs: [],
  firstImage: undefined,

  manufacturer: undefined,
  production_year: undefined,

  engineType: undefined,
  bodyStyle: undefined,
  door: 0,

  name_en: undefined,
  name: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
  short_name_en: undefined,
  short_name: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),

  fh5_meta: {
    rarity: undefined,
    boost: undefined,
    value: undefined,
    division: undefined,
  },
};
