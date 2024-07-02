import type { SupportLang } from '@/config/i18n';

export type i18n = {
  lang: string;
  value: string;
};

export type i18nMap = Record<SupportLang, string>;
