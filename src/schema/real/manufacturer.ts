import { z } from 'zod';

import { documentBase, documentID } from '@/schema/base';
import { carBaseInfo } from '@/schema/components/car_info';
import { singleImageURL } from '@/schema/components/image';
import { aliasi18n, nameEN, namei18n } from '@/schema/components/name';
import { country } from '@/schema/real/country';

const foundedAt = z.object({
  founded: z.number().gte(1800).lte(2700),
});

const _manufacturer = documentBase
  .merge(namei18n)
  // .merge(aliasi18n)
  .merge(nameEN)
  .merge(foundedAt)
  .merge(singleImageURL);

export const manufacturer = _manufacturer.extend({
  origin: documentID,
});

export const manufacturerFull = _manufacturer.extend({
  origin: country,
});
