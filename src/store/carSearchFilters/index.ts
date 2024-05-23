import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

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

export type CarSearchOption =
  | 'division'
  | 'productionYear'
  | 'manufacturer'
  | 'rarity'
  | 'country'
  | 'boost';

type CarSearchOptions = Record<CarSearchOption, string[]>;

const carSearchOptionDefault: CarSearchOptions = {
  division: [],
  productionYear: [],
  manufacturer: [],
  boost: [],
  country: [],
  rarity: [],
};

export const searchOptionMaxLength = {
  division: DIVISIONS.length,
  productionYear: PRODUCTION_YEARs.length,
  manufacturer: MANUFACTURER.length,
  boost: BOOST.length,
  country: COUNTRY.length,
  rarity: RARITY.length,
};

const carSearchOptionState = atom<CarSearchOptions>({
  key: 'car-search-option-state',
  default: carSearchOptionDefault,
});

type Actions = {
  setOption: (name: string[], option: CarSearchOption) => void;
};

function useCarSearchFilters(): [CarSearchOptions, Actions] {
  const [carSearchOptions, setCarSearchOptions] = useRecoilState(carSearchOptionState);

  const setOption = (name: string[], option: CarSearchOption) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [...name].toSorted(),
      };
    });
  };

  return [carSearchOptions, { setOption }];
}

export default useCarSearchFilters;
