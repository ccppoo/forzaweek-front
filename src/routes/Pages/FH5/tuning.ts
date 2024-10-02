import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import type { RoutesFH5Tuning } from './types';
import { FH5_Tuning } from './types';

export const routesFH5Tuning: RoutesFH5Tuning = {
  [FH5_Tuning.Tunings]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/Tunings')),
    path: '',
    title: 'Tunings',
    icon: HomeIcon,
  },
  [FH5_Tuning.TuningDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/TuningDetail')),
    path: ':carID/:tuningID',
    devUrl: '/FH5/tuning/6684cbca6b755b09a74f84fc/66a1bd93c0c2a9311e907246',
    title: 'tuning detail',
    icon: HomeIcon,
  },
  [FH5_Tuning.TuningWriteHome]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/TuningWriteHome')),
    path: 'write',
    title: 'tuning write Home',
    icon: HomeIcon,
  },
  [FH5_Tuning.TuningDetailWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/write/fh5/TuningDetailedWrite')),
    path: 'write/detail',
    title: 'tuning write',
    icon: HomeIcon,
  },
  [FH5_Tuning.TuningBulkWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/write/fh5/TuningBulkWrite')),
    path: 'write/bulk',
    title: 'tuning Bulk write',
    icon: HomeIcon,
  },
};
