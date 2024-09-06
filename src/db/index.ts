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
