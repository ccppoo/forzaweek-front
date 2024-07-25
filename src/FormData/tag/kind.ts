import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { i18nTextFieldSchema } from '@/FormData/i18n';
import { i18nMap, i18nMapName, i18nName } from '@/FormData/i18n';
import { image, tag } from '@/FormData/post';
import { supportLangs } from '@/config/i18n';

const tagKindEditSchema = z.object({
  id: z.optional(z.string()),
  name: z.array(i18nTextFieldSchema),
  name_en: z.optional(z.string()),
  imageURL: z.optional(z.string()),
  description: z.array(i18nTextFieldSchema),
});

export const tagKindReadType = documentBase.merge(i18nName).merge(image.singleImage);

const tagKindSchemaType = z.object({
  id: z.string(),
  name: z.array(i18nTextFieldSchema),
  name_en: z.string(),
  imageURL: z.optional(z.string()),
  description: z.array(i18nTextFieldSchema),
});

type TagKindSchemaType = z.infer<typeof tagKindSchemaType>;
type TagKindEditSchema = z.infer<typeof tagKindEditSchema>;

const tagKindEditSchemaDefault: TagKindEditSchema = {
  id: undefined,
  name: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
  name_en: undefined,
  imageURL: undefined,
  description: [...supportLangs].map((langDefault) => {
    return { lang: langDefault, value: '' };
  }),
};

export { tagKindEditSchema, tagKindSchemaType, tagKindEditSchemaDefault };

export type { TagKindSchemaType, TagKindEditSchema };
