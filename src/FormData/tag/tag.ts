import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { i18nTextFieldSchema } from '@/FormData/i18n';
import { i18nMap, i18nMapName, i18nName } from '@/FormData/i18n';
import { image, tag } from '@/FormData/post';
import { tagKindGeneralID } from '@/config/api';
import { supportLangs } from '@/config/i18n';

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

const tagSchemaType = z.object({
  id: z.string(),
  kind: tagKindSchemaType,
  imageURL: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema),
  name_en: z.string(),
  description: z.array(i18nTextFieldSchema),

  // management
  parentTag: z.optional(z.string()),
  childrenTag: z.optional(z.string()),
  mergedTo: z.optional(z.string()),
  mergedFrom: z.optional(z.string()),
});

// 동적으로 만들어서 추가하는 태그
const tagSchemaTypeExtended = z.object({
  id: z.optional(z.string()),
  kind: z.union([tagKindSchemaType, z.string()]),
  imageURL: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema),
  name_en: z.string(),
  description: z.array(i18nTextFieldSchema),

  inputValue: z.optional(z.string()),
  // management
  parentTag: z.optional(z.string()),
  childrenTag: z.optional(z.string()),
  mergedTo: z.optional(z.string()),
  mergedFrom: z.optional(z.string()),
});
// 글 작성시 추가하는 스키마 -> 글 작성시에만 사용
const tagWrite = z.object({
  id: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema),
  name_en: z.string(),
  kind: z.string(),
});

export const tagReadType = documentBase
  .merge(i18nMapName.required({ name: true }))
  .merge(z.object({ description: i18nMap }))
  .merge(image.singleImage)
  .merge(z.object({ kind: tagKindReadType }));

export type TagReadType = z.infer<typeof tagReadType>;

type TagWrite = z.infer<typeof tagWrite>;

type TagSchemaType = z.infer<typeof tagSchemaType>;

type TagSchemaTypeExtended = z.infer<typeof tagSchemaTypeExtended>;

type TagEditSchema = z.infer<typeof tagEditSchema>;

const tagEditSchemaDefault: TagEditSchema = {
  id: undefined,
  kind: tagKindGeneralID,
  imageURL: undefined,
  name: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
  name_en: undefined,
  description: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
  parentTag: undefined,
  childrenTag: undefined,
  mergedTo: undefined,
  mergedFrom: undefined,
};

// 읽기 전용으로 불러올 때
const tagSimpleSchemaType = z.object({
  id: z.string(),
  kind: tagKindSchemaType,
  imageURL: z.string(),
  name: z.array(i18nTextFieldSchema),
  name_en: z.string(),
  description: z.array(i18nTextFieldSchema),
  // management
  parentTag: z.optional(z.string()),
  childrenTag: z.optional(z.string()),
});

type TagSimpleSchemaType = z.infer<typeof tagSimpleSchemaType>;

export {
  tagEditSchema,
  tagSchemaType,
  tagEditSchemaDefault,
  tagSchemaTypeExtended,
  tagSimpleSchemaType,
};

export type { TagWrite, TagSchemaType, TagEditSchema, TagSchemaTypeExtended, TagSimpleSchemaType };
