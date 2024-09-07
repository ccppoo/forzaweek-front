import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/db';
import type { RaceRouteFH5, RaceRouteFH5Image } from '@/db/model/fh5/raceRoute';
import type { Track2 } from '@/db/schema';
import type { GAME } from '@/types';
import type { TrackCategory, TrackFormat, TrackFormatTopology, World } from '@/types/fh5';

export type TrackSearchOption = 'game' | 'category' | 'format' | 'laps' | 'world';

type TrackSearchOptions = {
  game: GAME; // choice
  world: Record<World, boolean>; // select
  category: Record<TrackCategory, boolean>; // select
  format: Record<TrackFormat, boolean>; // select
  laps: number;
};

const trackSearchOptionDefault: TrackSearchOptions = {
  game: 'FH5',
  world: {
    Mexico: true,
    HotWheels: true,
    SierraNueva: true,
  },
  category: {
    crossCountry: true,
    offRoad: true,
    drag: true,
    road: true,
    street: true,
  },
  format: {
    circuit: true,
    sprint: true,
    colossus: true,
    goliath: true,

    street: true,
    marathon: true,

    scramble: true,
    trail: true,
    gauntlet: true,
    juggernaut: true,

    crossCountryCircuit: true,
    crossCountry: true,
    titan: true,

    drag: true,
  },
  laps: -1,
};

const trackSearchOptionState = atom<TrackSearchOptions>({
  key: 'track-search-option-state',
  default: trackSearchOptionDefault,
});

const getSelectedOptions = (options: Record<any, boolean>) =>
  Object.entries(options)
    .filter(([_, selected]) => !!selected)
    .map(([cat, _]) => cat);

export async function getTrackData(options: TrackSearchOptions): Promise<Track2[]> {
  // 옵션 선택 없는 경우 전체 반환
  // game: string;
  // category: string;
  // format: string;
  // laps: number;
  // world: string;
  // name: i18nMap;
  // liberal_translation: i18nMap;

  // console.log(`options.category : ${JSON.stringify(options.category)}`);
  const cats = Object.entries(options.category)
    .filter(([_, selected]) => !!selected)
    .map(([cat, _]) => cat);
  const formats = Object.entries(options.format)
    .filter(([_, selected]) => !!selected)
    .map(([fmt, _]) => fmt);

  const tracks = await db.track2
    .where('game')
    .equals(options.game)
    .and((x) => formats.includes(x.format))
    .toArray();
  // db.track2.where('category').equals()
  return tracks;
}

type Actions = {
  setOption: (value: string | string[] | number, option: TrackSearchOption) => void;
  format: {
    setTrackFormat: (newFormat: Record<TrackFormat, boolean>) => void;
    toggleTrackFormat: (format: TrackFormat) => void;
    addTrackFormat: (format: TrackFormat) => void;
    removeTrackFormat: (format: TrackFormat) => void;
  };
  category: {
    setTrackCategory: (newCategory: Record<TrackCategory, boolean>) => void;
    addTrackCategory: (category: TrackCategory) => void;
    removeTrackCategory: (category: TrackCategory) => void;
  };
  world: {
    setTrackWorld: (world: World) => void;
    addTrackWorld: (world: World) => void;
    removeTrackWorld: (world: World) => void;
  };
};
function useTrackSearchFilters(): [TrackSearchOptions, string[], Actions] {
  const [trackSearchOptions, setTrackSearchOptions] = useRecoilState(trackSearchOptionState);

  const searchResults: Track2[] | undefined = useLiveQuery(
    () => getTrackData(trackSearchOptions),
    [
      trackSearchOptions.game,
      trackSearchOptions.world,
      trackSearchOptions.category,
      trackSearchOptions.format,
      trackSearchOptions.laps,
    ],
  );

  // console.log(`trackSearchOptions.format :${JSON.stringify(trackSearchOptions.format)}`);

  const setOption = (value: string | string[] | number, option: TrackSearchOption) => {
    setTrackSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: value,
      };
    });
  };

  const setTrackFormat = (newFormat: Record<TrackFormat, boolean>) => {
    // 'circuit' | 'sprint' | 'scramble' | 'trail' | 'crossCountry' | 'street';
    // circular : 'circuit', 'scramble'
    // linear : 'sprint', 'trail','crossCountry', 'street'
    setTrackSearchOptions((curVal) => {
      return {
        ...curVal,
        format: newFormat,
      };
    });
  };

  const toggleTrackFormat = (format: TrackFormat) => {
    // 'circuit' | 'sprint' | 'scramble' | 'trail' | 'crossCountry' | 'street';
    // circular : 'circuit', 'scramble'
    // linear : 'sprint', 'trail','crossCountry', 'street'
    setTrackSearchOptions((curVal: TrackSearchOptions) => {
      const { format: a, ...resss } = curVal;
      const { [format]: goingToChange, ...res } = a;
      return {
        ...resss,
        format: {
          ...res,
          [format]: !goingToChange,
        } as Record<TrackFormat, boolean>,
      };
    });
  };

  const addTrackFormat = (format: TrackFormat) => {
    // circular, linear (이벤트 트랙은 수동으로 )
  };
  const removeTrackFormat = (format: TrackFormat) => {
    // circular, linear (이벤트 트랙은 수동으로 )
  };

  const setTrackCategory = (newCategory: Record<TrackCategory, boolean>) => {
    // 'crossCountry' | 'offRoad' | 'road' | 'street' | 'drag';
    setTrackSearchOptions((curVal) => {
      return {
        ...curVal,
        category: newCategory,
      };
    });
  };
  const addTrackCategory = (category: TrackCategory) => {
    // 'crossCountry' | 'offRoad' | 'road' | 'street' | 'drag';
  };
  const removeTrackCategory = (category: TrackCategory) => {
    // 'crossCountry' | 'offRoad' | 'road' | 'street' | 'drag';
  };

  const setTrackWorld = (world: World) => {
    //  'Mexico' | 'Hot Wheels' | 'Sierra Nueva';
  };
  const addTrackWorld = (world: World) => {
    //  'Mexico' | 'Hot Wheels' | 'Sierra Nueva';
  };
  const removeTrackWorld = (world: World) => {
    //  'Mexico' | 'Hot Wheels' | 'Sierra Nueva';
  };

  return [
    trackSearchOptions,
    searchResults || [],
    {
      setOption,
      format: {
        setTrackFormat,
        toggleTrackFormat,
        addTrackFormat,
        removeTrackFormat,
      },
      category: {
        setTrackCategory,
        addTrackCategory,
        removeTrackCategory,
      },
      world: {
        setTrackWorld,
        addTrackWorld,
        removeTrackWorld,
      },
    },
  ];
}

export default useTrackSearchFilters;
