import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import type { RoutesFH5RaceRoute } from './types';
import { FH5_RaceRoute } from './types';

export const routesFH5RaceRoute: RoutesFH5RaceRoute = {
  [FH5_RaceRoute.RaceRoutes]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/Tracks')),
    path: '',
    title: 'Tracks',
    icon: HomeIcon,
  },
  [FH5_RaceRoute.RaceRouteDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/TrackDetail')),
    path: ':trackID',
    title: 'Track detail',
    devUrl: '/FH5/track/Arch_of_Mulege_Circuit',
    icon: HomeIcon,
  },
  [FH5_RaceRoute.RaceRouteWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/write/fh5')),
    path: 'write',
    title: 'Track write',
    devUrl: '/FH5/track/write',
    icon: HomeIcon,
  },
};
