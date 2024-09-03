import axios from 'axios';

import type { API_NAME } from '@/api/types';
import type { CountryInput, CountryType } from '@/schema/real/types';

import { BASE_PATH, JSONContentType } from './config';

interface GetCountryIntf {}

export async function GetCountry(params: GetCountryIntf): Promise<CountryType> {
  const {} = params;
  const url = `${BASE_PATH}`;
  const resp = await axios.get<CountryInput>(url, {
    headers: {
      ...JSONContentType,
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  return resp.data as CountryType;
}
