import { DocumentBase } from '@/db/model/base';
import { dbIndexBuilder } from '@/db/model/config';
import { i18nArrayMap, i18nNameArrayIndex } from '@/db/model/i18n';

export interface Car extends DocumentBase {
  manufacturer: string;
  productionYear: number;
  engineType: string;
  bodyStyle: string[];
  name: i18nArrayMap;
  door: number;
}

export const CarIndex = dbIndexBuilder({
  PK: '&id',
  multiEntry: [...i18nNameArrayIndex, 'bodyStyle'],
  duplicate: ['productionYear', 'manufacturer', 'engineType'],
});
