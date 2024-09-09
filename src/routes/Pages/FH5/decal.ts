import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import type { RoutesFH5Decal } from './types';
import { FH5_Decal } from './types';

export const routesFH5Decal: RoutesFH5Decal = {
  [FH5_Decal.Decals]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/Decals')),
    path: '',
    title: 'Decals',
    icon: HomeIcon,
  },
  [FH5_Decal.DecalDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/DecalDetail')),
    path: ':decalID',
    title: 'FH5 decal detail',
    devUrl: '/FH5/decal/66cd813fdf960de7f80a72bd',
    icon: HomeIcon,
  },
  [FH5_Decal.DecalWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/write/fh5')),
    path: 'write',
    title: 'FH5 decal write',
    devUrl: '/FH5/decal/write',
    icon: HomeIcon,
  },
};
