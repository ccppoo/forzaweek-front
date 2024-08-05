import axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

type ID_TOKEN = string | undefined;
type SUBJECT_ID = string;
type COMMENT_ID = string;
type SUBCOMMENT_ID = string;

type CommentVoteReplyType = {};

export async function castCommentVote({
  token,
  subject_id,
  comment_id,
  subComment_id,
  vote,
}: {
  token: ID_TOKEN;
  subject_id: SUBJECT_ID;
  comment_id: COMMENT_ID;
  subComment_id: SUBCOMMENT_ID | undefined;
  vote: 'up' | 'down';
}): Promise<AxiosResponse<CommentVoteReplyType>> {
  // 다른 사람
  const queryParam = [`vote=${vote}`].join('&');

  let url = `${API_HOST}/comment/${subject_id}/${comment_id}`;

  if (subComment_id) {
    url = `${url}/${subComment_id}`;
  }
  url = `${url}/vote?${queryParam}`;

  const authHeaders = token ? AuthHeaders(token) : {};

  const resp = await axios.patch(url, {}, { headers: { ...authHeaders } });

  return resp;
}
