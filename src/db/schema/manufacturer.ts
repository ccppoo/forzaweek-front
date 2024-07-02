import type { i18n, i18nMap } from './i18n';

export interface Manufacturer {
  id: string;
  name: i18nMap;
  name_en: string;
  founded: number;
  nation: string; // nation ID
  imageURL: string;
}
