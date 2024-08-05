import axios from 'axios';

import type { CommentsType } from '@/FormData/comments/types';
import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

type ID_TOKEN = string | undefined;
type SUBJECT_ID = string;
type DISPLAY_PAGE = number;
type DISPLAY_LIMIT = number;
type DISPLAY_ORDER = string;
type COMMENT_ID = string;
type SUBCOMMENT_ID = string;
export async function getComments({
  queryKey,
}: {
  queryKey: [API_NAME, ID_TOKEN, SUBJECT_ID, DISPLAY_PAGE, DISPLAY_LIMIT, DISPLAY_ORDER];
}): Promise<CommentsType> {
  // 다른 사람

  const [_, token, subject_id, page, limit, order] = queryKey;

  const queryParam = [`page=${page}`, `limit=${limit}`, `order=${order}`].join('&');
  const url = `${API_HOST}/comment/${subject_id}?${queryParam}`;

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.get(url, { headers: { ...authHeaders }, withCredentials: true });

  return resp.data;
}

export async function getComment<T>({
  queryKey,
}: {
  queryKey: [API_NAME, ID_TOKEN, SUBJECT_ID, COMMENT_ID];
}): Promise<T> {
  // 다른 사람

  const [_, token, subject_id, comment_id] = queryKey;

  // const queryParam = [`page=${page}`, `limit=${limit}`, `order=${order}`].join('&');
  const url = `${API_HOST}/comment/${subject_id}/${comment_id}`;

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.get(url, { headers: { ...authHeaders }, withCredentials: true });

  return resp.data;
}

// SUBJECT_ID, commentID, subCommentID
export async function getSubComment<T>({
  queryKey,
}: {
  queryKey: [API_NAME, ID_TOKEN, SUBJECT_ID, COMMENT_ID, SUBCOMMENT_ID];
}): Promise<T> {
  // 다른 사람

  const [_, token, subject_id, comment_id, subComment_id] = queryKey;

  // const queryParam = [`page=${page}`, `limit=${limit}`, `order=${order}`].join('&');
  const url = `${API_HOST}/comment/${subject_id}/${comment_id}/${subComment_id}`;

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.get(url, { headers: { ...authHeaders }, withCredentials: true });

  return resp.data;
}
