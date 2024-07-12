import type { i18n, i18nMap } from './i18n';

export interface ManufacturerBase {
  name: i18nMap;
  name_en: string;
  founded: number;
  origin: string; // nation ID
  imageURL: string;
}

export interface Manufacturer extends ManufacturerBase {
  id: string;
}
