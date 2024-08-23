import axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_HOST, API_IMAGE_UPLOAD_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

type Tags = {
  tags: string[];
};

export async function getAllTagsOfSubject({
  queryKey,
}: {
  queryKey: [API_NAME, string, string];
}): Promise<Tags> {
  const [_, topic, subjectID] = queryKey;

  const path_ = `tag/tags/${topic}/${subjectID}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url);

  return resp.data;
}

type TagItem = {
  tag_id: string;
  up: number;
  down: number;
  up_user: string[];
  down_user: string[];
};
export async function getTagOfSubject({
  queryKey,
}: {
  queryKey: [API_NAME, string, string, string, string | undefined];
}): Promise<TagItem> {
  const [_, topic, subjectID, tagID, id_token] = queryKey;

  const headers = !!id_token ? AuthHeaders(id_token) : {};

  const path_ = `tag/tags/${topic}/${subjectID}/${tagID}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, { headers });

  return resp.data;
}
