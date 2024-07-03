import Dexie, { Table } from 'dexie';

import { supportLangs } from '@/config/i18n';
import type { CarImages, CarInfo, FH5_info } from '@/types';

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

/**
 * 1. ++	Auto-incremented primary key
 * 2. &	Unique index
 * 3. `column_name`*	Multi-entry index
 * 4. [A+B]	Compound index or primary key
 */

const i18nMapped = (field: string) => supportLangs.map((lang) => `${field}.${lang}`);

export class ForzaWeekDB extends Dexie {
  dbState!: Table<DBState>; // DB 전체 관리하는 테이블
  car!: Table<Car>;
  car2!: Table<Car2>;
  carFH5!: Table<FH5_STAT>; // id -> car's ID
  car_FH5_meta!: Table<FH5_META>; // id -> car's ID
  car_FH5_performance!: Table<FH5_Performance>; // id -> car's ID
  carImage!: Table<CarImage>; // id -> car's ID
  carImage2!: Table<CarImage2>; // id -> car's ID
  track!: Table<Track>;
  manufacturer!: Table<Manufacturer>;
  nation!: Table<Nation>;

  constructor() {
    super('frozaweekDB');
    this.version(1).stores({
      dbState: '++id,table,version,lastUpdate',
      car: '++id,name, year, country,driveTrain,door,engine,manufacture,bodyStyle',
      car2: `&id, name_en,${i18nMapped('name').join(',')}, short_name_en, ${i18nMapped(
        'short_name',
      ).join(',')}, productionYear, nation, manufacturer,door,engineType,bodyStyle`,
      carFH5: '&id,division,rarity,boost,PI',
      car_FH5_meta: `&id, division,rarity,boost,value`,
      car_FH5_performance: `&id, PI,speed,handling,acceleration,launch,braking,offroad`,
      carImage: '&id',
      carImage2: '&id',
      track: '++id, name, name_en,ko_sound,en_sound,ko_trans,en_trans,trackType,courseType',
      manufacturer: `&id, name, ${i18nMapped('name').join(',')}, founded, nation`,
      nation: `&id, name, ${i18nMapped('name').join(',')}`,
    });
  }
}

export const db = new ForzaWeekDB();

export async function dbTableNeedsUpdate(table: string, version: string): Promise<boolean> {
  const dbState = await db.dbState.where('table').equals(table).first();

  if (dbState && dbState.version == version) {
    return true;
  }

  return false;
}

// 현재 DB 테이블에 있는거 상태 반환
export async function dbTableStates(): Promise<DBState[]> {
  const dbState = await db.dbState.toArray();

  return dbState;
}

// DB 테이블에 있는 상태 서버가 확인하고 저장할거 보내주는 것
export async function dbTableUpsert<TableSchema>({
  table,
  version,
  lastUpdate,
  data,
}: {
  table: string;
  version: string;
  lastUpdate: number;
  data: TableSchema[];
}): Promise<void> {
  const dbUpdated = await db.table(table).bulkPut(data);
  const dbState = await db.dbState.where('table').equals(table).first();
  // 기록이 없는 경우 추가
  if (!dbState) {
    db.dbState.put({ table: table, version: `${lastUpdate}`, lastUpdate: lastUpdate });
    return;
  }
  await db.dbState.update(dbState.id, { lastUpdate: lastUpdate, version: `${lastUpdate}` });
}

export async function dbTableInsert<TableSchema>(
  table: string,
  version: string,
  data: TableSchema[],
): Promise<void> {
  const dbState = await db.table(table);
}

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
