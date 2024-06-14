import axios from 'axios';

import type { ManufacturerEditSchema } from '@/FormData/manufacturer';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

type YYYY_MM_DD = string;

type DailyThemeID = string;
type NationName = string;

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

type GetManufacturer = {
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
  // const params = `date=${_date}&segment=${segment}`;
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

  console.log(`data : ${JSON.stringify(data)}`);

  const a = {
    id: '666be9211cd10aafae87323a',
    origin: '6669647c5e6b6310989810d0',
    i18n: [
      { value: 'Ford', lang: 'en' },
      { value: '포드', lang: 'ko' },
    ],
    name_en: 'Ford',
    imageURL: 'https://fzwcdn.forzaweek.com/manufacturer/Ford_logo.webp',
  };

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

//  "https://fzwcdn.forzaweek.com/nation/Korea_flag.svg"
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

export async function DeleteManufacturer({ documentID }: { documentID: string }) {
  // const [documentID] = documentID;

  const path_ = `nation`;

  const url = `${API_HOST}/${path_}/${documentID}`;

  const resp = await axios.delete(url);

  return resp.data;
}
