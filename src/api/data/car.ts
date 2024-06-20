import axios from 'axios';

import type { CarEditSchema } from '@/FormData/car';
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
}

export async function EditCar({ car }: { car: CarEditSchema }) {
  const enDefault = car.name.filter((i18n) => i18n.lang == 'en')[0];
  // const data = {
  //   id: car.id,
  //   i18n: car.i18n.map((i18n) => {
  //     return { value: i18n.value, lang: i18n.lang };
  //   }),
  //   origin: car.origin,
  //   founded: car.founded,
  //   name_en: enDefault.value,
  //   imageURL: car.imageURL,
  // };

  // console.log(`data : ${JSON.stringify(data)}`);

  // const path_ = `manufacturer/edit/${data.id}`;
  // const url = `${API_HOST}/${path_}`;
  // const resp = await axios.post(url, data, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}

export async function GetCarEdit({
  queryKey,
}: {
  queryKey: [API_NAME, { dataType: string; itemID: string }];
}) {
  const [_, { itemID, dataType }] = queryKey;

  const path_ = `${dataType}/edit/${itemID}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url);

  return resp.data;
}

//  "https://fzwcdn.forzaweek.com/nation/Korea_flag.svg"
export async function GetAllCar({ queryKey }: { queryKey: [API_NAME] }): Promise<GetCar[]> {
  const [_] = queryKey;

  const path_ = `car`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function DeleteCar({ documentID }: { documentID: string }) {
  const path_ = `car`;

  const url = `${API_HOST}/${path_}/${documentID}`;

  const resp = await axios.delete(url);

  return resp.data;
}
