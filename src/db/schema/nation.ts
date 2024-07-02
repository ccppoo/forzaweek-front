import type { i18n, i18nMap } from './i18n';

export interface Nation {
  id: string;
  name: i18nMap;
  name_en: string;
  imageURL: string;
}
