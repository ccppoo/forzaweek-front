import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import type { Collection, Table } from 'dexie';
// import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/db';
import type { Track2, TrackImage } from '@/db/schema';
import type { TrackInfo } from '@/types';

// import type { Actions } from './types';
import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  MANUFACTURER,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from './values';

export type TrackSearchOption = 'game' | 'category' | 'format' | 'laps' | 'world';

type TrackSearchOptions = {
  game: string;
  world: string[];
  category: string[];
  format: string[];
  laps: number;
};

const trackSearchOptionDefault: TrackSearchOptions = {
  game: 'FH5',
  world: [],
  category: [],
  format: [],
  laps: -1,
};

export const searchOptionMaxLength = {
  division: DIVISIONS.length,
  productionYear: PRODUCTION_YEARs.length,
  manufacturer: MANUFACTURER.length,
  boost: BOOST.length,
  country: COUNTRY.length,
  rarity: RARITY.length,
};

const trackSearchOptionState = atom<TrackSearchOptions>({
  key: 'track-search-option-state',
  default: trackSearchOptionDefault,
});

type Actions = {
  setOption: (value: string | string[] | number, option: TrackSearchOption) => void;
};

export async function getTrackData(): Promise<Track2[]> {
  // 옵션 선택 없는 경우 전체 반환
  const a = await db.track2.limit(20).toArray();
  console.log(`a : ${JSON.stringify(a)}`);
  return await db.track2.limit(20).toArray();
}

function useTrackSearchFilters(): [TrackSearchOptions, Track2[], Actions] {
  const [trackSearchOptions, setTrackSearchOptions] = useRecoilState(trackSearchOptionState);

  const searchResults: Track2[] | undefined = useLiveQuery(
    () => getTrackData(),
    [
      trackSearchOptions.game,
      trackSearchOptions.world,
      trackSearchOptions.category,
      trackSearchOptions.format,
      trackSearchOptions.laps,
    ],
  );

  const setOption = (value: string | string[] | number, option: TrackSearchOption) => {
    setTrackSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: value,
      };
    });
  };

  return [trackSearchOptions, searchResults || [], { setOption }];
}

export default useTrackSearchFilters;
