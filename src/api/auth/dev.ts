import axios from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';
import type { AuthTokenType } from '@/store/auth/types';

export async function dev_check({ token }: { token: string }) {
  const path = 'dev';
  const url = `${API_HOST}/${path}/user`;

  const resp = await axios.get(url, { headers: { ...AuthHeaders(token) }, withCredentials: true });

  return resp.data;
}
