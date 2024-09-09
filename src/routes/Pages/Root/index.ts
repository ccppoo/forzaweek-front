import HomeIcon from '@mui/icons-material/Home';

import { RotuesRoot } from '@/routes/types';
import asyncComponentLoader from '@/utils/loader';

import type { RoutesRoot } from './types';
import { RootPages } from './types';

export const routesDev: RoutesRoot = {
  [RootPages.Dev]: {
    component: asyncComponentLoader(() => import('@/pages/Dev')),
    path: 'dev',
    title: 'dev',
    icon: HomeIcon,
  },
  [RootPages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '',
    title: 'Home',
    icon: HomeIcon,
  },
  [RootPages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
    devHide: true,
  },
};

export const routeRootRoot: RotuesRoot = {
  rootPrefix: '',
  routeItems: [{ prefix: '', routes: routesDev }],
};
