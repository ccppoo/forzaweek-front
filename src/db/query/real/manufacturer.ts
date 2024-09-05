import { db } from '@/db/index';
import { manufacturer as manufacturerZod } from '@/schema/real/manufacturer';
import {
  ManufacturerFullInput,
  ManufacturerFullType,
  ManufacturerInput,
  ManufacturerType,
} from '@/schema/real/types';

export async function getAllManufacturers(): Promise<ManufacturerType[]> {
  const manufacturers = await db.manufacturer.offset(0).toArray();
  const _manufacturers = manufacturers.map((man) => manufacturerZod.parse(man) as ManufacturerType);
  return _manufacturers;
}

export async function getManufacturersById(manufacturerIDs: string[]): Promise<ManufacturerType[]> {
  const mans = await db.manufacturer.bulkGet(manufacturerIDs);
  if (!mans) return [];

  return mans as ManufacturerType[];
}

export async function getManufacturerById(
  manufacturerID: string,
): Promise<ManufacturerType | undefined> {
  const man = await db.manufacturer.get(manufacturerID);
  if (!man) return undefined;

  return man;
}
