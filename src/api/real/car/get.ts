import axios from 'axios';

import type { API_NAME } from '@/api/types';
import type { CarInput, CarType } from '@/schema/real/types';

import { BASE_PATH, JSONContentType } from './config';

interface GetCarIntf {}

export async function GetRealCar(params: GetCarIntf): Promise<CarType> {
  const {} = params;
  const url = `${BASE_PATH}`;
  const resp = await axios.get<CarInput>(url, {
    headers: {
      ...JSONContentType,
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  return resp.data as CarType;
}
