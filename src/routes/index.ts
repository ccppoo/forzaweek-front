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
    component: asyncComponentLoader(() => import('@/pages/Cars/Cars')),
    path: '/car',
    title: 'Cars',
    icon: HomeIcon,
  },
  [Pages.CarDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Cars/CarDetail')),
    path: '/car/:carID',
    devUrl: '/car/1',
    title: 'car detail',
    icon: HomeIcon,
  },
  [Pages.Decals]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/Decals')),
    path: '/decal',
    title: 'Decals',
    icon: HomeIcon,
  },
  [Pages.DecalDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/DecalDetail')),
    path: '/decal/:decalID',
    title: 'decal detail',
    devUrl: '/decal/1',
    icon: HomeIcon,
  },
  [Pages.Tracks]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/Tracks')),
    path: '/track',
    title: 'Tracks',
    icon: HomeIcon,
  },
  [Pages.TrackDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/TrackDetail')),
    path: '/track/:trackID',
    title: 'Track detail',
    devUrl: '/track/1',
    icon: HomeIcon,
  },
  [Pages.Tunings]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/Tunings')),
    path: '/tuning',
    title: 'Tunings',
    icon: HomeIcon,
  },
  [Pages.TuningDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/TuningDetail')),
    path: '/tuning/:tuningID',
    devUrl: '/tuning/1',
    title: 'tuning detail',
    icon: HomeIcon,
  },
  [Pages.Data]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Data')),
    path: '/data',
    title: 'data',
    icon: HomeIcon,
  },
  [Pages.DataEdit]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Edit')),
    path: '/data/edit/:dataType/:id',
    devUrl: '/data/edit/nation/1',
    title: 'edit data',
    icon: HomeIcon,
  },
  [Pages.DataWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Write')),
    path: '/data/write/:dataType',
    devUrl: '/data/write/nation',
    title: 'write data',
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
