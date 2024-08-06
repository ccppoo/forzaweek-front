import axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

type ID_TOKEN = string | undefined;
type SUBJECT_ID = string;
type COMMENT_ID = string;
type SUBCOMMENT_ID = string;

type CommentCreateResponseType = {};

export async function createComment({
  token,
  subject_id,
}: {
  token: ID_TOKEN;
  subject_id: SUBJECT_ID;
}): Promise<AxiosResponse<CommentCreateResponseType>> {
  let url = `${API_HOST}/comment/${subject_id}`;

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.post(url, {}, { headers: { ...authHeaders } });

  return resp;
}

export async function createSubComment({
  token,
  subject_id,
  comment_id,
}: {
  token: ID_TOKEN;
  subject_id: SUBJECT_ID;
  comment_id: COMMENT_ID;
}): Promise<AxiosResponse<CommentCreateResponseType>> {
  let url = `${API_HOST}/comment/${subject_id}/${comment_id}`;

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.post(url, {}, { headers: { ...authHeaders } });

  return resp;
}
