import type { CarInfoEssential } from '@/types/car';

import { db } from './index';
import {
  Car,
  Car2,
  CarImage,
  CarImage2,
  DBState,
  FH5_META,
  FH5_Performance,
  FH5_STAT,
  Manufacturer,
  Nation,
  Track,
} from './schema';

function* zip<T, K>(cars: T[], images: K[]): Generator<[T, K]> {
  // Create an array of tuples
  const len = cars.length;
  let cnt = 0;
  while (cnt < len) {
    yield [cars[cnt], images[cnt]];
    cnt++;
  }
}

export async function getAllCarEssential(): Promise<CarInfoEssential[]> {
  const cars = await db.car2.toArray();

  const carInfoEssen = await Promise.all(
    cars.map(async (car) => {
      const [man, img] = await Promise.all([
        db.manufacturer.get(car.manufacturer),
        db.carImage2.get(car.id),
      ]);
      return {
        ...car,
        image: img!,
        manufacturer: man!,
      };
    }),
  );

  return carInfoEssen;
}

export async function getAllNations(): Promise<Nation[]> {
  const nations = (await db.nation.toArray()).toSorted((n1, n2) =>
    n1.name_en > n2.name_en ? 1 : -1,
  );
  return nations;
}

export async function getAllManufacturers(): Promise<Manufacturer[]> {
  const manufacturers = (await db.manufacturer.toArray()).toSorted((m1, m2) =>
    m1.name_en > m2.name_en ? 1 : -1,
  );
  return manufacturers;
}
