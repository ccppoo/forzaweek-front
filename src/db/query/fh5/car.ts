import { Collection, Table } from 'dexie';

import { db } from '@/db/index';
import type { CarFH5, CarFH5Image } from '@/db/model/fh5';
import { Car } from '@/db/model/real';
import { getCar } from '@/db/query/real/car';
import { getCarFull as getCarRealFull } from '@/db/query/real/car';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import { CarFH5Input, CarFH5Type } from '@/schema/fh5/types';
import { CarFullType } from '@/schema/real/types';
import { range } from '@/utils/index';

function removeUndefined<T>(items: (T | undefined)[]): T[] {
  return items.filter((item) => item != undefined);
}

export async function getAllCar(): Promise<Car[]> {
  const cars = await db.car.offset(0).toArray();
  return cars;
}

export async function getCarFH5(carFH5ID: string | undefined): Promise<CarFH5Type | undefined> {
  if (!carFH5ID) return undefined;
  let carResult = {};

  const carFH5 = await db.carFH5.get(carFH5ID);
  if (!carFH5) return undefined;

  const carFH5Image = await db.carFH5Image.get(carFH5ID);
  if (!carFH5Image) return undefined;
  // const {} = carFH5;
  // carResult = { ...carResult, ...carFH5 };
  const baseCar = await db.car.get(carFH5.baseCar);
  if (!baseCar) return undefined;

  const manu = await db.manufacturer.get(baseCar.manufacturer);
  if (!manu) return undefined;

  const carResult2 = {
    ...carFH5,
    imageURLs: carFH5Image.imageURLs,
    // baseCar: { ...baseCar, manufacturer: manu },
  };
  return carResult2 as CarFH5Type;

  // carResult = { ...carResult, ...manu } as unknown as CarFH5FullInput;

  // return carResult as CarFH5FullType;
}

export async function getCarFH5FullType(carFH5ID: string): Promise<CarFH5FullType | undefined> {
  /**
   * 차 정보 -> nation, manufacture ID말고 싹 다
   */
  let carResult = {};
  // console.log(11111111111);
  const carFH5 = await db.carFH5.get(carFH5ID);
  if (!carFH5) return undefined;

  // PI: number;
  // meta: FH5_Meta;
  // performance: FH5_Performance;

  // carResult = { ...carFH5 };
  // console.log(22222222222);
  const { baseCar: _, ...carFH5res } = carFH5;
  const baseCar = await getCarRealFull(carFH5.baseCar);
  // const baseCar = await db.car.get(carFH5.baseCar);
  if (!baseCar) return undefined;
  // const {name, ...baseCarInfo} = baseCar
  carResult = { ...carFH5res, baseCar: baseCar };

  // manufacturer: string;
  // productionYear: number;
  // engineType: string;
  // bodyStyle: string[];
  // name: i18nArrayMap;
  // door: number;
  const carFH5_image = await db.carFH5Image.get(carFH5ID);
  const _images = carFH5_image?.imageURLs || [];
  // imageURLs: string[];
  carResult = { ...carResult, imageURLs: _images } as CarFH5FullInput;
  return carResult as CarFH5FullType;
}

// getCarFH5_By_baseCarID
export async function getCarFH5s_By_baseCarID(
  baseCarID: string | undefined,
): Promise<CarFH5FullType[]> {
  if (!baseCarID) return [];
  let carResult = {};

  const carFH5PKs = await db.carFH5.where('baseCar').equals(baseCarID).primaryKeys();
  if (!(carFH5PKs.length > 0)) return [];
  // const {} = baseCar;
  // carResult = { ...carResult, ...carFH5 };

  // getCarFH5
  const carFH5s = await Promise.all(carFH5PKs.map((carFH5PK) => getCarFH5FullType(carFH5PK)));
  return removeUndefined(carFH5s);
}

export async function searchCarByName({ query }: { query: string }): Promise<CarFH5FullType[]> {
  /**
   * 문자열로 검색해서 검색한 차 반환하는 쿼리
   */
  // const cars = await db.car2.toArray();
  // car2: `&id, name_en,${i18nMapped('name').join(',')}, short_name_en, ${i18nMapped(
  //   'short_name',
  // ).join(',')}, productionYear, nation, manufacturer,door,engineType,bodyStyle`,
  // const cars = (await db.car2.where('name_en').startsWithIgnoreCase(name).toArray()) || [];

  // 1. manufacturer
  // TODO: search manufacturer
  // 2. name
  const regex = new RegExp('^.*' + query + '.*$', 'i');
  const baseCarIDs = await db.car
    .filter(({ name: { en: enNames } }) => enNames.map((en) => regex.test(en)).some((x) => !!x))
    .primaryKeys();

  // const car_keys = Array.from(new Set(cars).union(new Set(carManufactures)));

  const _carFH5FullTypes = await Promise.all(
    baseCarIDs.map(
      (baseCarID) => getCarFH5s_By_baseCarID(baseCarID),
      // async (baseCarID) => {
      // const manu = await db.manufacturer.get(car.manufacturer);
      // return { ...car, manufacturer: manu! };
    ),
  );
  const carFH5FullTypes = _carFH5FullTypes
    .flatMap((x) => x)
    .filter((carFH5FullType) => carFH5FullType != undefined);
  return carFH5FullTypes;
  // const carFH5FullTypes = _carFH5FullTypes.filter((carFH5FullType) => carFH5FullType != undefined);
}

export async function getCarFH5Image(carFH5ID: string): Promise<CarFH5Image | undefined> {
  /**
   * 문자열로 검색해서 검색한 차 반환하는 쿼리
   */
  const carFH5_image = await db.carFH5Image.get(carFH5ID);
  return carFH5_image;
}

export async function getCarBaseFromCarFH5ID(carFH5ID: string): Promise<CarFullType | undefined> {
  const carFH5 = await db.carFH5.get(carFH5ID);
  if (!carFH5) return undefined;

  await db.car.get(carFH5.baseCar);
}

interface GetCarDataIntf {
  division: string[];
  productionYear: string[];
  manufacturer: string[];
  boost: string[];
  country: string[];
  rarity: string[];
}

// NOTE: 이거는 여러 조건 속에서 차 검색하고 결과 반환하는 것
export async function searchCarByFilter({
  division,
  productionYear,
  manufacturer,
  boost,
  country,
  rarity,
  // }: GetCarDataIntf) {
}: GetCarDataIntf): Promise<CarFH5FullType[]> {
  const man = manufacturer.length > 0;
  const con = country.length > 0;
  // console.log(`productionYear ;${productionYear}`);

  const _productionYears = productionYear
    .map((pyear) => {
      const startYear = parseInt(pyear.replace('s', ''));
      return [...range(startYear, startYear + 10)];
    })
    .flatMap((x) => x);
  const years = _productionYears.length > 0;
  const div = division.length > 0;
  const boo = boost.length > 0;
  const rar = rarity.length > 0;

  const anySearchCondition = man || con || years || div || boo || rar;

  if (!anySearchCondition) {
    // 검색 조건이  없는 경우
    const first10 = await db.carFH5.offset(0).limit(10).primaryKeys();
    const carFH5s = await Promise.all(first10.map((carFH5ID) => getCarFH5FullType(carFH5ID)));
    return removeUndefined(carFH5s);
  }

  // 1. 실제 특성만으로 분류

  let manu_query: any = db.manufacturer;
  let carManus: string[] = []; // manu IDs
  if (con && !man) {
    carManus = await db.manufacturer.where('origin').anyOf(country).primaryKeys();
    if (man) {
      carManus = carManus.filter((manuID) => manufacturer.includes(manuID));
    }
  } else if (!con && man) {
    carManus = manufacturer;
  }

  let carReals: string[] = [];
  if (years && (man || con)) {
    carReals = await db.car
      .where('productionYear')
      .anyOf(_productionYears)
      .filter((carReal) => carManus.includes(carReal.manufacturer))
      .primaryKeys();
  }
  if (years && !(man || con)) {
    carReals = await db.car.where('productionYear').anyOf(_productionYears).primaryKeys();
  }

  // 2. 게임 특성만으로 분류

  let PK_carFH5: string[] = [];

  let carFH5_query: any = db.carFH5;

  if (div) {
    // db.carFH5.where('meta.division').anyOf(division).and((carFH5)=>!!carFH5.meta.boost).pr
    carFH5_query = carFH5_query.where('meta.division').anyOf(division);
  }
  if (boo) {
    if (div) {
      carFH5_query = carFH5_query.and((carFH5: CarFH5) =>
        boost.includes(carFH5.meta.boost.toUpperCase()),
      );
    } else {
      carFH5_query = carFH5_query.where('meta.boost').anyOfIgnoreCase(boost);
    }
  }
  if (rar) {
    if (div || boo) {
      carFH5_query = carFH5_query.and((carFH5: CarFH5) => rarity.includes(carFH5.meta.rarity));
    } else {
      carFH5_query = carFH5_query.where('meta.rarity').anyOf(rarity);
    }
  }
  if (div || boo || rar) {
    PK_carFH5 = await carFH5_query.primaryKeys();
  }

  // 3. 최종 분류
  // carManus;
  // carReals; // 이게 있으면 carManus를 거르고 이걸 최종적으로 사용함
  // PK_carFH5; //

  if (carReals.length > 0) {
    if (PK_carFH5.length > 0) {
      const carFH5IDs = await db.carFH5.where('baseCar').anyOf(carReals).primaryKeys();
      const carFH5s = await Promise.all(carFH5IDs.map((carFH5ID) => getCarFH5FullType(carFH5ID)));
      return removeUndefined(carFH5s);
    }
    const carFH5s = await Promise.all(
      carReals.map((carRealID) => getCarFH5s_By_baseCarID(carRealID)),
    );
    const _carFH5s = carFH5s.flatMap((x) => x);
    return removeUndefined(_carFH5s);
  }

  if (carManus.length > 0) {
    if (PK_carFH5.length > 0) {
      let carFH5s = await db.carFH5.bulkGet(PK_carFH5);
      carFH5s = removeUndefined(carFH5s);
      // const baseCars = carFH5s.map((carFH5)=>carFH5?.baseCar )
      const carIDsMatchingManu = await db.car.where('manufacturer').anyOf(carManus).primaryKeys();
      const carFH5sFilteredID = carFH5s
        .filter((carFH5) => carFH5 && carIDsMatchingManu.includes(carFH5?.baseCar))
        .map((carFH5) => carFH5!!.id);
      return removeUndefined(
        await Promise.all(carFH5sFilteredID.map((carFH5ID) => getCarFH5FullType(carFH5ID))),
      );
    }
    const carIDsMatchingManu = await db.car.where('manufacturer').anyOf(carManus).primaryKeys();
    // console.log(`carIDsMatchingManu : ${JSON.stringify(carIDsMatchingManu)}`);
    const _carFH5s = await Promise.all(
      carIDsMatchingManu.map((carID) => getCarFH5s_By_baseCarID(carID)),
    );
    const _carFH5s2 = _carFH5s.flatMap((x) => x);

    return removeUndefined(_carFH5s2);
  }

  if (PK_carFH5.length > 0) {
    return removeUndefined(
      await Promise.all(PK_carFH5.map((carFH5ID) => getCarFH5FullType(carFH5ID))),
    );
  }
  if (anySearchCondition) {
    return [];
  }
  // 검색 조건에 일치하는게 아무것도 없는 경우
  return [];
}
