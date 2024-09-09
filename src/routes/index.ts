import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import { routesForDev } from './paths';
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
    devUrl: '/car/66d69c65a368e84afdbb6347',
    title: 'car detail',
    icon: HomeIcon,
  },
  [Pages.Decals]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/Decals')),
    path: '/FH5/decal',
    title: 'Decals',
    icon: HomeIcon,
  },
  [Pages.DecalDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/DecalDetail')),
    path: '/FH5/decal/:decalID',
    title: 'FH5 decal detail',
    devUrl: '/FH5/decal/668e43139fea9e1931a55e8d',
    icon: HomeIcon,
  },
  [Pages.DecalWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Decals/write/fh5')),
    path: '/FH5/decal/write',
    title: 'decal write',
    devUrl: '/FH5/decal/write',
    icon: HomeIcon,
  },
  [Pages.Tracks]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/Tracks')),
    path: '/FH5/track',
    title: 'Tracks',
    icon: HomeIcon,
  },
  [Pages.TrackDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/TrackDetail')),
    path: '/FH5/track/:trackID',
    title: 'Track detail',
    devUrl: '/FH5/track/Arch_of_Mulege_Circuit',
    icon: HomeIcon,
  },
  [Pages.TrackWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Tracks/write/fh5')),
    path: '/FH5/track/write',
    title: 'Track write',
    devUrl: '/FH5/track/write',
    icon: HomeIcon,
  },
  [Pages.Tunings]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/Tunings')),
    path: '/FH5/tuning',
    title: 'Tunings',
    icon: HomeIcon,
  },
  [Pages.TuningDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/TuningDetail')),
    path: '/FH5/tuning/:carID/:tuningID',
    devUrl: '/FH5/tuning/6684cbca6b755b09a74f84fc/66a1bd93c0c2a9311e907246',
    title: 'tuning detail',
    icon: HomeIcon,
  },

  [Pages.TuningWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Tunings/write/fh5')),
    path: '/FH5/tuning/write',
    title: 'tuning write',
    icon: HomeIcon,
  },

  [Pages.Tags]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/Tag')),
    path: '/tag',
    title: 'tags',
    icon: HomeIcon,
  },
  [Pages.TagList]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagList')),
    path: '/tag/list',
    title: 'tag list',
    icon: HomeIcon,
  },
  [Pages.TagDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagDetail')),
    path: '/tag/:tagID',
    title: 'tag detail',
    devUrl: '/tag/668bb6d9c677bb3e3b93e651',
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
  [Pages.BoardWrite]: {
    component: asyncComponentLoader(() => import('@/pages/Board/Edit')),
    path: '/board/write',
    devUrl: '/board/write',
    title: '글 쓰기',
    icon: HomeIcon,
  },
  [Pages.BoardPostEdit]: {
    component: asyncComponentLoader(() => import('@/pages/Board/Edit')),
    path: '/board/edit/:postID',
    devUrl: '/board/edit/66b9ca119152e4d1277df189',
    title: '글 쓰기/수정',
    icon: HomeIcon,
  },
  [Pages.BoardRead]: {
    component: asyncComponentLoader(() => import('@/pages/Board/Read')),
    path: '/board/read/:postID',
    devUrl: '/board/read/66b89ab2a8976a05a59c43c3',
    title: '글 읽기',
    icon: HomeIcon,
  },
  [Pages.UserProfile]: {
    component: asyncComponentLoader(() => import('@/pages/User/Profile')),
    path: '/profile/:userID',
    devUrl: '/profile/c786e13e-eeb8-5299-b6cc-4b9811101061',
    title: 'user profile',
    icon: HomeIcon,
  },
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Auth')),
    path: '/login',
    title: 'login',
    icon: HomeIcon,
  },
  [Pages.CallBack]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/CallBack')),
    path: '/auth/callback',
    title: 'auth call back',
    icon: HomeIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
    devHide: true,
  },
};

export { routesForDev };
export default routes;
