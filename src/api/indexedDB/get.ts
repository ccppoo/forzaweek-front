import axios from 'axios';

import { CarFH5, CarFH5Image } from '@/db/model/fh5';
import { RaceRouteFH5, RaceRouteFH5Image } from '@/db/model/fh5';
import { Car, Country, Manufacturer } from '@/db/model/real';
import { dbCollectionUpdate } from '@/db/query/update';

import { BASE_PATH_DB, JSONContentType } from './config';

interface GetIndexedDB {
  collection: string;
  path?: string;
}

type GetDBType<T> = {
  version: string; // string - 버전 이름
  lastUpdate: number; // timestamp
  data: T[];
};

async function updateIndexedDB<T>({ collection, path }: GetIndexedDB) {
  // const { table, path } = params;

  const path_ = !!path ? path : collection;
  const url = `${BASE_PATH_DB}/${path_}`;
  const { data } = await axios.get<GetDBType<T>>(url, {
    headers: {
      ...JSONContentType,
    },
  });

  const { version, lastUpdate, data: collectionData } = data;

  await dbCollectionUpdate<T>({
    collection,
    version: version,
    lastUpdate: lastUpdate,
    data: collectionData,
  });
  // await dbTableUpsert<T>({ table, ...data });
}

export const updateCountryDB = async () => updateIndexedDB<Country>({ collection: 'country' });

export const updateManufacturerDB = async () =>
  updateIndexedDB<Manufacturer>({ collection: 'manufacturer' });

export const updateCarDB = async () => updateIndexedDB<Car>({ collection: 'car' });

export const updateCar_FH5 = async () =>
  updateIndexedDB<CarFH5>({ collection: 'carFH5', path: 'FH5/car' });

export const updateCar_FH5_Image = async () =>
  updateIndexedDB<CarFH5Image>({
    collection: 'carFH5Image',
    path: 'FH5/car/image',
  });

export const updateRaceRoute_FH5 = async () =>
  updateIndexedDB<RaceRouteFH5>({ collection: 'raceRouteFH5', path: 'FH5/raceroute' });

export const updateRaceRouteImage_FH5 = async () =>
  updateIndexedDB<RaceRouteFH5Image>({
    collection: 'raceRouteFH5Image',
    path: 'FH5/raceroute/image',
  });
