import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import type { RoutesFH5VynilGroups } from './types';
import { FH5_VynilGroups } from './types';

export const routesFH5VynilGroup: RoutesFH5VynilGroups = {
  [FH5_VynilGroups.VynilGroups]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/Decals')),
    path: '/decal',
    title: 'Decals',
    icon: HomeIcon,
  },
  [FH5_VynilGroups.VynilGroupDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/DecalDetail')),
    path: '/decal/:decalID',
    title: 'FH5 decal detail',
    devUrl: '/FH5/decal/668e43139fea9e1931a55e8d',
    icon: HomeIcon,
  },
  [FH5_VynilGroups.VynilGroupWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/write/fh5')),
    path: '/decal/write',
    title: 'decal write',
    devUrl: '/FH5/decal/write',
    icon: HomeIcon,
  },
};
