import axios from 'axios';

import { populateTagSearchResult } from '@/FormData/tag/search';
import type { TagItemPopulated, TagSearchQueryResponse } from '@/FormData/tag/search/types';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

// 작성 중 태그 검색
export async function SearchTag({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<TagItemPopulated[]> {
  const [_, searchKeyWord] = queryKey;

  const path_ = `search/tag/a`;
  const url = `${API_HOST}/${path_}?keyword=${searchKeyWord}`;

  const resp = await axios.get<TagSearchQueryResponse>(url, {});

  return !!resp.data ? populateTagSearchResult(resp.data) : [];
}
