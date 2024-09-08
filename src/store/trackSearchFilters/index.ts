import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/db';
import type { RaceRouteFH5, RaceRouteFH5Image } from '@/db/model/fh5/raceRoute';
import { searchRaceRouteFH5 } from '@/db/query/fh5/raceRoute';
import type { Track2 } from '@/db/schema';
import type { GAME } from '@/types';
import type { TrackCategory, TrackFormat, TrackFormatTopology, World } from '@/types/fh5';
import type {
  FH5_Category,
  FH5_Format,
  FH5_World,
  TrackSearchOptions,
} from '@/types/fh5/race_route';
import {
  RACEROUTE_FH5_CATEGORY_ALL,
  RACEROUTE_FH5_FORMAT_ALL,
  RACEROUTE_FH5_WORLD_ALL,
} from '@/types/fh5/race_route';

export type TrackSearchOption = 'game' | 'category' | 'format' | 'laps' | 'world';

// world  : "mexico", "hot_wheels", "rally", "event_island"
// laps : gte 0
// format :  "sprint", "trail", "course", "circuit", "scramble", "street", "crosscountry", "showcase", "drag",
// category : "crosscountry", "rally", "offroad", "road", "street", "drag", "hazard", "speed"
// event :

const trackSearchOptionDefault: TrackSearchOptions = {
  game: 'FH5',
  world: [],
  category: [],
  format: [],
  laps: -1,
};

const trackSearchOptionState = atom<TrackSearchOptions>({
  key: 'track-search-option-state',
  default: trackSearchOptionDefault,
});

function addToSet<T>(arr: T[], item: T): T[] {
  if (arr.includes(item)) return arr;
  return [...arr, item];
}

function removeFromSet<T>(arr: T[], item: T): T[] {
  return arr.filter((itm) => itm != item);
}

type Actions = {
  format: {
    clearRaceRouteFormat: () => void;
    selectAllRaceRouteFormat: () => void;
    addRaceRouteFormat: (format: FH5_Format) => void;
    removeRaceRouteFormat: (format: FH5_Format) => void;
  };
  category: {
    clearRaceRouteCategory: () => void;
    selectAllRaceRouteCategory: () => void;
    addRaceRouteCategory: (category: FH5_Category) => void;
    removeRaceRouteCategory: (category: FH5_Category) => void;
  };
  world: {
    clearRaceRouteWorld: () => void;
    selectAllRaceRouteWorld: () => void;
    addRaceRouteWorld: (world: FH5_World) => void;
    removeRaceRouteWorld: (world: FH5_World) => void;
  };
};

function useTrackSearchFilters(): [TrackSearchOptions, string[], Actions] {
  const [trackSearchOptions, setTrackSearchOptions] = useRecoilState(trackSearchOptionState);

  const searchResults: string[] | undefined = useLiveQuery(
    async () => await searchRaceRouteFH5(trackSearchOptions),
    [
      trackSearchOptions.game,
      trackSearchOptions.world,
      trackSearchOptions.category,
      trackSearchOptions.format,
      trackSearchOptions.laps,
    ],
  );

  // ======== world ========
  const _setRaceRouteWorld = useCallback((world: FH5_World[]) => {
    setTrackSearchOptions(({ world: prevWorld, ...res }) => {
      return {
        ...res,
        world: world,
      };
    });
  }, []);

  const clearRaceRouteWorld = () => _setRaceRouteWorld([]);
  const selectAllRaceRouteWorld = () => _setRaceRouteWorld(RACEROUTE_FH5_WORLD_ALL);

  function addRaceRouteWorld(world: FH5_World): void {
    setTrackSearchOptions(({ world: prevWorld, ...res }) => {
      return {
        ...res,
        world: addToSet<FH5_World>(prevWorld, world),
      };
    });
  }
  function removeRaceRouteWorld(world: FH5_World): void {
    setTrackSearchOptions(({ world: prevWorld, ...res }) => {
      return {
        ...res,
        world: removeFromSet<FH5_World>(prevWorld, world),
      };
    });
  }

  function toggleRaceRouteWorld(world: FH5_World): void {
    trackSearchOptions.world.includes(world)
      ? removeRaceRouteWorld(world)
      : addRaceRouteWorld(world);
  }

  // ======== cateogry ========
  const _setRaceRouteCategory = useCallback((categories: FH5_Category[]) => {
    setTrackSearchOptions(({ category: prevCategory, ...res }) => {
      return {
        ...res,
        category: categories,
      };
    });
  }, []);

  const clearRaceRouteCategory = () => _setRaceRouteCategory([]);
  const selectAllRaceRouteCategory = () => _setRaceRouteCategory(RACEROUTE_FH5_CATEGORY_ALL);

  function addRaceRouteCategory(category: FH5_Category): void {
    setTrackSearchOptions(({ category: prevCategory, ...res }) => {
      return {
        ...res,
        category: addToSet<FH5_Category>(prevCategory, category),
      };
    });
  }
  function removeRaceRouteCategory(category: FH5_Category): void {
    setTrackSearchOptions(({ category: prevCategory, ...res }) => {
      return {
        ...res,
        category: removeFromSet<FH5_Category>(prevCategory, category),
      };
    });
  }

  // ======== format ========
  const _setRaceRouteFormat = useCallback((formats: FH5_Format[]) => {
    setTrackSearchOptions(({ format: prevFormat, ...res }) => {
      return {
        ...res,
        format: formats,
      };
    });
  }, []);

  const clearRaceRouteFormat = () => _setRaceRouteFormat([]);
  const selectAllRaceRouteFormat = () => _setRaceRouteFormat(RACEROUTE_FH5_FORMAT_ALL);

  function addRaceRouteFormat(format: FH5_Format): void {
    setTrackSearchOptions(({ format: prevFormat, ...res }) => {
      return {
        ...res,
        format: addToSet<FH5_Format>(prevFormat, format),
      };
    });
  }
  function removeRaceRouteFormat(format: FH5_Format): void {
    setTrackSearchOptions(({ format: prevFormat, ...res }) => {
      return {
        ...res,
        format: removeFromSet<FH5_Format>(prevFormat, format),
      };
    });
  }

  return [
    trackSearchOptions,
    searchResults || [],
    {
      format: {
        clearRaceRouteFormat,
        selectAllRaceRouteFormat,
        addRaceRouteFormat,
        removeRaceRouteFormat,
      },
      category: {
        clearRaceRouteCategory,
        selectAllRaceRouteCategory,
        addRaceRouteCategory,
        removeRaceRouteCategory,
      },
      world: {
        clearRaceRouteWorld,
        selectAllRaceRouteWorld,
        addRaceRouteWorld,
        removeRaceRouteWorld,
      },
    },
  ];
}

export default useTrackSearchFilters;
