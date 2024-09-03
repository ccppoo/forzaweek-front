import axios from 'axios';

import type { API_NAME } from '@/api/types';
import type { ManufacturerInput, ManufacturerType } from '@/schema/real/types';
import type { ManufacturerFullInput, ManufacturerFullType } from '@/schema/real/types';

import { BASE_PATH, JSONContentType } from './config';

interface GetManufacturerIntf {
  full?: boolean;
}

export async function GetManufacturer(params: GetManufacturerIntf): Promise<ManufacturerType> {
  const { full } = params;
  const url = `${BASE_PATH}`;
  const resp = await axios.get<ManufacturerInput>(url, {
    headers: {
      ...JSONContentType,
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  return resp.data as ManufacturerType;
}
