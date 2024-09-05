import { DocumentBase } from '@/db/schema/base';
import { dbIndexBuilder } from '@/db/schema/config';
import { i18nFlatIndex, i18nFlatMap } from '@/db/schema/i18n';
import { singleImageURL } from '@/db/schema/image';

export interface Country extends DocumentBase, i18nFlatMap, singleImageURL {}

export const CountryIndex = dbIndexBuilder({
  PK: '&id',
  multiEntry: [...i18nFlatIndex],
});
