import HomeIcon from '@mui/icons-material/Home';

import { RotuesRoot } from '@/routes/types';
import asyncComponentLoader from '@/utils/loader';

import type { RoutesTags } from './types';
import { TagsPages } from './types';

export const routesTags: RoutesTags = {
  [TagsPages.Tags]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/Tag')),
    path: '',
    title: 'tags',
    icon: HomeIcon,
  },
  [TagsPages.TagList]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagList')),
    path: 'list',
    title: 'tag list',
    icon: HomeIcon,
  },
  [TagsPages.TagDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagDetail')),
    path: ':tagID',
    title: 'tag detail',
    devUrl: '/tag/668bb6d9c677bb3e3b93e651',
    icon: HomeIcon,
  },
};

export const routeRootTags: RotuesRoot = {
  rootPrefix: 'tag',
  routeItems: [{ prefix: '', routes: routesTags }],
};
