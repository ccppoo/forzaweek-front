import Dexie, { Table } from 'dexie';

import { supportLangs } from '@/config/i18n';
import type { GAME } from '@/types';
import type { CarAndImage, CarImages, CarInfo2, CarInfoSimple } from '@/types/car';

import type { CarFH5, CarFH5Image, TrackFH5 } from './model/fh5';
import { CarFH5ImageIndex, CarFH5Index } from './model/fh5/dbIndex';
// export class ForzaWeekDB extends Dexie {
//   dbState!: Table<DBState>; // DB 전체 관리하는 테이블
//   car!: Table<Car>;
//   car2!: Table<Car2>;
//   carFH5!: Table<FH5_STAT>; // id -> car's ID
//   car_FH5_meta!: Table<FH5_META>; // id -> car's ID
//   car_FH5_performance!: Table<FH5_Performance>; // id -> car's ID
//   carImage!: Table<CarImage>; // id -> car's ID
//   carImage2!: Table<CarImage2>; // id -> car's ID
//   track!: Table<Track>;
//   track2!: Table<Track2>;
//   trackImage!: Table<TrackImage>;
//   manufacturer!: Table<Manufacturer>;
//   nation!: Table<Nation>;
//   constructor() {
//     super('frozaweekDB');
//     this.version(1).stores({
//       dbState: '++id,table,version,lastUpdate',
//       car: '++id,name, year, country,driveTrain,door,engine,manufacture,bodyStyle',
//       car2: `&id, name_en,${i18nMapped('name').join(',')}, short_name_en, ${i18nMapped(
//         'short_name',
//       ).join(',')}, productionYear, nation, manufacturer,door,engineType,bodyStyle`,
//       carFH5: '&id,division,rarity,boost,PI',
//       car_FH5_meta: `&id, division,rarity,boost,value`,
//       car_FH5_performance: `&id, PI,speed,handling,acceleration,launch,braking,offroad`,
//       carImage: '&id',
//       carImage2: '&id',
//       track: '++id, name, name_en,ko_sound,en_sound,ko_trans,en_trans,trackType,courseType',
//       track2: `&id, game,category,format,laps,world, ${i18nMapped('name').join(',')}, ${i18nMapped(
//         'liberal_translation',
//       ).join(',')}`,
//       trackImage: '&id',
//       manufacturer: `&id, name, ${i18nMapped('name').join(',')}, founded, origin`,
//       nation: `&id, name, ${i18nMapped('name').join(',')}`,
//     });
//   }
// }
import type { Car, Country, Manufacturer } from './model/real';
import { CarIndex, CountryIndex, ManufacturerIndex } from './model/real/dbIndex';

/**
 * 1. ++	Auto-incremented primary key
 * 2. &	Unique index
 * 3. `column_name`*	Multi-entry index
 * 4. [A+B]	Compound index or primary key
 */

const i18nMapped = (field: string) => supportLangs.map((lang) => `${field}.${lang}`);

export class ForzaWeekDB extends Dexie {
  car!: Table<Car>;
  manufacturer!: Table<Manufacturer>;
  country!: Table<Country>;
  carFH5!: Table<CarFH5>; // id -> car's ID
  carFH5Image!: Table<CarFH5Image>; // id -> car's ID
  trackFH5!: Table<TrackFH5>;

  constructor() {
    super('frozaweekDB');
    this.version(1).stores({
      car: CarIndex,
      manufacturer: ManufacturerIndex,
      country: CountryIndex,
      carFH5: CarFH5Index,
      carFH5Image: CarFH5ImageIndex,
      trackFH5: '&id',
    });
  }
}

export const db = new ForzaWeekDB();

export async function dbTableInsert<TableSchema>(
  table: string,
  version: string,
  data: TableSchema[],
): Promise<void> {
  const dbState = await db.table(table);
}

// export async function getAllCar2(): Promise<Car2[]> {
//   const cars = await db.car2.offset(0).toArray();
//   return cars;
// }

// export async function getAllCar(): Promise<Car2[]> {
//   const cars = await db.car2.offset(0).toArray();
//   return cars;
// }

// export async function getAllCarInfoSimple(): Promise<CarInfoSimple[]> {
//   const cars = await db.car2.offset(0).toArray();
//   const carInfoSimples = await Promise.all(
//     cars.map(async (car) => {
//       const manu = await db.manufacturer.get(car.manufacturer);
//       return { ...car, manufacturer: manu! };
//     }),
//   );
//   return carInfoSimples;
// }

// export async function getCarInfoSimple(
//   carID: string | undefined,
// ): Promise<CarInfoSimple | undefined> {
//   if (!carID) return undefined;

//   const car = await db.car2.get(carID);
//   if (!car) return undefined;

//   const manu = await db.manufacturer.get(car.manufacturer);

//   return {
//     ...car,
//     manufacturer: manu!,
//   };
// }

// export async function getCarAndImage2(carID: string): Promise<CarAndImage | undefined> {
//   const car = await db.car2.get(carID);
//   if (!car) return undefined;

//   const { id, ...carImages } = (await db.carImage2.get(carID))!;
//   const data = {
//     ...car,
//     image: carImages,
//   };
//   return data;
// }

// export async function getCar2(carID: string): Promise<Car2 | undefined> {
//   const car = await db.car2.get(carID);
//   if (!car) return undefined;
//   return car;
// }

// function zipCar2(
//   car: Car2,
//   manufacturer: Manufacturer,
//   nation: Nation,
//   image: CarImage2,
//   car_fh5_meta: FH5_META,
//   car_fh5_perf: FH5_Performance,
// ): CarInfo2 {
//   const { id: carID, ...res } = car;
//   const { id: ___, ...resImage } = image;
//   const { id: ____, ...carFH5meta } = car_fh5_meta;
//   const { id: _____, ...carFH5perf } = car_fh5_perf;
//   const joined = {
//     id: carID!,
//     ...res,
//     manufacturer: manufacturer,
//     nation: nation,
//     image: { ...resImage },
//     fh5_meta: { ...carFH5meta },
//     fh5_perf: { ...carFH5perf },
//   };
//   return joined;
// }

// export async function getCarInfo2(carID: string, game: GAME): Promise<CarInfo2 | undefined> {
//   console.log(`carID : ${carID}`);
//   const car = await db.car2.get(carID);
//   if (!car) return undefined;

//   console.log(`car.manufacturer : ${car.manufacturer}`);
//   const man = (await db.manufacturer.get(car.manufacturer))!;
//   console.log(`man : ${JSON.stringify(man)}`);
//   console.log(`man.nation : ${man.origin}`);
//   const nation = (await db.nation.get(man.origin))!;

//   const [image, car_fh5_meta, car_fh5_perf] = await Promise.all([
//     db.carImage2.get(carID),
//     db.car_FH5_meta.get(carID),
//     db.car_FH5_performance.get(carID),
//   ]);

//   return zipCar2(car, man, nation, image!, car_fh5_meta!, car_fh5_perf!);
// }

// export async function getCarImage(carID: string): Promise<CarImage2 | undefined> {
//   const carImg = await db.carImage2.get(carID);
//   if (!carImg) return undefined;
//   return carImg;
// }

// export async function getTrackImage(trackID: string): Promise<TrackImage | undefined> {
//   const trackImage = await db.trackImage.get(trackID);
//   if (!trackImage) return undefined;
//   return trackImage;
// }
