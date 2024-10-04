import { atomFamily, useRecoilState } from 'recoil';

import { useLiveQuery } from 'dexie-react-hooks';

import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  MANUFACTURER,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from '@/data/values';
import { db } from '@/db';
import { searchCarByFilter } from '@/db/query/fh5/car';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';

export type CarSearchOption =
  | 'division'
  | 'productionYear'
  | 'manufacturer'
  | 'rarity'
  | 'country'
  | 'boost';

type CarSearchOptions = {
  division: string[];
  productionYear: string[];
  manufacturer: string[];
  boost: string[];
  country: string[];
  rarity: string[];
};

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

const carSearchOptionStateFamily = atomFamily<CarSearchOptions, string>({
  key: 'car-search-option-state',
  default: carSearchOptionDefault,
});

type Actions = {
  setOption: (name: string[], option: CarSearchOption) => void;
  clearAllOptions: () => void;
  setOptions: {
    setNationOption: (nations: string[]) => void;
    setManufacturerOption: (manufacturers: string[]) => void;
  };
};

interface GetCarDataIntf {
  division: string[];
  productionYear: string[];
  manufacturer: string[];
  boost: string[];
  country: string[];
  rarity: string[];
}

function numberRange(start: number, end: number) {
  return new Array(end - start).fill(0).map((d, i) => i + start);
}

function useCarSearchFilters(
  scope: string,
): [CarSearchOptions, CarFH5FullType[], boolean, Actions] {
  const [carSearchOptions, setCarSearchOptions] = useRecoilState(carSearchOptionStateFamily(scope));
  // const [carSearchOptions, setCarSearchOptions] = useRecoilState(carSearchOptionState);
  const searchResults: CarFH5FullType[] | undefined = useLiveQuery(
    async () => await searchCarByFilter(carSearchOptions),
    [
      carSearchOptions.boost,
      carSearchOptions.country,
      carSearchOptions.division,
      carSearchOptions.manufacturer,
      carSearchOptions.productionYear,
      carSearchOptions.rarity,
    ],
  );
  // console.log(`carSearchOptions : ${JSON.stringify(searchResults)}`);

  const isSearchOptionEmpty =
    Object.values(carSearchOptions).reduce((totalOpts, opts) => totalOpts + opts.length, 0) == 0;

  const setOption = (name: string[] | string[], option: CarSearchOption) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [...name],
      };
    });
  };

  const setNationOption = (nations: string[]) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        country: [...nations],
      };
    });
  };

  const setManufacturerOption = (manufacturers: string[]) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        manufacturer: [...manufacturers],
      };
    });
  };

  const clearAllOptions = () => {
    setCarSearchOptions(carSearchOptionDefault);
  };

  return [
    carSearchOptions,
    searchResults || [],
    isSearchOptionEmpty,
    {
      setOption,
      clearAllOptions,
      setOptions: {
        setNationOption,
        setManufacturerOption,
      },
    },
  ];
}

export default useCarSearchFilters;
