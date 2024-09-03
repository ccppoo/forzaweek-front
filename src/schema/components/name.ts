import { z } from 'zod';

import { i18nArrayMap, i18nMap } from '@/schema/i18n';

export const nameArrayi18n = z.object({
  name: i18nArrayMap,
});

export const namei18n = z.object({
  name: i18nMap,
});

export const aliasArrayi18n = z.object({
  alias: i18nArrayMap,
});

export const aliasi18n = z.object({
  alias: i18nMap,
});

// used for dev
export const nameEN = z.object({
  en: z.string(),
});
