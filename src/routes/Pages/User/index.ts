import HomeIcon from '@mui/icons-material/Home';

import { RotuesRoot } from '@/routes/types';
import asyncComponentLoader from '@/utils/loader';

import type { RoutesUser } from './types';
import { UserPages } from './types';

export const routesUser: RoutesUser = {
  [UserPages.Profile]: {
    component: asyncComponentLoader(() => import('@/pages/User/Profile')),
    path: 'profile/:userID',
    devUrl: '/profile/c786e13e-eeb8-5299-b6cc-4b9811101061',
    title: 'user profile',
    icon: HomeIcon,
  },
};

export const routeRootUser: RotuesRoot = {
  rootPrefix: 'user',
  routeItems: [{ prefix: '', routes: routesUser }],
};
