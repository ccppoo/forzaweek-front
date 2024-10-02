import axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

import { BASE_PATH_REACTION } from './config';

type AUTH_TOKEN = string | undefined;
type DECAL_ID = string;
type DECAL_IMAGE_ID = string;
type VOTE_ENDPOINT_PATH = string;
type UP_DOWN = 'up' | 'down';
type Voted = {
  up: string[];
  down: string[];
};

type VoteBase = {
  upVotes: number;
  downVotes: number;
  voted: Voted;
};

type VoteDecalImage = {
  id: string;
  decalBase: string;
} & VoteBase;

// TODO: pagination
// TODO: 데칼 -> 차, 태그 query param에 따라 검색
export async function GetVotes({
  queryKey,
}: {
  queryKey: [API_NAME, VOTE_ENDPOINT_PATH];
}): Promise<VoteDecalImage> {
  const [_, voteEndpointPath] = queryKey;
  // {decal_id}/{decal_image_id}/vote
  const url = `${BASE_PATH_REACTION}/${voteEndpointPath}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function DoVotes({
  authToken,
  voteEndpointPath,
  vote,
}: {
  authToken: AUTH_TOKEN;
  voteEndpointPath: VOTE_ENDPOINT_PATH;
  vote: UP_DOWN;
}): Promise<AxiosResponse<void>> {
  const url = `${BASE_PATH_REACTION}/${voteEndpointPath}/${vote}`;
  const authHeaders = authToken ? AuthHeaders(authToken) : {};

  const resp = await axios.get(url, { headers: { ...authHeaders } });

  return resp;
}
