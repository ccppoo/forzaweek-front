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
    devUrl: '/car/6684cbca6b755b09a74f84fc',
    title: 'car detail',
    icon: HomeIcon,
  },
  [Pages.Decals]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/Decals')),
    path: '/fh5/decal',
    title: 'Decals',
    icon: HomeIcon,
  },
  [Pages.DecalDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/DecalDetail')),
    path: '/fh5/decal/:decalID',
    title: 'fh5 decal detail',
    devUrl: '/fh5/decal/668e43139fea9e1931a55e8d',
    icon: HomeIcon,
  },
  [Pages.DecalWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/write/fh5')),
    path: '/fh5/decal/write',
    title: 'decal write',
    devUrl: '/fh5/decal/write',
    icon: HomeIcon,
  },
  [Pages.Tracks]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/Tracks')),
    path: '/fh5/track',
    title: 'Tracks',
    icon: HomeIcon,
  },
  [Pages.TrackDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/TrackDetail')),
    path: '/fh5/track/:trackID',
    title: 'Track detail',
    devUrl: '/fh5/track/1',
    icon: HomeIcon,
  },
  [Pages.TrackWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/write/fh5')),
    path: '/fh5/track/write',
    title: 'Track write',
    devUrl: '/fh5/track/write',
    icon: HomeIcon,
  },
  [Pages.Tunings]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/Tunings')),
    path: '/fh5/tuning',
    title: 'Tunings',
    icon: HomeIcon,
  },
  [Pages.TuningDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/TuningDetail')),
    path: '/fh5/tuning/:tuningID',
    devUrl: '/fh5/tuning/1',
    title: 'tuning detail',
    icon: HomeIcon,
  },

  [Pages.TuningWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/write/fh5')),
    path: '/fh5/tuning/write',
    title: 'tuning write',
    icon: HomeIcon,
  },
  [Pages.Data]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Data')),
    path: '/data',
    title: 'data',
    icon: HomeIcon,
  },

  [Pages.DataList]: {
    component: asyncComponentLoader(() => import('@/pages/Data/List')),
    path: '/data/:dataType',
    devUrl: '/data/manufacturer',
    // devHide: true,

    title: 'data list',
    icon: HomeIcon,
  },
  [Pages.DataEdit]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Edit')),
    path: '/data/:dataType/edit/:itemID',
    devUrl: '/data/manufacturer/edit/666be9211cd10aafae87323a',
    // devHide: true,
    title: 'edit data',
    icon: HomeIcon,
  },
  [Pages.DataWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Write')),
    path: '/data/:dataType/write',
    devUrl: '/data/tagkind/write',
    // devHide: true,
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
    devHide: true,
  },
};

export default routes;
