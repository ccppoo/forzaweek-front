import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Home]: {
    component: asyncComponentLoader(() => import('@/pages/Home')),
    path: '/',
    title: 'Home',
    icon: HomeIcon,
  },
  [Pages.Cars]: {
    component: asyncComponentLoader(() => import('@/pages/Cars')),
    path: '/car',
    title: 'Cars',
    icon: HomeIcon,
  },
  [Pages.Decals]: {
    component: asyncComponentLoader(() => import('@/pages/Decals')),
    path: '/decal',
    title: 'Decals',
    icon: HomeIcon,
  },
  [Pages.Tracks]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks')),
    path: '/track',
    title: 'Tracks',
    icon: HomeIcon,
  },
  [Pages.Tunings]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings')),
    path: '/tuning',
    title: 'Tunings',
    icon: HomeIcon,
  },
  [Pages.DEV]: {
    component: asyncComponentLoader(() => import('@/pages/Dev')),
    path: '/dev',
    title: 'dev',
    icon: HomeIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
    dev: false,
  },
};

export default routes;
