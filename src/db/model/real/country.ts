import { DocumentBase } from '@/db/model/base';
import { dbIndexBuilder } from '@/db/model/config';
import { i18nFlatMap, i18nNameIndex } from '@/db/model/i18n';
import { singleImageURL } from '@/db/model/image';

export interface Country extends DocumentBase, singleImageURL {
  en: string;
  name: i18nFlatMap;
}

export const CountryIndex = dbIndexBuilder({
  PK: '&id',
  unique: [...i18nNameIndex],
});
