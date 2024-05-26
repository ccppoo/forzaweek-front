import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import type { Collection, Table } from 'dexie';
// import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import { getCars } from '@/api/car';
import { db } from '@/db';
import type { Car, CarImage, FH5_STAT } from '@/db/schema';
import type { CarImages, CarInfo, FH5_info } from '@/types/car';

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

function* zip<T, K, G>(cars: T[], fh5: K[], images: G[]): Generator<[T, K, G]> {
  // Create an array of tuples
  const len = cars.length;
  let cnt = 0;
  while (cnt < len) {
    yield [cars[cnt], fh5[cnt], images[cnt]];
    cnt++;
  }
}

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
  } else {
    searchResultKeys = await db.car.offset(0).primaryKeys();
  }
  if (div || boo || rar) {
    const fh5_query = [];
    if (div) fh5_query.push(db.carFH5.where('division').anyOfIgnoreCase(division).primaryKeys());
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

function useCarSearchFilters(): [CarSearchOptions, CarInfo[], boolean, Actions] {
  const [carSearchOptions, setCarSearchOptions] = useRecoilState(carSearchOptionState);

  const searchResults: CarInfo[] | undefined = useLiveQuery(
    () => getCarData(carSearchOptions),
    [
      carSearchOptions.boost,
      carSearchOptions.country,
      carSearchOptions.division,
      carSearchOptions.manufacturer,
      carSearchOptions.productionYear,
      carSearchOptions.rarity,
    ],
  );

  const isSearchOptionEmpty =
    Object.values(carSearchOptions).reduce((totalOpts, opts) => totalOpts + opts.length, 0) == 0;

  const setOption = (name: string[], option: CarSearchOption) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [...name].toSorted(),
      };
    });
  };

  return [carSearchOptions, searchResults || [], isSearchOptionEmpty, { setOption }];
}

export default useCarSearchFilters;
