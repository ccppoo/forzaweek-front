import Dexie, { Table } from 'dexie';

import { supportLangs } from '@/config/i18n';

import type { CarFH5, CarFH5Image, TrackFH5 } from './model/fh5';
import type { RaceRouteFH5, RaceRouteFH5Image } from './model/fh5';
import { CarFH5ImageIndex, CarFH5Index } from './model/fh5/dbIndex';
import { RaceRouteFH5ImageIndex, RaceRouteFH5Index } from './model/fh5/dbIndex';
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
  raceRouteFH5!: Table<RaceRouteFH5>; // id -> raceroute ID
  raceRouteFH5Image!: Table<RaceRouteFH5Image>; // id -> raceroute ID

  trackFH5!: Table<TrackFH5>; // NOTE: remove

  constructor() {
    super('frozaweekDB');
    this.version(1).stores({
      car: CarIndex,
      manufacturer: ManufacturerIndex,
      country: CountryIndex,
      carFH5: CarFH5Index,
      carFH5Image: CarFH5ImageIndex,
      trackFH5: '&id',
      raceRouteFH5: RaceRouteFH5Index,
      raceRouteFH5Image: RaceRouteFH5ImageIndex,
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
