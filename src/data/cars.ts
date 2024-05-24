import * as image from '@/image';

import carInfo from './car_data.json';
import manyCars from './cars.json';
import { CarData, CarInfo } from './types';

const a = {
  name: 'Abarth 131',
  model: 'Fiat 131',
  year: 1980,
  country: 'Italy',
  driveTrain: 'AWD',
  engine: 'ICE',
  door: 4,
  manufacture: 'Abarth',
  bodyStyle: 'sedan',
  FH5: {
    PI: 510,
    rarity: 'Common',
    value: 250000,
    boost: '',
    speed: 4.3,
    handling: 4.1,
    acceleration: 4.1,
    launch: 3.9,
    braking: 3.2,
    offroad: 5.9,
  },
};

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
