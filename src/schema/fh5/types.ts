import { z } from 'zod';

import { carFH5, carFH5Full } from './car';
import { raceRouteFH5 } from './raceRoute';

export type CarFH5Input = z.input<typeof carFH5>;
export type CarFH5Type = z.infer<typeof carFH5>;

export type CarFH5FullInput = z.input<typeof carFH5Full>;
export type CarFH5FullType = z.infer<typeof carFH5Full>;

export type RaceRouteFH5Input = z.input<typeof raceRouteFH5>;
export type RaceRouteFH5Type = z.infer<typeof raceRouteFH5>;
