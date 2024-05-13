import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

// import type { Actions } from './types';
import { DIVISIONS } from './values';

type CarSearchOption = 'division';
// type CarSearchOption = 'division' | 'rarity' | 'productionYear' | 'country' | 'boost' | 'manufacturer'

type CarSearchOptions = Record<CarSearchOption, string[]>;

const carSearchOptionDefault: CarSearchOptions = {
  division: [...DIVISIONS],
};

export const searchOptionMaxLength = {
  division: DIVISIONS.length,
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

type FILTER_VALUES = Record<CarSearchOption, string[]>;

const filterValues: FILTER_VALUES = {
  division: DIVISIONS,
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
        [option]: [...filterValues[option]].toSorted(),
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
