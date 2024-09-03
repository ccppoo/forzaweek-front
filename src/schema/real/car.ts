import { documentBase, documentID } from '@/schema/base';
import { carBaseInfo } from '@/schema/components/car_info';
import { multipleImageURLs } from '@/schema/components/image';
import { aliasArrayi18n, nameArrayi18n } from '@/schema/components/name';
import { manufacturer } from '@/schema/real/manufacturer';

const _carReal = documentBase
  .merge(nameArrayi18n)
  .merge(aliasArrayi18n)
  .merge(multipleImageURLs)
  .merge(carBaseInfo);

export const carReal = _carReal.extend({ manufacturer: documentID });

export const carRealFull = _carReal.extend({ manufacturer: manufacturer });
