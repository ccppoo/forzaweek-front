import { DocumentBase } from '@/db/schema/base';
import { dbIndexBuilder } from '@/db/schema/config';
import { i18nArrayIndex, i18nArrayMap } from '@/db/schema/i18n';

export interface Car extends DocumentBase, i18nArrayMap {
  manufacturer: string;
  productionYear: number;
  engineType: string;
  bodyStyle: string[];
  door: number;
}

export const CarIndex = dbIndexBuilder({
  PK: '&id',
  multiEntry: [...i18nArrayIndex, 'bodyStyle'],
  duplicate: ['productionYear', 'manufacturer', 'engineType'],
});
