import { z } from 'zod';

import { supportLangs } from '@/config/i18n';

import * as i18n from './i18n';
import { manufacturerSchemaType, manufacturerSimpleSchemaType } from './manufacturer';
import { _FH5PerformanceSchemaType, tuningPerformance } from './tuning/performance';

// NOTE: 시리즈 추가 지원시 필드 항목에 추가 (FM : ..., FH4 : ...,)
const FH5CarMetaSchema = z.object({
  rarity: z.optional(z.string()),
  boost: z.optional(z.string()),
  value: z.optional(z.number().gte(0)),
  division: z.optional(z.string()),
});

const _FH5CarMetaSchemaType = z.object({
  rarity: z.string(),
  boost: z.string(),
  value: z.number().gte(0),
  division: z.string(),
});

export type FH5CarMetaSchemaType = z.infer<typeof _FH5CarMetaSchemaType>;

export const carEditSchema = z.object({
  id: z.optional(z.string()), // 차 자체 DocumnetID

  manufacturer: z.optional(z.string()), // 제조사 DocumentID

  name_en: z.optional(z.string()),
  name: z.array(i18n.i18nTextFieldSchema), // 원래 이름
  short_name_en: z.optional(z.string()),
  short_name: z.array(i18n.i18nTextFieldSchema), // 짧은 이름

  imageURLs: z.array(z.string()),
  firstImage: z.optional(z.string()),

  production_year: z.optional(z.number().gte(1900).lte(2554)),
  engineType: z.optional(z.string()), // 내연, 전기, 수소, 등
  bodyStyle: z.optional(z.string()), // 세단, 헤치백, 등
  door: z.optional(z.number().gte(0)), // 문 숫자

  fh5: z.optional(
    z.object({
      meta: FH5CarMetaSchema,
      performance: tuningPerformance,
      pi: z.number().min(100).max(999),
    }),
  ),
});

export const carSchemaType = z.object({
  id: z.string(), // 차 자체 DocumnetID

  manufacturer: manufacturerSchemaType, // 제조사 DocumentID

  name_en: z.string(),
  name: z.array(i18n.i18nTextFieldSchema), // 원래 이름
  short_name_en: z.string(),
  short_name: z.array(i18n.i18nTextFieldSchema), // 짧은 이름

  imageURLs: z.array(z.string()),
  firstImage: z.string(),

  production_year: z.number().gte(1900).lte(2554),
  engineType: z.string(), // 내연, 전기, 수소, 등
  bodyStyle: z.string(), // 세단, 헤치백, 등
  door: z.number().gte(0), // 문 숫자

  // 불러오는 차가 FH4 전용일 수 있으므로 optional이여야 함
  fh5: z.optional(
    z.object({
      meta: _FH5CarMetaSchemaType,
      performance: _FH5PerformanceSchemaType,
      pi: z.number().min(100).max(999),
    }),
  ),
});
export type CarSchemaType = z.infer<typeof carSchemaType>;

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
  name: i18n.i18nDefaultValue,
  short_name_en: undefined,
  short_name: i18n.i18nDefaultValue,

  fh5: {
    meta: {
      rarity: undefined,
      boost: undefined,
      value: undefined,
      division: undefined,
    },
    performance: {
      acceleration: 0,
      braking: 0,
      handling: 0,
      launch: 0,
      offroad: 0,
      speed: 0,
    },
    pi: 700,
  },
};

export const carSimpleSchemaType = z.object({
  id: z.string(), // 차 자체 DocumnetID
  production_year: z.number().gte(1900).lte(2554),
  name_en: z.string(),
  name: z.array(i18n.i18nTextFieldSchema), // 원래 이름
  first_image: z.string(),

  manufacturer: manufacturerSimpleSchemaType, // 제조사 간단 버전
});
export type CarSimpleSchemaType = z.infer<typeof carSimpleSchemaType>;
