import axios from 'axios';

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { ContentTypeHeader } from '@/api/config';
import type { API_NAME } from '@/api/types';

import { BASE_PATH_FH5_TUNING } from './config';

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
  const url = `${BASE_PATH_FH5_TUNING}?${queryParams}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
