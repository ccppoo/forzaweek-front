import axios from 'axios';

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { ContentTypeHeader } from '@/api/config';
import type { API_NAME } from '@/api/types';
import type { TuningType } from '@/schema/fh5/tuning/types';

import { BASE_PATH_FH5_TUNING } from './config';

// TODO: pagination
// TODO: 데칼 -> 차, 태그 query param에 따라 검색
export async function GetAllTuning({
  queryKey,
}: {
  queryKey: [API_NAME];
}): Promise<TuningSchemaType[]> {
  const [_] = queryKey;

  const url = `${BASE_PATH_FH5_TUNING}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

type CarID = string | undefined;
type TuningID = string;
type Page = number;
type Limit = number;

export async function GetTuning({
  queryKey,
}: {
  queryKey: [API_NAME, CarID, TuningID];
}): Promise<TuningType> {
  const [_, carID, tuningID] = queryKey;

  const url = `${BASE_PATH_FH5_TUNING}/${carID}/${tuningID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
