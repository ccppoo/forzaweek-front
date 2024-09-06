import { db } from '@/db/index';
import { Car } from '@/db/model/real';
import { CarFullType } from '@/schema/real/types';

export async function getAllCar(): Promise<Car[]> {
  const cars = await db.car.offset(0).toArray();
  return cars;
}

export async function getCar(carID: string): Promise<Car | undefined> {
  const car = await db.car.get(carID);
  if (!car) return undefined;
  return car;
}

export async function getCarFull(carID: string): Promise<CarFullType | undefined> {
  const car = await db.car.get(carID);
  if (!car) return undefined;
  const { manufacturer: manufacturerID, ...realCarRes } = car;
  // console.log(`manufacturerID : ${manufacturerID}`);
  const manu = await db.manufacturer.get(manufacturerID);
  if (!manu) return undefined;

  const country = await db.country.get(manu.origin);
  if (!country) return undefined;
  const _manufacturerFull = {
    ...manu,
    origin: country,
  };
  // console.log(`_manufacturerFull : ${JSON.stringify(_manufacturerFull)}`);
  const _carFull = {
    ...realCarRes,
    manufacturer: _manufacturerFull,
  };
  return _carFull;
}
