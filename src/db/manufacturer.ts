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

export async function getManufacturer(manufacturerID: string): Promise<Manufacturer | undefined> {
  const manufacturer = await db.manufacturer.get(manufacturerID);

  return manufacturer;
}
