import { DocumentBase } from '@/db/model/base';
import { dbIndexBuilder } from '@/db/model/config';
import { i18nFlatMap, i18nNameIndex } from '@/db/model/i18n';
import { singleImageURL } from '@/db/model/image';

export interface Manufacturer extends DocumentBase, singleImageURL {
  founded: number;
  origin: string;
  name: i18nFlatMap;
  en: string;
}

const a = {
  id: '66d001e9f2d9ae267ee19172',
  name: { ko: '아우디', en: 'Audi', jp: 'アウディ' },
  // alias: {},
  en: 'Audi',
  founded: 1909,
  imageURL: 'https://fzwcdn.forzaweek.com/static/manufacturer/Audi.svg',
  origin: '66cf23a7d1bd69047ff7d4c8',
};

export const ManufacturerIndex = dbIndexBuilder({
  PK: '&id',
  unique: [...i18nNameIndex],
  duplicate: ['founded', 'origin'],
});
