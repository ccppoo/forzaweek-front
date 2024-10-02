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
    devUrl: '/FH5/car/66d6a4f32090a29cc017fbb9',
    title: 'car detail',
    icon: HomeIcon,
  },
};
