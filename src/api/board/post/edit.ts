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
const a = {
  comments: 0,
  data: {
    time: 1723355657754,
    blocks: [
      { id: 'ingdsi5lvA', type: 'header', data: { text: 'New note title...', level: 3 } },
      { id: 'kMjfHJBw6V', type: 'paragraph', data: { text: 'asd' } },
      { id: 'nWmpTpw8-Y', type: 'paragraph', data: { text: '' } },
    ],
    version: '2.30.2',
  },
  user_id: 'asdasd',
  title: 'asdasd',
  category: 'free',
};

export async function getBoardPostEdit({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<OutputSchemaType> {
  const [mode, postID] = queryKey;
  // mode == edit

  let url = `${API_HOST}/board/${postID}`;

  // const authHeaders = token ? AuthHeaders(token) : {};
  // console.log(`data : ${JSON.stringify(_data)}`);
  const resp = await axios.get(url);
  return resp.data;
}

export async function editBoardPost<T>({
  token,
  postID,
  data,
}: {
  token: ID_TOKEN;
  postID: string;
  data: T;
}): Promise<void> {
  const boardType = 'free';
  let url = `${API_HOST}/board/${boardType}/${postID}`;
  const _data = { ...data, category: 'free', user_id: 'asdasd' };
  const authHeaders = token ? AuthHeaders(token) : {};
  console.log(`data : ${JSON.stringify(_data)}`);
  const resp = await axios.put(url, _data, { headers: { ...authHeaders } });
  return;
}
