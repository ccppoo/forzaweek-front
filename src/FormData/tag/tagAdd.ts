// schema for adding tags to post - car, decal, track, tuning, ... etc
import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { i18nTextFieldSchema } from '@/FormData/i18n';
import { i18nMap, i18nMapName, i18nName } from '@/FormData/i18n';
import { image, tag } from '@/FormData/post';
import { tagKindGeneralID } from '@/config/api';
import { supportLangs } from '@/config/i18n';
import { getDefaults } from '@/utils/zod';

import { tagKindReadType, tagKindSchemaType } from './kind';

const tagEditSchema = z.object({
  id: z.optional(z.string()),
  kind: z.optional(z.string()), // tag kind document ID
  imageURL: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema),
  name_en: z.optional(z.string()),
  description: z.array(i18nTextFieldSchema),

  // management
  parentTag: z.optional(z.string()),
  childrenTag: z.optional(z.string()),
  mergedTo: z.optional(z.string()),
  mergedFrom: z.optional(z.string()),
});

const languageChoice = z.union([
  z.literal('English'),
  z.literal('Japanese'),
  z.literal('Korean'),
  z.literal('Simplified Chinese'),
  z.literal('Traditional Chinese'),
  z.literal('Spanish'),
]);

type LanguageChoice = z.infer<typeof languageChoice>;

// NOTE: front에서 최초로 만들어서 보낼때만 사용함
// NOTE: 사용자가 최초로 등록한 태그 이름, 언어 식별 기준은 사용된 문자열에 따라서 자동으로 결정됨
// FUTURE: 나중에 추가로 언어에 따라 등록할 수 있게 만들기
export const newTagAddSchema = z.object({
  name: z.string().default(''),
  // name_i18n: i18nMapName,
  // language: languageChoice,
});

export type NewTagAddSchema = z.infer<typeof newTagAddSchema>;

// FIXME: temp tag item schema - fieldArray 사용할 때 단순 string으로 저장 못해서 간단한 object로 append
const tagItemSchema = z.object({
  id: z.string(),
});

export type TagItemSchema = z.infer<typeof tagItemSchema>;

export const tagDependent = z.object({
  tags: z.array(tagItemSchema).default([]), // 이미 있는 태그의 경우 ID로 저장
});

export type TagDependent = z.infer<typeof tagDependent>;

export const newTagDependent = z.object({ newTags: z.optional(z.array(newTagAddSchema)) }); // 작성 중에 새롭게 만드는 태그의 경우에만 있음

export type NewTagDependent = z.infer<typeof newTagDependent>;

// NOTE: 태그만 있는 반응 담는 스키마, 댓글과 같지만 태그만 있다는 것이 특징이다.
export const taggingSchema = z
  .object({
    id: z.optional(z.string()),
  })
  .merge(tagDependent)
  .merge(newTagDependent);

export type TaggingSchema = z.infer<typeof taggingSchema>;

export const taggingSchemaDefault: TaggingSchema = {
  id: undefined,
  tags: [],
  newTags: [],
};
