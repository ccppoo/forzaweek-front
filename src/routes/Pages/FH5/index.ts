import { RotuesRoot, RoutesEssential } from '@/routes/types';

import { routesFH5Car } from './car';
import { routesFH5Decal } from './decal';
import { routesFH5RaceRoute } from './raceRoute';
import { routesFH5Seasons } from './seasons';
import { routesFH5Tuning } from './tuning';
import { routesFH5VynilGroup } from './vynilGroup';

export const routeRootFH5: RotuesRoot = {
  rootPrefix: 'FH5',
  routeItems: [
    { prefix: 'car', routes: routesFH5Car },
    { prefix: 'decal', routes: routesFH5Decal },
    { prefix: 'tuning', routes: routesFH5Tuning },
    { prefix: 'raceroute', routes: routesFH5RaceRoute },
    { prefix: 'season', routes: routesFH5Seasons },
  ],
};

export const routesFH5: RoutesEssential[] = [
  { prefix: 'car', routes: routesFH5Car },
  { prefix: 'decal', routes: routesFH5Decal },
  { prefix: 'tuning', routes: routesFH5RaceRoute },
  { prefix: 'raceroute', routes: routesFH5Tuning },
];
