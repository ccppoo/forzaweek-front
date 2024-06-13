import axios from 'axios';

import { API_HOST } from '@/api/index';
import type { API_NAME } from '@/api/types';

import type { DataStatus } from './types';

export async function GetDataStatus({ queryKey }: { queryKey: [API_NAME] }): Promise<DataStatus> {
  const [_] = queryKey;

  const path_ = `data/status`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get<DataStatus>(url);

  return resp.data;
}
