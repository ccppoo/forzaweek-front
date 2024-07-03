import type { i18n, i18nMap } from './i18n';

export interface NationBase {
  name: i18nMap;
  name_en: string;
  imageURL: string;
}

export interface Nation extends NationBase {
  id: string;
}
