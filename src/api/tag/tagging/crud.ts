import axios from 'axios';
import type { AxiosResponse } from 'axios';

import type { TaggingItemForm } from '@/FormData/tag/tagging';
import { API_HOST, API_IMAGE_UPLOAD_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

type Tags = {
  tags: string[];
};

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

  const path_ = `tag/tagging/${topic}/${subjectID}`;

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
  tags: TaggingItemForm;
}) {
  const path_ = `tag/tagging/${topic}/${subjectID}`;
  const headers = AuthHeaders(id_token);

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, tags, { headers });

  return resp.data;
}
