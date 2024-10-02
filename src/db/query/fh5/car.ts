import { MANUFACTURER_ORDER } from '@/config/FH5/sort';
import { db } from '@/db/index';
import type { CarFH5, CarFH5Image } from '@/db/model/fh5';
import { Car } from '@/db/model/real';
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

export async function getCarFH5Images(carFH5ID: string): Promise<CarFH5Image | undefined> {
  const carFH5Image = await db.carFH5Image.get(carFH5ID);

  return carFH5Image;
}

export async function getCarFH5FullType(carFH5ID: string): Promise<CarFH5FullType | undefined> {
  /**
   * 차 정보 -> nation, manufacture ID말고 싹 다
   */
  // let carResult = {};
  // console.log(11111111111);
  if (!carFH5ID) console.log(`carFH5ID : ${carFH5ID}`);
  const carFH5 = await db.carFH5.get(carFH5ID);
  if (!carFH5) {
    console.log(`1111111111111`);
    return undefined;
  }

  // PI: number;
  // meta: FH5_Meta;
  // performance: FH5_Performance;

  // carResult = { ...carFH5 };
  // console.log(22222222222);
  const { baseCar: baseCarID, ...carFH5res } = carFH5;
  // console.log(`baseCarID  :${baseCarID}`);
  // if (!baseCarID) console.log(`baseCarID : ${baseCarID}`);
  const baseCar = await getCarRealFull(baseCarID);
  // const baseCar = await db.car.get(carFH5.baseCar);
  if (!baseCar) {
    console.log(`2222222222`);
    return undefined;
  }
  // const {name, ...baseCarInfo} = baseCar
  // carResult = { ...carFH5res, baseCar: baseCar };

  // manufacturer: string;
  // productionYear: number;
  // engineType: string;
  // bodyStyle: string[];
  // name: i18nArrayMap;
  // door: number;
  // if (!carFH5ID) console.log(`carFH5ID222 : ${carFH5ID}`);
  const carFH5_image = await db.carFH5Image.get(carFH5ID);
  if (!carFH5_image) return undefined;
  const _images = carFH5_image?.imageURLs;
  // imageURLs: string[];
  // console.log(`_images : ${JSON.stringify(_images)}`);
  // carResult = { ...carResult, imageURLs: _images } as CarFH5FullInput;
  const carResult = {
    ...carFH5res,
    baseCar: baseCar,
    imageURLs: _images,
  } as CarFH5FullType;
  // console.log(`carResult : ${JSON.stringify(carResult)}`);
  return carResult;
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

async function getCarFH5_IDs_By_baseCarIDs(realCarIDs: string[]): Promise<string[]> {
  const carFH5PKs = await db.carFH5.where('baseCar').anyOf(realCarIDs).primaryKeys();
  return carFH5PKs;
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

interface GetCarFH5_FH5_Traits {
  division: string[];
  boost: string[];
  rarity: string[];
}

interface GetCarFH5_RealCar_Traits {
  manufacturer: string[];
  country: string[];
}

interface GetCarDataIntf extends GetCarFH5_FH5_Traits, GetCarFH5_RealCar_Traits {
  productionYear: string[];
}

async function filterByCountryManufacturer({
  country,
  manufacturer,
}: GetCarFH5_RealCar_Traits): Promise<string[]> {
  /**
   *
   * @returns Manufacturer IDs
   */

  if (manufacturer.length && country.length) {
    const manufactures = (await db.manufacturer.bulkGet(manufacturer)).filter((x) => !!x);
    return manufactures
      .filter(({ origin }) => origin && country.includes(origin))
      .map(({ id }) => id);
  }

  if (manufacturer.length) {
    return manufacturer;
  }

  if (country.length) {
    const a = await db.manufacturer.where('origin').anyOf(country).primaryKeys();
    console.log(`a  :${a}`);
    return a;
    // return await db.manufacturer.where('origin').anyOf(country).primaryKeys();
  }

  return await db.manufacturer.offset(0).primaryKeys();
}

async function filterByFH5Traits({
  division,
  boost,
  rarity,
}: GetCarFH5_FH5_Traits): Promise<string[]> {
  /**
   *
   * @returns 필터링 된 CarFH5 ID Array 반환
   */

  if (!(division.length || boost.length || rarity.length)) {
    return await db.carFH5.offset(0).primaryKeys();
  }

  const divisionFiltered: string[] | undefined =
    division.length > 0
      ? await db.carFH5.where('meta.division').anyOf(division).primaryKeys()
      : undefined;
  const boostFiltered: string[] | undefined =
    boost.length > 0
      ? await db.carFH5.where('meta.boost').anyOfIgnoreCase(boost).primaryKeys()
      : undefined;
  const rarityFiltered: string[] | undefined =
    rarity.length > 0
      ? await db.carFH5.where('meta.rarity').anyOf(rarity).primaryKeys()
      : undefined;

  const carFH5IDs = [divisionFiltered, boostFiltered, rarityFiltered]
    .filter((x) => x != undefined)
    .toSorted((a, b) => a.length - b.length);

  if (carFH5IDs.length == 1) {
    return carFH5IDs[0];
  }

  const filteredCarFH5IDs = carFH5IDs[0].filter((carFH5ID) =>
    carFH5IDs.map((_carFH5IDs) => _carFH5IDs.includes(carFH5ID)).every((x) => !!x),
  );
  return filteredCarFH5IDs;
}

function filterDownIDs(prev: string[], newIDs: string[]): string[] {
  return prev.filter((prevID) => newIDs.includes(prevID));
}

type BaseCar = {
  manufacturer: string;
  baseCar: string;
};

type CarFH5TypeTemp = {
  id: string;
} & BaseCar;

async function getCarFH5Type(carFH5ID: string): Promise<CarFH5TypeTemp | undefined> {
  const carFH5 = await db.carFH5.get(carFH5ID);
  if (!carFH5) return undefined;
  const baseCar = (await db.car.get(carFH5.baseCar))!;
  return {
    id: carFH5ID,
    baseCar: baseCar.id!,
    manufacturer: baseCar.manufacturer!,
  };
}

export async function groupByManufacturer(carFH5IDs: string[]) {
  // NOTE: CarFH5 순서보다 일단 제조사 순서에 따라 정렬 후 필요한 개수만큼 반환한다.
  /**
   * 1. CarFH5 ID string[] 받는다
   * 2. Manufacturer ID를 찾고, Manufacturer ID가 Key + string[] ID 인 오브젝트에 넣는다.
   * 3. Manufacturer ID 순서가 저장된 거에 따라 fetch할 개수만큼 계속 빼온다.
   * 4.
   */
  const carFH5s = (await db.carFH5.bulkGet(carFH5IDs)).filter((x) => !!x);
  const manuCars = await Promise.all(
    carFH5s.map(async ({ id, baseCar }) => {
      const car = (await db.car.get(baseCar))!;
      return [car.manufacturer, id];
    }),
  );
  const manu_carFH5 = manuCars.reduce(
    (prev, [manu, carFH5ID]) => {
      !!prev[manu] ? (prev[manu] = [carFH5ID, ...prev[manu]]) : (prev[manu] = [carFH5ID]);
      return prev;
    },
    {} as { [key: string]: string[] },
  );
  return manu_carFH5;
}

// NOTE: 이거는 여러 조건 속에서 차 검색하고 결과 반환하는 것
export async function searchCarByFilter({
  division,
  productionYear,
  manufacturer,
  boost,
  country,
  rarity,
}: GetCarDataIntf): Promise<string[]> {
  /**
   * @returns 필터링 된 자동차 ID Array 반환
   */

  const _productionYears = productionYear
    .map((pyear) => {
      const startYear = parseInt(pyear.replace('s', ''));
      return [...range(startYear, startYear + 10)];
    })
    .flatMap((x) => x);

  const cond1 = country.length || manufacturer.length; // 제조사
  const cond2 = _productionYears.length; // base car
  const cond3 = division.length || boost.length || rarity.length; // car FH5

  if (cond1) {
    const manuIDs = await filterByCountryManufacturer({ country, manufacturer });
    console.log(`manuIDs : ${JSON.stringify(manuIDs)}`);

    if (!cond2 && !cond3) {
      const baseCarIDs = await db.car.where('manufacturer').anyOf(manuIDs).primaryKeys();
      const carFH5IDs = await db.carFH5.where('baseCar').anyOf(baseCarIDs).primaryKeys();
      return carFH5IDs;
    }
    if (cond2 && !cond3) {
      const baseCarIDs: string[] = await db.car
        .where('productionYear')
        .anyOf(_productionYears)
        .and((car) => manuIDs.includes(car.manufacturer))
        .primaryKeys();
      const carFH5IDs = await db.carFH5.where('baseCar').anyOf(baseCarIDs).primaryKeys();
      return carFH5IDs;
    }
    if (!cond2 && cond3) {
      const _carFH5IDs = await filterByFH5Traits({ division, boost, rarity });

      const baseCarIDs = await db.car.where('manufacturer').anyOf(manuIDs).primaryKeys();

      const carFH5IDs = await db.carFH5
        .where('baseCar')
        .anyOf(baseCarIDs)
        .and((carFH5) => _carFH5IDs.includes(carFH5.id))
        .primaryKeys();
      return carFH5IDs;
    }
    if (cond2 && cond3) {
      const baseCarIDs: string[] = await db.car
        .where('productionYear')
        .anyOf(_productionYears)
        .and((car) => manuIDs.includes(car.manufacturer))
        .primaryKeys();
      const carFH5IDs = await db.carFH5.where('baseCar').anyOf(baseCarIDs).primaryKeys();
      const _carFH5IDs = await filterByFH5Traits({ division, boost, rarity });
      return carFH5IDs.filter((carFH5ID) => _carFH5IDs.includes(carFH5ID));
    }
  }

  if (!cond1 && cond2) {
    const baseCarIDs: string[] = await db.car
      .where('productionYear')
      .anyOf(_productionYears)
      .primaryKeys();
    if (!cond3) {
      const carFH5IDs = await db.carFH5.where('baseCar').anyOf(baseCarIDs).primaryKeys();
      return carFH5IDs;
    }
    if (cond3) {
      const carFH5IDs = await db.carFH5.where('baseCar').anyOf(baseCarIDs).primaryKeys();
      const _carFH5IDs = await filterByFH5Traits({ division, boost, rarity });
      return carFH5IDs.filter((carFH5ID) => _carFH5IDs.includes(carFH5ID));
    }
  }
  if (!cond1 && !cond2 && cond3) {
    return await filterByFH5Traits({ division, boost, rarity });
  }

  // !cond1 && !cond2 && !cond3

  const first30 = await db.carFH5.offset(0).limit(30).primaryKeys();
  return first30;
}
