import axios from 'axios';

import type { NationEditSchema } from '@/FormData/nation';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

// import { dailyThemes } from './samples/dailyTheme';
// import type { DailyTheme } from './types';

type YYYY_MM_DD = string;

type DailyThemeID = string;
type NationName = string;

export async function AddNewNation({ nation }: { nation: NationEditSchema }) {
  // }): Promise<DailyTheme> {
  console.log(`nation : ${JSON.stringify(nation)}`);

  const valueGivenI18n = nation.i18n.filter((i18n) => !!i18n.value);
  const valueGivenLang = valueGivenI18n.map((i18n) => i18n.lang);
  const values = { ...nation, langs: [...valueGivenLang], i18n: [...valueGivenI18n] };
  console.log(`values : ${JSON.stringify(values)}`);

  const data = {
    name: valueGivenI18n.map((i18n) => {
      return { value: i18n.value, lang: i18n.lang.code, country: i18n.lang.country || null };
    }),
  };

  const formData = new FormData();
  formData.append('file', nation.flagImageURL!);
  formData.append('name', new Blob([JSON.stringify(data)], { type: 'application/json' }));
  // console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `nation/test`;
  // const params = `date=${_date}&segment=${segment}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);
  // const resp = await axios.get<JandiCommitDayOfWeekStatResponse>(url, { headers: { ...AuthHeaders(token) } });

  // return resp.data;
}

export async function UploadNationFlag({ fileBlobURL }: { fileBlobURL: string }) {
  const formData = new FormData();

  const response = await fetch(fileBlobURL);
  const imgFile = await response.blob();
  // URL.revokeObjectURL(fileBlobURL)
  formData.append('file', imgFile);

  const path_ = `nation/image`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(`resp.data : ${JSON.stringify(resp.data)}`);
}

export async function GetNation({
  queryKey,
  nation,
}: {
  queryKey: [API_NAME, YYYY_MM_DD, DailyThemeID];
  nation: NationEditSchema;
}) {
  // }): Promise<DailyTheme> {
  const [_, yyyy_mm_dd, dailyThemeID] = queryKey;
}
