import { DocumentBase } from '@/db/schema/base';
import { dbIndexBuilder } from '@/db/schema/config';
import { i18nFlatIndex, i18nFlatMap } from '@/db/schema/i18n';
import { singleImageURL } from '@/db/schema/image';

export interface Manufacturer extends DocumentBase, i18nFlatMap, singleImageURL {
  founded: number;
  origin: string;
}

export const ManufacturerIndex = dbIndexBuilder({
  PK: '&id',
  multiEntry: [...i18nFlatIndex],
  duplicate: ['founded', 'origin'],
});
