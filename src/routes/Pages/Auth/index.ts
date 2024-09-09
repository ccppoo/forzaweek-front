import HomeIcon from '@mui/icons-material/Home';

import { RotuesRoot, RoutesEssential } from '@/routes/types';
import asyncComponentLoader from '@/utils/loader';

import type { RoutesAuths } from './types';
import { AuthPages } from './types';

export const routesAuths: RoutesAuths = {
  [AuthPages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/Login')),
    path: 'login',
    title: 'login',
    icon: HomeIcon,
  },
  [AuthPages.Callback]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/CallBack')),
    path: 'callback',
    title: 'auth callback',
    icon: HomeIcon,
  },
};

export const routeRootAuths: RotuesRoot = {
  rootPrefix: 'auth',
  routeItems: [{ prefix: '', routes: routesAuths }],
};

export const routeAuths: RoutesEssential[] = [{ prefix: '', routes: routesAuths }];
