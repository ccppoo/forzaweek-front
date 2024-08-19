import axios from 'axios';
import type { AxiosResponse } from 'axios';

import type { TaggingSchema } from '@/FormData/tag/tagAdd';
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

  const path_ = `tags/${topic}/${subjectID}`;

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

  const path_ = `tags/${topic}/${subjectID}/${tagID}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, { headers });

  return resp.data;
}

type TaggingTagItem = {
  id: string;
};

type PersonalTagging = {
  tags: TaggingTagItem[];
};

export async function getPersonalTagging({
  queryKey,
}: {
  queryKey: [API_NAME, string, string, string];
}): Promise<PersonalTagging> {
  const [_, topic, subjectID, id_token] = queryKey;

  const headers = !!id_token ? AuthHeaders(id_token) : {};

  const path_ = `tagging/${topic}/${subjectID}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, { headers });

  return resp.data;
}

export async function updatePersonalTagging({
  topic,
  subjectID,
  id_token,
  tags,
}: {
  topic: string;
  subjectID: string;
  id_token: string;
  tags: TaggingSchema;
}) {
  const path_ = `tagging/${topic}/${subjectID}`;
  const headers = AuthHeaders(id_token);

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, tags, { headers });

  return resp.data;
}

export async function voteTagOfSubject({
  topic,
  subjectID,
  tagID,
  type,
  id_token,
}: {
  topic: string;
  subjectID: string;
  tagID: string;
  type: 'up' | 'down';
  id_token: string;
}): Promise<TagItem> {
  const path_ = `tags/${topic}/${subjectID}/${tagID}/${type}`;
  const headers = AuthHeaders(id_token);

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, undefined, { headers });

  return resp.data;
}
