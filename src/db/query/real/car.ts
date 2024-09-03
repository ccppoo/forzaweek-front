import { db } from '@/db/index';
import { Car } from '@/db/model/real';

export async function getAllCar(): Promise<Car[]> {
  const cars = await db.car.offset(0).toArray();
  return cars;
}

export async function getCar(carID: string): Promise<Car | undefined> {
  const car = await db.car.get(carID);
  if (!car) return undefined;
  return car;
}
