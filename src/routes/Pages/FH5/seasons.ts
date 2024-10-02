import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import type { RoutesFH5Seasons } from './types';
import { FH5_Seasons } from './types';

export const routesFH5Seasons: RoutesFH5Seasons = {
  [FH5_Seasons.SeasonHome]: {
    component: asyncComponentLoader(() => import('@/pages/Seasons/Seasons')),
    path: '',
    title: 'Seasons',
    icon: HomeIcon,
  },
  [FH5_Seasons.SeasonEdit]: {
    component: asyncComponentLoader(() => import('@/pages/Seasons/EditSeason')),
    path: 'edit',
    title: 'Seasons edit',
    icon: HomeIcon,
  },
  [FH5_Seasons.SeasonDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Seasons/SeasonDetail')),
    path: ':week',
    title: 'Seasons - week',
    icon: HomeIcon,
  },
};
