import * as image from '@/image';

import carInfo from './car_data.json';
import { CarData, CarInfo } from './types';

export const imageMatch: Record<string, string> = {
  'IONIQ 6': image.car.hyundaiioniq6,
  'Veloster N': image.car.hyundaivelostar,
  'i30 N': image.car.hyundaii30n,
  'Kona N': image.car.hyundaikonaN,
  '#98 Bryan Herta Autosport Elantra N': image.car.hyundaiElantra,
  'M-Sport Fiesta RS': image.car.ford_rs_festa_2017,
  'Mustang GT': image.car.ford_mustang_gt_2024,
  'Corvette E-Ray': image.car.chevrolet_corvette_eray,
  'Corvette Stingray Coupe': image.car.chevrolet_corvette,
};

export const carInfoWithImage: CarData[] = carInfo.map((value) => {
  const carName: string = value.name;
  return { info: value, image: imageMatch[carName] };
});
