import { db } from '@/db/index';
import { RaceRouteFH5, RaceRouteFH5Image } from '@/db/model/fh5';
import type { RaceRouteFH5Input, RaceRouteFH5Type } from '@/schema/fh5/types';
import type {
  FH5_Category,
  FH5_Format,
  FH5_World,
  TrackSearchOptions,
} from '@/types/fh5/race_route';
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
): Promise<RaceRouteFH5Type | undefined> {
  if (!raceRouteFH5ID) return undefined;

  const raceRouteFH5 = await db.raceRouteFH5.get(raceRouteFH5ID);
  if (!raceRouteFH5) return undefined;
  const raceRouteFH5Img = await db.raceRouteFH5Image.get(raceRouteFH5ID);

  const _raceRouteFH5 = {
    ...raceRouteFH5,
    ...raceRouteFH5Img,
  } as RaceRouteFH5Input;

  return _raceRouteFH5 as RaceRouteFH5Type;
}

// export async function getRaceRouteFH5(raceRouteFH5ID: string | undefined) {
//   if (!raceRouteFH5ID) return undefined;
// }

export async function searchRaceRouteFH5(options: TrackSearchOptions): Promise<string[]> {
  // 옵션 선택 없는 경우 전체 반환
  const { category, format, game, laps, world } = options;
  // world: string;
  // laps: number;
  // category: string;
  // raceFormat: string;
  // event?: string;
  const WORLD_SEARCH = world.length > 0;
  const FORMAT_SEARCH = format.length > 0;
  const CATEGORY_SEARCH = category.length > 0;
  // const LAPS_SEARCH = laps > -1
  // const GAME_SEARCH = world.length > 0

  if (!(WORLD_SEARCH || FORMAT_SEARCH || CATEGORY_SEARCH)) {
    return await db.raceRouteFH5.offset(0).primaryKeys();
    // return await db.raceRouteFH5.offset(0).limit(5).primaryKeys();
  }

  let query: any = db.raceRouteFH5;

  if (WORLD_SEARCH) {
    query = query.where('world').anyOfIgnoreCase(world);
  }
  if (FORMAT_SEARCH) {
    if (WORLD_SEARCH) {
      query = query.and((raceRoute: RaceRouteFH5) => format.includes(raceRoute.raceFormat));
    }
    if (!WORLD_SEARCH) {
      query = query.where('raceFormat').anyOfIgnoreCase(format);
    }
  }
  if (CATEGORY_SEARCH) {
    if (WORLD_SEARCH || FORMAT_SEARCH) {
      query = query.and((raceRoute: RaceRouteFH5) => category.includes(raceRoute.category));
    }
    if (!(WORLD_SEARCH || FORMAT_SEARCH)) {
      query = query.where('category').anyOfIgnoreCase(category);
    }
  }
  return await query.primaryKeys();
}
