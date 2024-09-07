import { z } from 'zod';

import { documentBase, documentID } from '@/schema/base';
import { multipleImageURLs } from '@/schema/components/image';
import { carBaseStat } from '@/schema/fh5/components/car_stat';
import { carReal, carRealFull } from '@/schema/real/car';

const _carFH5 = documentBase.merge(multipleImageURLs).merge(carBaseStat);

export const carFH5 = _carFH5.extend({
  baseCar: documentID,
});

export const carFH5Full = _carFH5.extend({
  baseCar: carRealFull,
});
