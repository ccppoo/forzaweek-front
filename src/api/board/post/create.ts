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
export async function createBoardPost({
  token,
  data,
}: {
  token: ID_TOKEN;
  data: OutputSchemaType;
}): Promise<void> {
  const boardType = 'free';
  let url = `${API_HOST}/board/${boardType}`;
  const _data = { ...data, category: 'free', user_id: 'asdasd' };
  const authHeaders = token ? AuthHeaders(token) : {};
  console.log(`data : ${JSON.stringify(_data)}`);
  const resp = await axios.post(url, _data, { headers: { ...authHeaders } });
  return;
}
