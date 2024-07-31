import axios from 'axios';

import { API_HOST } from '@/api/index';
import type { API_NAME } from '@/api/types';
import type { AuthTokenType } from '@/store/auth/types';

import { OAUTH_XBOX_CLIENT_ID, OAUTH_XBOX_REFRESH_ENDPOINT, OAUTH_XBOX_SCOPE } from './settings';

export async function Login() {
  const path = 'auth/oauth/xbox/login';
  const url = `${API_HOST}/${path}`;

  const resp = await axios.get(url, { withCredentials: true });

  return resp.data;
}

export async function Callback({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<AuthTokenType> {
  const [_, code] = queryKey;
  const path = 'auth/oauth/xbox/callback';
  const url = `${API_HOST}/${path}`;

  const data = { code: code };
  const resp = await axios.post(url, data, { withCredentials: true });

  return resp.data;
}

export async function TokenRefresh({ refreshToken }: { refreshToken: string }) {
  // 로그인하고 백엔드로부터 받아서 직접 관리해야함
  const data = {
    grant_type: 'refresh_token',
    scope: OAUTH_XBOX_SCOPE,
    refresh_token: refreshToken,
    client_id: OAUTH_XBOX_CLIENT_ID,
  };

  const resp = await axios.post(OAUTH_XBOX_REFRESH_ENDPOINT, data);
  return resp.data;
}
