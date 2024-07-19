import { atom, useRecoilState } from 'recoil';

import type { DrivingSystemType, PIClass, SuspensionType, TireType } from '@/types';

import type { Actions, TuningSearchOption, TuningSearchOptions } from './types';

const tuningSearchOptionDefault: TuningSearchOptions = {
  PI: {
    A: true,
    B: true,
    C: true,
    D: true,
    S1: true,
    S2: true,
    X: true,
  },
  drivingSystem: {
    AWD: true,
    FWD: true,
    RWD: true,
  },
  suspension: {
    drift: true,
    race: true,
    rally: true,
  },
  tire: {
    drag: true,
    normal: true,
    offroad: true,
    race: true,
    rally: true,
    slick: true,
    snow: true,
  },
};

const tuningSearchOptionState = atom<TuningSearchOptions>({
  key: 'tuning-search-option-state',
  default: tuningSearchOptionDefault,
});

function useTuningSearchFilters(): [TuningSearchOptions, Actions] {
  const [tuningSearchOptions, setTuningSearchOptions] = useRecoilState(tuningSearchOptionState);

  const toggleOption = (name: string, option: TuningSearchOption) => {
    setTuningSearchOptions((curVal) => {
      switch (option) {
        case 'PI': {
          const newOption = {
            ...curVal[option],
            [name as PIClass]: !curVal[option][name as PIClass],
          };
          return {
            ...curVal,
            [option]: newOption,
          };
        }
        case 'drivingSystem': {
          const newOption = {
            ...curVal[option],
            [name as DrivingSystemType]: !curVal[option][name as DrivingSystemType],
          };
          return {
            ...curVal,
            [option]: newOption,
          };
        }

        case 'suspension': {
          const newOption = {
            ...curVal[option],
            [name as SuspensionType]: !curVal[option][name as SuspensionType],
          };
          return {
            ...curVal,
            [option]: newOption,
          };
        }

        case 'tire': {
          const newOption = {
            ...curVal[option],
            [name as TireType]: !curVal[option][name as TireType],
          };
          return {
            ...curVal,
            [option]: newOption,
          };
        }
      }
    });
  };

  const toggleAllSingleOption = (option: TuningSearchOption) => {
    // use when selecting all option in single section e.g) division, country, manufacturer
    setTuningSearchOptions((curVal) => {
      const anyChoice = Object.values(curVal[option]).some((x) => x);

      switch (option) {
        case 'PI': {
          const newVal = { ...tuningSearchOptionDefault[option] };
          Object.keys(newVal).reduce((obj, x) => {
            obj[x as PIClass] = !anyChoice;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }
        case 'drivingSystem': {
          const newVal = { ...tuningSearchOptionDefault[option] };
          Object.keys(newVal).reduce((obj, x) => {
            obj[x as DrivingSystemType] = !anyChoice;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }

        case 'suspension': {
          const newVal = { ...tuningSearchOptionDefault[option] };
          Object.keys(newVal).reduce((obj, x) => {
            obj[x as SuspensionType] = !anyChoice;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }

        case 'tire': {
          const newVal = { ...tuningSearchOptionDefault[option] };

          Object.keys(newVal).reduce((obj, x) => {
            obj[x as TireType] = !anyChoice;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }
      }
    });
  };

  const unselectAllSingleOption = (option: TuningSearchOption) => {
    // use when clearing all option in single section e.g) division, country, manufacturer
    setTuningSearchOptions((curVal) => {
      switch (option) {
        case 'PI': {
          const newVal = { ...tuningSearchOptionDefault[option] };
          Object.keys(newVal).reduce((obj, x) => {
            obj[x as PIClass] = false;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }
        case 'drivingSystem': {
          const newVal = { ...tuningSearchOptionDefault[option] };
          Object.keys(newVal).reduce((obj, x) => {
            obj[x as DrivingSystemType] = false;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }

        case 'suspension': {
          const newVal = { ...tuningSearchOptionDefault[option] };
          Object.keys(newVal).reduce((obj, x) => {
            obj[x as SuspensionType] = false;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }

        case 'tire': {
          const newVal = { ...tuningSearchOptionDefault[option] };

          Object.keys(newVal).reduce((obj, x) => {
            obj[x as TireType] = false;
            return obj;
          }, newVal);

          return {
            ...curVal,
            [option]: newVal,
          };
        }
      }
    });
  };

  const selectAllEveryOption = () => {
    // use when selecting all option in every car search option
    // sets to default value

    setTuningSearchOptions(tuningSearchOptionDefault);
  };

  return [
    tuningSearchOptions,
    {
      toggleOption,
      toggleAllSingleOption,
      unselectAllSingleOption,
      selectAllEveryOption,
    },
  ];
}

export default useTuningSearchFilters;
