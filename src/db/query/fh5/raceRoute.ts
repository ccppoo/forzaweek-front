import { db } from '@/db/index';
import { RaceRouteFH5, RaceRouteFH5Image } from '@/db/model/fh5';
import { range } from '@/utils/index';

function removeUndefined<T>(items: (T | undefined)[]): T[] {
  return items.filter((item) => item != undefined);
}

export async function getAllRaceRoutesFH5(): Promise<RaceRouteFH5[]> {
  const cars = await db.raceRouteFH5.offset(0).toArray();
  return cars;
}

export async function getRaceRouteFH5(
  raceRouteFH5ID: string | undefined,
): Promise<RaceRouteFH5 | undefined> {
  if (!raceRouteFH5ID) return undefined;
}
