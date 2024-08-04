import axios from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

type USER_ID = string;
type AUTH_TOKEN = string;

type UserProfile = {
  gamerTag: string;

  profileImage: string;
};

export async function getUserProfile({
  queryKey,
}: {
  queryKey: [API_NAME, USER_ID, AUTH_TOKEN | undefined];
}): Promise<UserProfile> {
  // 다른 사람

  const [_, userID, token] = queryKey;

  let url = ``;
  if (userID == 'me') {
    url = `${API_HOST}/user/me`;
  }
  if (userID != 'me') {
    url = `${API_HOST}/user/profile/${userID}`;
  }

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.get(url, { headers: { ...authHeaders }, withCredentials: true });

  return resp.data;
}

export async function getProfile({ token }: { token: string }) {
  const url = `${API_HOST}/user/profile`;

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.get(url, { headers: { ...authHeaders }, withCredentials: true });

  return resp.data;
}
