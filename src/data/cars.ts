import * as image from '@/image';

import carInfo from './car_data.json';
import { CarData, CarInfo } from './types';

const imageMatch: Record<string, string> = {
  'IONIQ 6': image.car.hyundaiioniq6,
  'Veloster N': image.car.hyundaivelostar,
  'i30 N': image.car.hyundaii30n,
  'Kona N': image.car.hyundaikonaN,
  '#98 Bryan Herta Autosport Elantra N': image.car.hyundaiElantra,
};

export const carInfoWithImage: CarData[] = carInfo.map((value) => {
  const carName: string = value.name;
  return { info: value, image: imageMatch[carName] };
});
