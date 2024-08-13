import axios from 'axios';
import type { AxiosResponse } from 'axios';

import type { OutputSchemaType } from '@/FormData/editorjs';
import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

type ID_TOKEN = string | undefined;
type SUBJECT_ID = string;
type COMMENT_ID = string;
type SUBCOMMENT_ID = string;

type CommentCreateResponseType = {};

export async function deleteBoardPost({
  token,
  postID,
}: {
  token: ID_TOKEN;
  postID: string;
}): Promise<void> {
  const boardType = 'free';
  let url = `${API_HOST}/board/${postID}`;
  const authHeaders = token ? AuthHeaders(token) : {};
  const resp = await axios.delete(url, { headers: { ...authHeaders } });
  return;
}
