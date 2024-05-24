import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

// import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import { getCars } from '@/api/car';
import { db } from '@/db';
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

export async function getCarData({
  division,
  productionYear,
  manufacturer,
  boost,
  country,
  rarity,
}: GetCarDataIntf): Promise<CarInfo[]> {
  let queryStatement = db.car;

  if (manufacturer.length > 0) {
    queryStatement = queryStatement.where('manufacture').anyOfIgnoreCase(manufacturer);
  }
  if (country.length > 0) {
    queryStatement = queryStatement.where('country').anyOfIgnoreCase(country);
  }
  if (productionYear.length > 0) {
    // Option 값 자체를 바꿀 것
    const productionYearNum = productionYear.map((yearString) =>
      parseInt(yearString.replace('s', '')),
    );
    const pdYear = productionYearNum.reduce(
      (years: number[], year: number) => [...years, ...numberRange(year, year + 10)],
      [],
    );
    queryStatement = queryStatement.where('year').anyOf(pdYear);
  }
  // const cars = await db.car.where('manufacture').equals(manufacturer).toArray();
  let cars = await queryStatement.toArray();

  let filteredCar = [];
  let filteredCarId: number[] = [];

  const doFilter = [division.length].some((x) => x > 0);
  // const doFilter = [division.length,boost.length, rarity.length].some((x) => x > 0);
  if (division.length > 0) {
    // console.log(`division : ${JSON.stringify(division)}`);
    filteredCar = await db.carFH5.where('division').anyOfIgnoreCase(division).toArray();
    // console.log(`filteredCar :${JSON.stringify(filteredCar)}`);
    filteredCarId = [...filteredCarId, ...filteredCar.map((fh5) => fh5.id!)];
  }
  // if (boost.length > 0) {
  //   filteredCar = await db.carFH5.where('boost').anyOfIgnoreCase(boost).toArray();
  //   filteredCarId = [...filteredCarId, ...filteredCar.map((fh5) => fh5.id!)];
  // }
  // if (rarity.length > 0) {
  //   filteredCar = await db.carFH5.where('rarity').anyOfIgnoreCase(rarity).toArray();
  //   filteredCarId = [...filteredCarId, ...filteredCar.map((fh5) => fh5.id!)];
  // }

  if (doFilter) {
    cars = cars.filter((car) => filteredCarId.includes(car.id!));
  }

  const results = await Promise.all(
    cars.map(async (car) => {
      const { id: carID, ...res } = car;
      // 자동차 FH5 스탯 가져오기
      // console.log(`carID : ${carID}`);
      const [fh5, images] = await Promise.all([
        await db.carFH5.where('id').equals(carID!).first(),
        await db.carImage.where('id').equals(carID!).first(),
      ]);
      // const fh5 = await db.carFH5.where('id').equals(carID!).first();
      // const images = await db.carImage.where('id').equals(carID!).first();

      // console.log(`fh5 : ${JSON.stringify(fh5)}`);
      const { id, ...resFH5 } = fh5!;
      const { id: _, ...resImage } = images!;
      const joined = { ...res, fh5: { ...resFH5 }, image: { ...resImage } };
      return joined;
    }),
  );
  // console.log(`results : ${JSON.stringify(results)}`);
  return results;
}

function useCarSearchFilters(): [CarSearchOptions, CarInfo[], Actions] {
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

  console.log(`searchResults : ${JSON.stringify(searchResults)}`);

  const setOption = (name: string[], option: CarSearchOption) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [...name].toSorted(),
      };
    });
  };

  return [carSearchOptions, searchResults || [], { setOption }];
}

export default useCarSearchFilters;
