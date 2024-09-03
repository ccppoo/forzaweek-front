import axios from 'axios';

import type { CarFH5Input, CarFH5Type } from '@/schema/fh5/types';
import type { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';

import { BASE_PATH, JSONContentType } from './config';

interface GetCarFH5Intf {}

export async function GetCarFH5(params: GetCarFH5Intf): Promise<CarFH5Type> {
  const {} = params;
  const url = `${BASE_PATH}`;
  const resp = await axios.get<CarFH5Input>(url, {
    headers: {
      ...JSONContentType,
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  return resp.data as CarFH5Type;
}

export async function GetCarFH5Full(params: GetCarFH5Intf): Promise<CarFH5FullType> {
  const {} = params;
  const url = `${BASE_PATH}`;
  const resp = await axios.get<CarFH5FullInput>(url, {
    headers: {
      ...JSONContentType,
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  return resp.data as CarFH5FullType;
}
