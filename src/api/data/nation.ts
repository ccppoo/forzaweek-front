import axios from 'axios';

import type { NationEditSchema } from '@/FormData/nation';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

type NationLang = {
  value: string;
  lang: string;
};

type GetNation = {
  id: string;
  i18n: NationLang[];
  name_en: string;
  imageURL: string;
};

export async function AddNewNation({ nation }: { nation: NationEditSchema }) {
  // }): Promise<DailyTheme> {
  // console.log(`nation : ${JSON.stringify(nation)}`);

  const valueGivenI18n = nation.i18n.filter((i18n) => !!i18n.value);
  const valueGivenLang = valueGivenI18n.map((i18n) => i18n.lang);
  const values = { ...nation, langs: [...valueGivenLang], i18n: [...valueGivenI18n] };
  // console.log(`values : ${JSON.stringify(values)}`);
  const enDefault = valueGivenI18n.filter((i18n) => i18n.lang == 'en')[0];
  const data = {
    i18n: valueGivenI18n.map((i18n) => {
      return { value: i18n.value, lang: i18n.lang };
    }),
    name_en: enDefault.value,
    imageURL: nation.imageURL,
  };

  // console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `nation`;
  // const params = `date=${_date}&segment=${segment}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // console.log(`resp.data : ${JSON.stringify(resp.data)}`);
  // const resp = await axios.get<JandiCommitDayOfWeekStatResponse>(url, { headers: { ...AuthHeaders(token) } });

  // return resp.data;
}

export async function EditNation({ nation }: { nation: NationEditSchema }) {
  const enDefault = nation.i18n.filter((i18n) => i18n.lang == 'en')[0];
  const data = {
    id: nation.id,
    i18n: nation.i18n.map((i18n) => {
      return { value: i18n.value, lang: i18n.lang };
    }),
    name_en: enDefault.value,
    imageURL: nation.imageURL,
  };

  // console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `nation/edit/${data.id}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}

export async function GetAllNation({ queryKey }: { queryKey: [API_NAME] }): Promise<GetNation[]> {
  const [_] = queryKey;

  const path_ = `nation`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function DeleteNation({ documentID }: { documentID: string }) {
  // const [documentID] = documentID;

  const path_ = `nation`;

  const url = `${API_HOST}/${path_}/${documentID}`;

  const resp = await axios.delete(url);

  return resp.data;
}
