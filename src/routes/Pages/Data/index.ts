import HomeIcon from '@mui/icons-material/Home';

import { RotuesRoot } from '@/routes/types';
import asyncComponentLoader from '@/utils/loader';

import type { RoutesData } from './types';
import { DataPages } from './types';

export const routesData: RoutesData = {
  [DataPages.Data]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Data')),
    path: '',
    title: 'data',
    icon: HomeIcon,
  },

  [DataPages.DataList]: {
    component: asyncComponentLoader(() => import('@/pages/Data/List')),
    path: ':dataType',
    devUrl: '/data/manufacturer',
    // devHide: true,

    title: 'data list',
    icon: HomeIcon,
  },
  [DataPages.DataEdit]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Edit')),
    path: ':dataType/edit/:itemID',
    devUrl: '/data/manufacturer/edit/666be9211cd10aafae87323a',
    // devHide: true,
    title: 'edit data',
    icon: HomeIcon,
  },
  [DataPages.DataWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Data/Write')),
    path: ':dataType/write',
    devUrl: '/data/tagkind/write',
    // devHide: true,
    title: 'write data',
    icon: HomeIcon,
  },
};

export const routeRootData: RotuesRoot = {
  rootPrefix: 'data',
  routeItems: [{ prefix: '', routes: routesData }],
};
