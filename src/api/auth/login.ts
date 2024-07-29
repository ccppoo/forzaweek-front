import axios from 'axios';

import sleep from '@/utils/sleep';

import { API_HOST } from '../index';

export async function Login() {
  const path = 'auth/xbox/login';
  const url = `${API_HOST}/${path}`;

  const resp = await axios.get(url, { withCredentials: true });

  return resp.data;
  // return resp.data;
  // await sleep(1000);
  // return;
}
