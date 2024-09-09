import HomeIcon from '@mui/icons-material/Home';

import asyncComponentLoader from '@/utils/loader';

import type { RoutesFH5Car } from './types';
import { FH5_Car } from './types';

export const routesFH5Car: RoutesFH5Car = {
  [FH5_Car.Cars]: {
    component: asyncComponentLoader(() => import('@/pages/Cars/Cars')),
    path: '',
    title: 'Cars',
    icon: HomeIcon,
  },
  [FH5_Car.CarDetail]: {
    component: asyncComponentLoader(() => import('@/pages/Cars/CarDetail')),
    path: ':carID',
    devUrl: '/FH5/car/66d69c65a368e84afdbb6347',
    title: 'car detail',
    icon: HomeIcon,
  },
};
