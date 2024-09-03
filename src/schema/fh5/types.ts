import { z } from 'zod';

import { carFH5, carFH5Full } from './car';

export type CarFH5Input = z.input<typeof carFH5>;
export type CarFH5Type = z.infer<typeof carFH5>;

export type CarFH5FullInput = z.input<typeof carFH5Full>;
export type CarFH5FullType = z.infer<typeof carFH5Full>;
