import type { SupportLang } from '@/config/i18n';
import { nestedKey } from '@/db/utils';

export type i18n = {
  lang: string;
  value: string;
};

export type i18nMap = Record<SupportLang, string>;

export interface i18nFlatMap {
  en?: string;
  ko?: string;
  jp?: string;
}

export interface i18nArrayMap {
  en: string[];
  ko: string[];
  jp: string[];
}

export const i18nFlatIndex = ['en', 'ko', 'jp'];
export const i18nArrayIndex = ['en', 'ko', 'jp']; // multi entry index

export const i18nNameIndex = nestedKey('name', i18nFlatIndex); // name.en, name.ko, name.jp
export const i18nNameArrayIndex = nestedKey('name', i18nFlatIndex); // name.en, name.ko, name.jp
