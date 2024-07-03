import { atomFamily, useRecoilState } from 'recoil';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/db';
import type {
  Car,
  Car2,
  CarImage,
  CarImage2,
  FH5_META,
  FH5_Performance,
  FH5_STAT,
  Manufacturer,
  Nation,
} from '@/db/schema';
import type { CarImageBase } from '@/db/schema/carImage';
import type { FH5_META_BASE, FH5_Performance_BASE } from '@/db/schema/fh5';
import type { ManufacturerBase } from '@/db/schema/manufacturer';
import type { CarImages, CarInfo, FH5_info } from '@/types';
import { CarInfo2 } from '@/types/car';

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

type CarSearchOptions = {
  division: string[];
  productionYear: string[];
  manufacturer: Manufacturer[];
  boost: string[];
  country: Nation[];
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
    setNationOption: (nations: Nation[]) => void;
    setManufacturerOption: (manufacturers: Manufacturer[]) => void;
  };
};

interface GetCarDataIntf {
  division: string[];
  productionYear: string[];
  manufacturer: Manufacturer[];
  boost: string[];
  country: Nation[];
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
    const joined = { id: carID!, ...res, fh5: { ...resFH5 }, image: { ...resImage } };
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

function zipCar2(
  cars: Car2[],
  manufacturers: Manufacturer[],
  nations: Nation[],
  images: CarImage2[],
  car_fh5_meta: FH5_META[],
  car_fh5_perf: FH5_Performance[],
): CarInfo2[] {
  // Create an array of tuples
  const vals = [];
  const len = cars.length;
  let cnt = 0;
  while (cnt < len) {
    const { id: carID, ...res } = cars[cnt];
    const { id: ___, ...resImage } = images[cnt];
    const { id: ____, ...carFH5meta } = car_fh5_meta[cnt];
    const { id: _____, ...carFH5perf } = car_fh5_perf[cnt];
    const joined = {
      id: carID!,
      ...res,
      manufacturer: manufacturers[cnt],
      nation: nations[cnt],
      image: { ...resImage },
      fh5_meta: { ...carFH5meta },
      fh5_perf: { ...carFH5perf },
    };
    vals.push(joined);
    cnt++;
  }
  return vals;
}

export async function getCarData2({
  division,
  productionYear,
  manufacturer,
  boost,
  country,
  rarity,
}: GetCarDataIntf): Promise<CarInfo2[]> {
  const man = manufacturer.length > 0;
  const con = country.length > 0;
  const years = productionYear.length > 0;
  const div = division.length > 0;
  const boo = boost.length > 0;
  const rar = rarity.length > 0;

  // 옵션 선택 없는 경우 전체 반환
  if (![man, con, years, div, boo, rar].some((x) => x)) {
    const pks = await db.car2.limit(50).primaryKeys();
    const cars = await db.car2.bulkGet(pks);
    const carManufacturers = cars.map((car) => car?.manufacturer); // manufacturer ID
    const carNations = cars.map((car) => car?.nation); // nation ID
    console.log(`nations : ${JSON.stringify(carNations)}`);
    const [mans, nations, images, car_fh5_meta, car_fh5_perf] = await Promise.all([
      db.manufacturer.bulkGet(carManufacturers),
      db.nation.bulkGet(carNations),
      db.carImage2.bulkGet(pks),
      db.car_FH5_meta.bulkGet(pks),
      db.car_FH5_performance.bulkGet(pks),
    ]);

    return zipCar2(
      cars as Car2[],
      mans as Manufacturer[],
      nations as Nation[],
      images as CarImage2[],
      car_fh5_meta as FH5_META[],
      car_fh5_perf as FH5_Performance[],
    );
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
    if (man) {
      const manIDs = manufacturer.map((manufacturer) => manufacturer.id);
      console.log(`manIDs : ${JSON.stringify(manIDs)}`);
      carSearchQueries.push(db.car2.where('manufacturer').anyOfIgnoreCase(manIDs).primaryKeys());
    }
    if (con) {
      // console.log(`country : ${JSON.stringify(country)}`);
      const nationIDs = country.map((country) => {
        // console.log(`country.id : ${country.id}`);
        return country.id;
      });
      // console.log(`nationIDs : ${JSON.stringify(nationIDs)}`);
      carSearchQueries.push(db.car2.where('nation').anyOfIgnoreCase(nationIDs).primaryKeys());
    }
    if (years) carSearchQueries.push(db.car2.where('productionYear').anyOf(pdYear).primaryKeys());
    console.log(`carSearchQueries len : ${JSON.stringify(carSearchQueries.length)}`);
    const pks = await Promise.all(carSearchQueries);
    // pks.map((ks) => console.log(`ks : ${ks}`));
    console.log(`pks : ${pks} `);
    const smallestArray = pks.reduce((a, b) => (a.length <= b.length ? a : b));
    const allKeys = smallestArray.filter((k) => pks.map((ks) => ks.includes(k)).every((x) => x));
    console.log(`allKeys : ${allKeys}`);
    searchResultKeys = [...allKeys];
  } else {
    searchResultKeys = await db.car2.offset(0).primaryKeys();
  }
  if (div || boo || rar) {
    const fh5_query = [];
    if (div)
      fh5_query.push(db.car_FH5_meta.where('division').anyOfIgnoreCase(division).primaryKeys());
    if (boo) fh5_query.push(db.car_FH5_meta.where('boost').anyOfIgnoreCase(boost).primaryKeys());
    if (rar) fh5_query.push(db.car_FH5_meta.where('rarity').anyOfIgnoreCase(rarity).primaryKeys());

    const pks2 = await Promise.all(fh5_query);
    const smallestArray2 = pks2.reduce((a, b) => (a.length <= b.length ? a : b));
    const allKeys2 = smallestArray2.filter((k) => pks2.map((ks) => ks.includes(k)).every((x) => x));
    // console.log(`allKeys2 : ${allKeys2}`);
    searchResultKeys = searchResultKeys.filter((x) => allKeys2.includes(x));
  }

  if (!(searchResultKeys.length > 0)) {
    return [];
  }
  const cars = await db.car2.bulkGet(searchResultKeys);
  const carManufacturers = cars.map((car) => car?.manufacturer); // manufacturer ID
  const carNations = cars.map((car) => car?.nation); // nation ID
  const [mans, nations, images, car_fh5_meta, car_fh5_perf] = await Promise.all([
    db.manufacturer.bulkGet(carManufacturers),
    db.nation.bulkGet(carNations),
    db.carImage2.bulkGet(searchResultKeys),
    db.car_FH5_meta.bulkGet(searchResultKeys),
    db.car_FH5_performance.bulkGet(searchResultKeys),
  ]);

  return zipCar2(
    cars as Car2[],
    mans as Manufacturer[],
    nations as Nation[],
    images as CarImage2[],
    car_fh5_meta as FH5_META[],
    car_fh5_perf as FH5_Performance[],
  );
}

function useCarSearchFilters(scope: string): [CarSearchOptions, CarInfo2[], boolean, Actions] {
  const [carSearchOptions, setCarSearchOptions] = useRecoilState(carSearchOptionStateFamily(scope));
  // const [carSearchOptions, setCarSearchOptions] = useRecoilState(carSearchOptionState);
  // console.log(`carSearchOptions : ${JSON.stringify(carSearchOptions)}`);
  const searchResults: CarInfo2[] | undefined = useLiveQuery(
    () => getCarData2(carSearchOptions),
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

  const setOption = (name: string[] | Nation[], option: CarSearchOption) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        [option]: [...name],
      };
    });
  };

  const setNationOption = (nations: Nation[]) => {
    setCarSearchOptions((curVal) => {
      return {
        ...curVal,
        country: [...nations],
      };
    });
  };

  const setManufacturerOption = (manufacturers: Manufacturer[]) => {
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
