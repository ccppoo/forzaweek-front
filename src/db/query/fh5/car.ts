import { db } from '@/db/index';
import type { CarFH5Image } from '@/db/model/fh5';
import { Car } from '@/db/model/real';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import { CarFH5Input, CarFH5Type } from '@/schema/fh5/types';

export async function getAllCar(): Promise<Car[]> {
  const cars = await db.car.offset(0).toArray();
  return cars;
}

export async function getCarFH5(carFH5ID: string | undefined): Promise<CarFH5FullType | undefined> {
  if (!carFH5ID) return undefined;
  let carResult = {};

  const carFH5 = await db.carFH5.get(carFH5ID);
  if (!carFH5) return undefined;
  const {} = carFH5;
  carResult = { ...carResult, ...carFH5 };

  const baseCar = await db.car.get(carFH5.baseCar);
  if (!baseCar) return undefined;
  carResult = { ...carResult, ...baseCar };

  const manu = await db.manufacturer.get(baseCar.manufacturer);
  if (!manu) return undefined;

  carResult = { ...carResult, ...manu } as unknown as CarFH5FullInput;

  return carResult as CarFH5FullType;
}

export async function getCarFH5FullType(carFH5ID: string): Promise<CarFH5FullType | undefined> {
  /**
   * 차 정보 -> nation, manufacture ID말고 싹 다
   */
  let carResult = {};

  const carFH5 = await db.carFH5.get(carFH5ID);
  if (!carFH5) return undefined;

  // PI: number;
  // meta: FH5_Meta;
  // performance: FH5_Performance;

  carResult = { ...carResult, fh5: carFH5 };

  const baseCar = await db.car.get(carFH5.baseCar);
  if (!baseCar) return undefined;

  // const {name, ...baseCarInfo} = baseCar
  carResult = { ...carResult, ...baseCar };

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

export async function getCarFH5_By_baseCarID(
  baseCarID: string | undefined,
): Promise<CarFH5FullType | undefined> {
  if (!baseCarID) return undefined;
  let carResult = {};

  const carFH5 = await db.carFH5.where('baseCar').equals(baseCarID);
  if (!carFH5) return undefined;
  // const {} = baseCar;
  carResult = { ...carResult, ...carFH5 };

  const baseCar = await db.car.get(baseCarID);
  if (!baseCar) return undefined;
  carResult = { ...carResult, ...baseCar };

  const manu = await db.manufacturer.get(baseCar.manufacturer);
  if (!manu) return undefined;

  carResult = { ...carResult, ...manu } as unknown as CarFH5FullInput;

  return carResult as CarFH5FullType;
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
      (baseCarID) => getCarFH5_By_baseCarID(baseCarID),
      // async (baseCarID) => {
      // const manu = await db.manufacturer.get(car.manufacturer);
      // return { ...car, manufacturer: manu! };
    ),
  );
  const carFH5FullTypes = _carFH5FullTypes.filter((carFH5FullType) => carFH5FullType != undefined);
  return carFH5FullTypes;
}

export async function getCarFH5Image(carFH5ID: string): Promise<CarFH5Image | undefined> {
  /**
   * 문자열로 검색해서 검색한 차 반환하는 쿼리
   */
  const carFH5_image = await db.carFH5Image.get(carFH5ID);
  return carFH5_image;
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

interface GetCarDataIntf {
  division: string[];
  productionYear: string[];
  manufacturer: string[];
  boost: string[];
  country: string[];
  rarity: string[];
}

// NOTE: 이거는 여러 조건 속에서 차 검색하고 결과 반환하는 것
export async function getCarData2({
  division,
  productionYear,
  manufacturer,
  boost,
  country,
  rarity,
}: GetCarDataIntf) {
  // }: GetCarDataIntf): Promise<CarInfo2[]> {
  const man = manufacturer.length > 0;
  const con = country.length > 0;
  const years = productionYear.length > 0;
  const div = division.length > 0;
  const boo = boost.length > 0;
  const rar = rarity.length > 0;

  // 옵션 선택 없는 경우 전체 반환
  if (man) {
    const carManu = await db.car.bulkGet(manufacturer);
  }
  if (![man, con, years, div, boo, rar].some((x) => x)) {
    const pks = await db.car2.limit(50).primaryKeys();
    const cars = await db.car2.bulkGet(pks);
    const carManufacturers = cars.map((car) => car?.manufacturer); // manufacturer ID
    const carNations = cars.map((car) => car?.nation); // nation ID
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
