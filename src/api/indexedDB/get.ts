import axios from 'axios';

import type { CarEditSchema, CarSchemaType } from '@/FormData/car';
import { UploadImage } from '@/api/data/image';
import type { API_NAME } from '@/api/types';
import { CarFH5, CarFH5Image } from '@/db/model/fh5';
import { Car, Country, Manufacturer } from '@/db/model/real';
import { dbCollectionUpdate } from '@/db/query/update';
import { Car2, CarImage2, FH5_META, FH5_Performance, Track2, TrackImage } from '@/db/schema';

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

// export const updateCarImage = async () =>
//   updateIndexedDB<CarImage2>({ collection: 'carImage2', path: 'car2/image' });

export const updateCar_FH5 = async () =>
  updateIndexedDB<CarFH5>({ collection: 'carFH5', path: 'FH5/car' });

export const updateCar_FH5_Image = async () =>
  updateIndexedDB<CarFH5Image>({
    collection: 'carFH5Image',
    path: 'FH5/car/image',
  });

export const updateTrack = async () =>
  updateIndexedDB<Track2>({ collection: 'track2', path: 'track2' });

export const updateTrackImage = async () =>
  updateIndexedDB<TrackImage>({ collection: 'trackImage', path: 'track2/image' });
