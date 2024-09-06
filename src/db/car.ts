import { db } from './index';

// export async function searchCar({ query }: { query: string }): Promise<CarInfoSimple[]> {
//   // const cars = await db.car2.toArray();
//   // car2: `&id, name_en,${i18nMapped('name').join(',')}, short_name_en, ${i18nMapped(
//   //   'short_name',
//   // ).join(',')}, productionYear, nation, manufacturer,door,engineType,bodyStyle`,
//   // const cars = (await db.car2.where('name_en').startsWithIgnoreCase(name).toArray()) || [];

//   // 1. manufacturer
//   // TODO: search manufacturer
//   // 2. name
//   const regex = new RegExp('^.*' + query + '.*$', 'i');
//   const cars = await db.car2.filter(({ name_en }) => regex.test(name_en)).toArray();

//   // const car_keys = Array.from(new Set(cars).union(new Set(carManufactures)));

//   const carInfoSimples = await Promise.all(
//     cars.map(async (car) => {
//       const manu = await db.manufacturer.get(car.manufacturer);
//       return { ...car, manufacturer: manu! };
//     }),
//   );

//   return carInfoSimples;
// }
