import { atom, useRecoilState } from 'recoil';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/db';
import type { Car, CarImage, FH5_STAT } from '@/db/schema';
import type { CarImages, CarInfo, FH5_info } from '@/types';

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
interface GetCarDataIntf {
  division: string[];
  productionYear: string[];
  manufacturer: string[];
  boost: string[];
  country: string[];
  rarity: string[];
}
export const searchOptionMaxLength = {
  division: DIVISIONS.length,
  productionYear: PRODUCTION_YEARs.length,
  manufacturer: MANUFACTURER.length,
  boost: BOOST.length,
  country: COUNTRY.length,
  rarity: RARITY.length,
};

const tuningCarSearchOptionState = atom<CarSearchOptions>({
  key: 'tuning-car-search-option-state',
  default: carSearchOptionDefault,
});

function zipCar(cars: Car[], fh5s: FH5_STAT[], images: CarImage[]) {
  // Create an array of tuples
  const vals = [];
  const len = cars.length;
  let cnt = 0;
  while (cnt < len) {
    const { id: carID, ...res } = cars[cnt];
    const { id, ...resFH5 } = fh5s[cnt];
    const { id: _, ...resImage } = images[cnt];
    const joined = { ...res, fh5: { ...resFH5 }, image: { ...resImage } };
    vals.push(joined);
    cnt++;
  }
  return vals;
}

export async function getCarData({
  division,
  productionYear,
  manufacturer,
  boost,
  country,
  rarity,
}: GetCarDataIntf): Promise<CarInfo[]> {
  const man = manufacturer.length > 0;
  const con = country.length > 0;
  const years = productionYear.length > 0;
  const div = division.length > 0;
  const boo = boost.length > 0;
  const rar = rarity.length > 0;

  // 옵션 선택 없는 경우 전체 반환
  if (![man, con, years, div, boo, rar].some((x) => x)) {
    const pks = await db.car.limit(50).primaryKeys();
    const [carss, carfh5, carimgs] = await Promise.all([
      db.car.bulkGet(pks),
      db.carFH5.bulkGet(pks),
      db.carImage.bulkGet(pks),
    ]);

    return zipCar(carss as Car[], carfh5 as FH5_STAT[], carimgs as CarImage[]);
  }

  const productionYearNum = productionYear.map((yearString) =>
    parseInt(yearString.replace('s', '')),
  );
  const pdYear = productionYearNum.reduce(
    (years: number[], year: number) => [...years, ...numberRange(year, year + 10)],
    [],
  );

  let searchResultKeys: number[] = [];
  if (man || con || years) {
    const carSearchQueries = [];
    if (man)
      carSearchQueries.push(
        db.car.where('manufacture').anyOfIgnoreCase(manufacturer).primaryKeys(),
      );
    if (con) carSearchQueries.push(db.car.where('country').anyOfIgnoreCase(country).primaryKeys());
    if (years) carSearchQueries.push(db.car.where('year').anyOf(pdYear).primaryKeys());
    const pks = await Promise.all(carSearchQueries);
    // pks.map((ks) => console.log(`ks : ${ks}`));
    // console.log(`pks : ${pks} / qq len : ${qq.length}`);
    const smallestArray = pks.reduce((a, b) => (a.length <= b.length ? a : b));
    const allKeys = smallestArray.filter((k) => pks.map((ks) => ks.includes(k)).every((x) => x));
    // console.log(`allKeys : ${allKeys}`);
    searchResultKeys = [...allKeys];
  }
  if (div || boo || rar) {
    const fh5_query = [];
    if (div) fh5_query.push(db.carFH5.where('divison').anyOfIgnoreCase(division).primaryKeys());
    if (boo) fh5_query.push(db.carFH5.where('boost').anyOfIgnoreCase(boost).primaryKeys());
    if (rar) fh5_query.push(db.carFH5.where('rarity').anyOfIgnoreCase(rarity).primaryKeys());

    const pks2 = await Promise.all(fh5_query);
    const smallestArray2 = pks2.reduce((a, b) => (a.length <= b.length ? a : b));
    const allKeys2 = smallestArray2.filter((k) => pks2.map((ks) => ks.includes(k)).every((x) => x));
    // console.log(`allKeys2 : ${allKeys2}`);
    searchResultKeys = searchResultKeys.filter((x) => allKeys2.includes(x));
  }

  if (!(searchResultKeys.length > 0)) {
    return [];
  }
  const [carss, carfh5, carimgs] = await Promise.all([
    db.car.bulkGet(searchResultKeys),
    db.carFH5.bulkGet(searchResultKeys),
    db.carImage.bulkGet(searchResultKeys),
  ]);

  return zipCar(carss as Car[], carfh5 as FH5_STAT[], carimgs as CarImage[]);
}

function numberRange(start: number, end: number) {
  return new Array(end - start).fill(0).map((d, i) => i + start);
}
// type Actions = {
//   setOption: (name: string[], option: CarSearchOption) => void;
// };

type PI_CLASS = 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';
type SuspensionType = 'drift' | 'race' | 'rally';
type TierType = 'normal' | 'snow' | 'rally' | 'offroad' | 'slick' | 'race' | 'drag';
type DrivingSystemType = 'FWD' | 'AWD' | 'RWD';
type PIClassOption = Record<PI_CLASS, boolean>;
type SuspensionOption = Record<SuspensionType, boolean>;
type TierOption = Record<TierType, boolean>;
type DrivingSystemOption = Record<DrivingSystemType, boolean>;

type TuningSearchOption = 'PI' | 'suspension' | 'tier' | 'drivingSystem';
type TuningSearchOptions = {
  PI: PIClassOption;
  suspension: SuspensionOption;
  tier: TierOption;
  drivingSystem: DrivingSystemOption;
};

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
  tier: {
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
type Actions = {
  setCarSearchOption: (name: string[], option: CarSearchOption) => void;
  toggleOption: (name: string, option: TuningSearchOption) => void;
  toggleAllSingleOption: (option: TuningSearchOption) => void;
  unselectAllSingleOption: (option: TuningSearchOption) => void;
  selectAllEveryOption: () => void;
};

type CarSearchType = {
  tuningCarSearchOptions: CarSearchOptions;
  tuningCarSearchResult: CarInfo[];
};

function useTuningSearchFilters(): [TuningSearchOptions, CarSearchType, Actions] {
  const [tuningSearchOptions, setTuningSearchOptions] = useRecoilState(tuningSearchOptionState);
  const [tuningCarSearchOptions, setTuningCarSearchOptions] = useRecoilState(
    tuningCarSearchOptionState,
  );

  const searchResults: CarInfo[] | undefined = useLiveQuery(
    () => getCarData(tuningCarSearchOptions),
    [
      tuningCarSearchOptions.boost,
      tuningCarSearchOptions.country,
      tuningCarSearchOptions.division,
      tuningCarSearchOptions.manufacturer,
      tuningCarSearchOptions.productionYear,
      tuningCarSearchOptions.rarity,
    ],
  );
  const isSearchOptionEmpty =
    Object.values(tuningCarSearchOptions).reduce((totalOpts, opts) => totalOpts + opts.length, 0) ==
    0;
  const setCarSearchOption = (name: string[], option: CarSearchOption) => {
    setTuningCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [...name].toSorted(),
      };
    });
  };

  const toggleOption = (name: string, option: TuningSearchOption) => {
    setTuningSearchOptions((curVal) => {
      switch (option) {
        case 'PI': {
          const newOption = {
            ...curVal[option],
            [name as PI_CLASS]: !curVal[option][name as PI_CLASS],
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

        case 'tier': {
          const newOption = {
            ...curVal[option],
            [name as TierType]: !curVal[option][name as TierType],
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
            obj[x as PI_CLASS] = !anyChoice;
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

        case 'tier': {
          const newVal = { ...tuningSearchOptionDefault[option] };

          Object.keys(newVal).reduce((obj, x) => {
            obj[x as TierType] = !anyChoice;
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
            obj[x as PI_CLASS] = false;
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

        case 'tier': {
          const newVal = { ...tuningSearchOptionDefault[option] };

          Object.keys(newVal).reduce((obj, x) => {
            obj[x as TierType] = false;
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
    { tuningCarSearchOptions, tuningCarSearchResult: searchResults || [] },
    {
      setCarSearchOption,
      toggleOption,
      toggleAllSingleOption,
      unselectAllSingleOption,
      selectAllEveryOption,
    },
  ];
}

export default useTuningSearchFilters;
