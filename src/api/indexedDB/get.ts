import axios from 'axios';

import type { CarEditSchema, CarSchemaType } from '@/FormData/car';
import { UploadImage } from '@/api/data/image';
import { API_HOST } from '@/api/index';
import type { API_NAME } from '@/api/types';
import { dbTableUpsert } from '@/db/index';
import { Car2, CarImage2, FH5_META, FH5_Performance, Manufacturer, Nation } from '@/db/schema';

interface GetIndexedDB {
  table: string;
  path?: string;
}

type GetDBType<T> = {
  version: string; // string - 버전 이름
  lastUpdate: number; // timestamp
  data: T[];
};

async function updateIndexedDB<T>(params: GetIndexedDB) {
  const { table, path } = params;

  const path_ = !!path ? `db/${path}` : `db/${params.table}`;
  const url = `${API_HOST}/${path_}`;
  const { data } = await axios.get<GetDBType<T>>(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // const { version, lastUpdate, data: newTableData } = data;

  await dbTableUpsert<T>({ table, ...data });
}

export const updateNationDB = async () => updateIndexedDB<Nation>({ table: 'nation' });

export const updateManufacturerDB = async () =>
  updateIndexedDB<Manufacturer>({ table: 'manufacturer' });

export const updateCarDB = async () => updateIndexedDB<Car2>({ table: 'car2' });

export const updateCarImage = async () =>
  updateIndexedDB<CarImage2>({ table: 'carImage2', path: 'car2/image' });

export const updateCar_FH5_meta = async () =>
  updateIndexedDB<FH5_META>({ table: 'car_FH5_meta', path: 'car2/fh5/meta' });

export const updateCar_FH5_performance = async () =>
  updateIndexedDB<FH5_Performance>({ table: 'car_FH5_performance', path: 'car2/fh5/performance' });
