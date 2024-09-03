import { z } from 'zod';

import { carReal, carRealFull } from './car';
import { country } from './country';
import { manufacturer, manufacturerFull } from './manufacturer';

export type CountryInput = z.input<typeof country>;
export type CountryType = z.infer<typeof country>;

export type ManufacturerInput = z.input<typeof manufacturer>;
export type ManufacturerType = z.infer<typeof manufacturer>;

export type ManufacturerFullInput = z.input<typeof manufacturerFull>;
export type ManufacturerFullType = z.infer<typeof manufacturerFull>;

export type CarInput = z.input<typeof carReal>;
export type CarType = z.infer<typeof carReal>;

export type CarFullInput = z.input<typeof carRealFull>;
export type CarFullType = z.infer<typeof carRealFull>;
