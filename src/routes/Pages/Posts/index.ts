import HomeIcon from '@mui/icons-material/Home';

import { RotuesRoot } from '@/routes/types';
import asyncComponentLoader from '@/utils/loader';

import type { RoutesPosts } from './types';
import { PostsPages } from './types';

export const routesPosts: RoutesPosts = {
  [PostsPages.List]: {
    component: asyncComponentLoader(() => import('@/pages/Board/Read')),
    path: '',
    devUrl: '/board/read/66b89ab2a8976a05a59c43c3',
    title: '글 읽기',
    icon: HomeIcon,
  },
  [PostsPages.Write]: {
    component: asyncComponentLoader(() => import('@/pages/Board/Edit')),
    path: 'write',
    devUrl: '/board/write',
    title: '글 쓰기',
    icon: HomeIcon,
  },
  [PostsPages.Edit]: {
    component: asyncComponentLoader(() => import('@/pages/Board/Edit')),
    path: 'edit/:postID',
    devUrl: '/board/edit/66b9ca119152e4d1277df189',
    title: '글 쓰기/수정',
    icon: HomeIcon,
  },
  [PostsPages.Read]: {
    component: asyncComponentLoader(() => import('@/pages/Board/Read')),
    path: 'read/:postID',
    devUrl: '/board/read/66b89ab2a8976a05a59c43c3',
    title: '글 읽기',
    icon: HomeIcon,
  },
};

export const routeRootPosts: RotuesRoot = {
  rootPrefix: 'post',
  routeItems: [{ prefix: '', routes: routesPosts }],
};
