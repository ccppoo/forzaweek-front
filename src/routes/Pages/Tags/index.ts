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
  [TagsPages.TagCreate]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagWrite')),
    path: 'edit',
    title: 'tag create',
    devUrl: 'tag/edit',
    icon: HomeIcon,
  },
  [TagsPages.TagEdit]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagWrite')),
    path: 'edit/:tagID',
    title: 'tag edit',
    devUrl: 'tag/edit/668bb6d9c677bb3e3b93e651',
    icon: HomeIcon,
  },
  [TagsPages.TagCategroyCreate]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagCategoryWrite')),
    path: 'category/edit',
    title: 'tag category create',
    devUrl: 'tag/category/edit',
    icon: HomeIcon,
  },
  [TagsPages.TagCategroyEdit]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagCategoryWrite')),
    path: 'category/edit/:tagCategoryID',
    title: 'tag category edit',
    devUrl: 'tag/category/edit/66eae0d5a4ca703fe8b3c8bf',
    icon: HomeIcon,
  },
  [TagsPages.TagCategoryDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Tag/TagDetail/TagCategoryDetail')),
    path: 'category/:tagCategoryID',
    title: 'tag cat detail',
    devUrl: '/tag/category/66eae0d5a4ca703fe8b3c8bf',
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
