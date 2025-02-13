import axios from 'axios';

import type { ManufacturerEditSchema } from '@/FormData/manufacturer';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

type ManufacturerLang = {
  value: string;
  lang: string;
};

type NationLang = {
  value: string;
  lang: string;
};

type GetNation = {
  i18n: NationLang[];
  name_en: string;
  imageURL: string;
};

export type GetManufacturer = {
  id: string;
  i18n: ManufacturerLang[];
  name_en: string;
  founded: number;
  origin: GetNation;
  imageURL: string;
};

export async function AddNewManufacturer({
  manufacturer,
}: {
  manufacturer: ManufacturerEditSchema;
}) {
  const valueGivenI18n = manufacturer.i18n.filter((i18n) => !!i18n.value);
  const valueGivenLang = valueGivenI18n.map((i18n) => i18n.lang);
  const values = { ...manufacturer, langs: [...valueGivenLang], i18n: [...valueGivenI18n] };
  const enDefault = valueGivenI18n.filter((i18n) => i18n.lang == 'en')[0];

  const data = {
    i18n: valueGivenI18n.map((i18n) => {
      return { value: i18n.value, lang: i18n.lang };
    }),
    origin: manufacturer.origin,
    name_en: enDefault.value,
    founded: manufacturer.founded,
    imageURL: manufacturer.imageURL,
  };

  // console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `manufacturer`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function EditManufacturer({ manufacturer }: { manufacturer: ManufacturerEditSchema }) {
  const enDefault = manufacturer.i18n.filter((i18n) => i18n.lang == 'en')[0];
  const data = {
    id: manufacturer.id,
    i18n: manufacturer.i18n.map((i18n) => {
      return { value: i18n.value, lang: i18n.lang };
    }),
    origin: manufacturer.origin,
    founded: manufacturer.founded,
    name_en: enDefault.value,
    imageURL: manufacturer.imageURL,
  };

  // console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `manufacturer/edit/${data.id}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}

export async function GetManufacturerEdit({
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

export async function GetAllManufacturer({
  queryKey,
}: {
  queryKey: [API_NAME];
}): Promise<GetManufacturer[]> {
  const [_] = queryKey;

  const path_ = `manufacturer`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
