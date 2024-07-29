import axios from 'axios';

import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

export async function Callback({ queryKey }: { queryKey: [API_NAME, string] }) {
  const [_, code] = queryKey;
  const path = 'auth/xbox/callback';
  const url = `${API_HOST}/${path}`;

  const data = { code: code };
  const resp = await axios.post(url, data, { withCredentials: true });

  return resp.data;
  // return resp.data;
  // await sleep(1000);
  // return;
}
