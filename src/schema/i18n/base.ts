import { z } from 'zod';

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
