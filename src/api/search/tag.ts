import axios from 'axios';

import type { TagType } from '@/FormData/tag';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

// 작성 중 태그 검색
export async function SearchTag({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<TagType.TagSchemaTypeExtended[]> {
  const [_, searchKeyWord] = queryKey;

  const path_ = `search/tag/a`;
  const url = `${API_HOST}/${path_}?keyword=${searchKeyWord}`;

  const resp = await axios.get(url, {});

  return resp.data || [];
}
