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

type CarSearchOption =
  | 'division'
  | 'productionYear'
  | 'manufacturer'
  | 'rarity'
  | 'country'
  | 'boost';

type CarSearchOptions = Record<CarSearchOption, string[]>;

const carSearchOptionDefault: CarSearchOptions = {
  division: [...DIVISIONS],
  productionYear: [...PRODUCTION_YEARs],
  manufacturer: [...MANUFACTURER],
  boost: [...BOOST],
  country: [...COUNTRY],
  rarity: [...RARITY],
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
  toggleOption: (name: string, option: CarSearchOption) => void;
  selectAllSingleOption: (option: CarSearchOption) => void;
  unselectAllSingleOption: (option: CarSearchOption) => void;
  selectAllEveryOption: () => void;
};

function useCarSearchFilters(): [CarSearchOptions, Actions] {
  const [carSearchOptions, setCarSearchOptions] = useRecoilState(carSearchOptionState);

  const toggleOption = (name: string, option: CarSearchOption) => {
    setCarSearchOptions((curVal) => {
      if (curVal[option].includes(name)) {
        return {
          ...curVal,
          [option]: [...curVal[option]].filter((item) => item != name).toSorted(),
        };
      }
      return {
        ...curVal,
        [option]: [...curVal[option], name].toSorted(),
      };
    });
  };

  const selectAllSingleOption = (option: CarSearchOption) => {
    // use when selecting all option in single section e.g) division, country, manufacturer
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [...carSearchOptionDefault[option]].toSorted(),
      };
    });
  };

  const unselectAllSingleOption = (option: CarSearchOption) => {
    // use when clearing all option in single section e.g) division, country, manufacturer
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [],
      };
    });
  };

  const selectAllEveryOption = () => {
    // use when selecting all option in every car search option
    // sets to default value

    setCarSearchOptions(carSearchOptionDefault);
  };

  return [
    carSearchOptions,
    { toggleOption, selectAllSingleOption, selectAllEveryOption, unselectAllSingleOption },
  ];
}

export default useCarSearchFilters;
