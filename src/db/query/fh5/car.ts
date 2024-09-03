import { db } from '@/db/index';
import { Car } from '@/db/model/real';

export async function getAllCar(): Promise<Car[]> {
  const cars = await db.car.offset(0).toArray();
  return cars;
}

export async function getCar(carFH5ID: string): Promise<Car | undefined> {
  const car = await db.carFH5.get(carFH5ID);
  if (!car) return undefined;
  return car;
}
