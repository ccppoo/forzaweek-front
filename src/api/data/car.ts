import axios from 'axios';

import type { CarEditSchema, CarSchemaType } from '@/FormData/car';
import { UploadImage } from '@/api/data/image';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

type GetCar = {
  id: string;
  name_en: string;
  founded: number;
  imageURL: string;
};

export async function AddNewCar({ car }: { car: CarEditSchema }) {
  const { value: name_en } = car.name.filter((i18n) => i18n.lang == 'en')[0];
  const { value: name_short_en } = car.short_name.filter((i18n) => i18n.lang == 'en')[0];

  // 1. blob으로 추가된 사진은 서버로 보내서 URL 받아오기
  const firstImageIdx = car.firstImage ? car.imageURLs.indexOf(car.firstImage) : 0;
  const imageUrls = await Promise.all(
    car.imageURLs.map(async (img) => {
      if (img.startsWith('blob')) {
        return await UploadImage({ folder: 'car', fileBlobURL: img });
      }
      return img;
    }),
  );

  car.imageURLs = imageUrls;
  car.firstImage = imageUrls[firstImageIdx];

  const data = {
    ...car,
    name_en: name_en,
    short_name_en: name_short_en,
  };

  // console.log(`처리된 data : ${JSON.stringify(data)}`);

  const path_ = `car`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return { code: resp.status, msg: resp.statusText };
}

export async function EditCar({ car }: { car: CarEditSchema }) {
  const NAME_EN = car.name.filter((i18n) => i18n.lang == 'en')[0].value;
  const SHORT_NAME_EN = car.short_name.filter((i18n) => i18n.lang == 'en')[0].value;
  const { id: docID } = car;

  const data = {
    ...car,
    name_en: NAME_EN,
    short_name_en: SHORT_NAME_EN,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `car/edit/${docID}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
  return { code: resp.status, msg: resp.statusText };
}

// TODO: pagination
export async function GetAllCar({ queryKey }: { queryKey: [API_NAME] }): Promise<CarSchemaType[]> {
  const [_] = queryKey;

  const path_ = `car`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function GetCar({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<CarSchemaType[]> {
  const [_, game_scope] = queryKey;

  const path_ = `car`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
