import axios from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

export async function get_user_profile({ queryKey }: { queryKey: [API_NAME, string] }) {
  const [_, token] = queryKey;
  const path = 'profile';
  const url = `${API_HOST}/user/${path}`;

  const resp = await axios.get(url, { headers: { ...AuthHeaders(token) }, withCredentials: true });

  return resp.data;
}
