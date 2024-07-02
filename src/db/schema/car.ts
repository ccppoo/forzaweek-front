import type { i18n, i18nMap } from './i18n';

export interface Car {
  id?: number;
  name: string;
  model: string;
  year: number;

  country: string;
  manufacture: string;

  driveTrain: string;
  door: number;
  engine: string;
  bodyStyle: string;
}

export interface Car2 {
  id: string;
  manufacturer: string; // manufacturer schema ID

  name_en: string;
  short_name_en: string;

  name: i18nMap;
  short_name: i18nMap;

  productionYear: number;
  engineType: string;
  door: number;
  bodyStyle: string;
}
