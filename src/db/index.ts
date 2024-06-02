import Dexie, { Table } from 'dexie';

import type { CarImages, CarInfo, FH5_info } from '@/types';

import { Car, CarImage, FH5_STAT, Track } from './schema';

/**
 * 1. ++	Auto-incremented primary key
 * 2. &	Unique index
 * 3. `column_name`*	Multi-entry index
 * 4. [A+B]	Compound index or primary key
 */

export class ForzaWeekDB extends Dexie {
  car!: Table<Car>;
  carFH5!: Table<FH5_STAT>; // id -> car's ID
  carImage!: Table<CarImage>; // id -> car's ID
  track!: Table<Track>;

  constructor() {
    super('frozaweekDB');
    this.version(1).stores({
      car: '++id,name, year, country,driveTrain,door,engine,manufacture,bodyStyle',
      carFH5: '&id,division,rarity,boost,PI',
      carImage: '&id',
      track: '++id, name, name_en,ko_sound,en_sound,ko_trans,en_trans,trackType,courseType',
    });
  }
}

export const db = new ForzaWeekDB();

export async function getCarData(): Promise<CarInfo[]> {
  const cars = await db.car.where('year').above(2000).toArray();
  const results = await Promise.all(
    cars.map(async (car) => {
      const { id: carID, ...res } = car;
      // 자동차 FH5 스탯 가져오기
      // console.log(`carID : ${carID}`);
      const [fh5, images] = await Promise.all([
        await db.carFH5.where('id').equals(carID!).first(),
        await db.carImage.where('id').equals(carID!).first(),
      ]);
      // const fh5 = await db.carFH5.where('id').equals(carID!).first();
      // const images = await db.carImage.where('id').equals(carID!).first();

      // console.log(`fh5 : ${JSON.stringify(fh5)}`);
      const { id, ...resFH5 } = fh5!;
      const { id: _, ...resImage } = images!;
      const joined = { id: carID!, ...res, fh5: { ...resFH5 }, image: { ...resImage } };
      return joined;
    }),
  );
  // console.log(`results : ${JSON.stringify(results)}`);
  return results;
}

export async function getCarInfo(name: string): Promise<CarInfo | undefined> {
  const car = await db.car.where('name').equals(name).first();

  if (!car) return undefined;
  const { id: carID, ...res } = car;
  const [fh5, images] = await Promise.all([
    await db.carFH5.where('id').equals(carID!).first(),
    await db.carImage.where('id').equals(carID!).first(),
  ]);
  const { id, ...resFH5 } = fh5!;
  const { id: _, ...resImage } = images!;
  const joined = { id: carID!, ...res, fh5: { ...resFH5 }, image: { ...resImage } };
  return joined;
}

export async function getCarInfoByID(carId: number): Promise<CarInfo | undefined> {
  const car = await db.car.get(carId);

  if (!car) return undefined;
  const { id: carID, ...res } = car;
  const [fh5, images] = await Promise.all([
    await db.carFH5.where('id').equals(carID!).first(),
    await db.carImage.where('id').equals(carID!).first(),
  ]);
  const { id, ...resFH5 } = fh5!;
  const { id: _, ...resImage } = images!;
  const joined = { id: carID!, ...res, fh5: { ...resFH5 }, image: { ...resImage } };
  return joined;
}
