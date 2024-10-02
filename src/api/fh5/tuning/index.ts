import axios from 'axios';

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { ContentTypeHeader } from '@/api/config';
import type { API_NAME } from '@/api/types';

import { BASE_PATH_FH5_TUNING } from './config';

export async function AddNewTuning({ tuning }: { tuning: TuningEditSchema }) {
  // console.log(`처리된 data : ${JSON.stringify(data)}`);
  const data = { ...tuning };
  const url = `${BASE_PATH_FH5_TUNING}`;

  const resp = await axios.post(url, data, {
    headers: {
      ...ContentTypeHeader.JSON,
    },
  });
}

export async function EditTuning({ tuning }: { tuning: TuningEditSchema }) {
  const { id: docID } = tuning;

  const data = {
    ...tuning,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `tuning/edit/${docID}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}

// TODO: pagination
// TODO: 데칼 -> 차, 태그 query param에 따라 검색
export async function GetAllTuning({
  queryKey,
}: {
  queryKey: [API_NAME];
}): Promise<TuningSchemaType[]> {
  const [_] = queryKey;

  const path_ = `tuning`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

type CarID = string | undefined;
type TuningID = string;
type Page = number;
type Limit = number;

export async function SearchTunings({
  queryKey,
}: {
  queryKey: [API_NAME, CarID, Page, Limit];
}): Promise<TuningSchemaType[]> {
  const [_, carID, page, itemLimit] = queryKey;

  let path_ = `FH5/tuning`;

  let queryParams = `page=${page}&limit=${itemLimit}`;
  if (carID) path_ = `${path_}/${carID}`;

  // if(queryParams) queryParams=`${queryParams}&`

  // TODO: query param -> 튜닝 검색 조건
  const url = `${API_HOST}/${path_}?${queryParams}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function GetTuning({
  queryKey,
}: {
  queryKey: [API_NAME, CarID, TuningID];
}): Promise<TuningSchemaType> {
  const [_, carID, tuningID] = queryKey;

  const path_ = `FH5/tuning`;

  //
  const url = `${API_HOST}/${path_}/${carID}/${tuningID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
