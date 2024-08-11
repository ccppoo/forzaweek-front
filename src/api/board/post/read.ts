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

export async function readBoardPost({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<OutputSchemaType> {
  const [_, postID] = queryKey;
  const boardType = 'free';
  let url = `${API_HOST}/board/${boardType}/${postID}`;

  const resp = await axios.get(url);
  return resp.data;
}
