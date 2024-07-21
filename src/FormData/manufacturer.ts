import { z } from 'zod';

import * as i18n from './i18n';

export const manufacturerEditSchema = z.object({
  id: z.optional(z.string()),
  imageURL: z.optional(z.string()),
  origin: z.optional(z.string()),
  founded: z.optional(z.number()),
  i18n: z.array(i18n.i18nTextFieldSchema),
  name_en: z.optional(z.string()),
});

export const manufacturerSchemaType = z.object({
  id: z.string(),
  imageURL: z.string(),
  origin: z.string(),
  founded: z.number(),
  i18n: z.array(i18n.i18nTextFieldSchema),
  name_en: z.string(),
});

export type ManufacturerSchemaType = z.infer<typeof manufacturerSchemaType>;

export type ManufacturerEditSchema = z.infer<typeof manufacturerEditSchema>;

export const manufacturerEditSchemaDefault: ManufacturerEditSchema = {
  imageURL: undefined,
  name_en: undefined,
  origin: undefined,
  founded: undefined,
  i18n: i18n.i18nDefaultValue,
};

export const manufacturerSimpleSchemaType = z.object({
  id: z.string(),
  name: z.array(i18n.i18nTextFieldSchema),
  name_en: z.string(),
  imageURL: z.string(),
});

export type ManufacturerSimpleSchemaType = z.infer<typeof manufacturerSimpleSchemaType>;
