import axios from 'axios';

import { populateTagSearchResult } from '@/FormData/tag/search';
import type { TagItemPopulated, TagSearchQueryResponse } from '@/FormData/tag/search/types';
import type { API_NAME } from '@/api/types';
import { TagCategory } from '@/schema/tag/types';

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

// 작성 중 태그 검색
export async function SearchTagCategory({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<TagCategory[]> {
  const [_, searchKeyWord] = queryKey;

  const path_ = `search/tag/category`;
  const url = `${API_HOST}/${path_}?keyword=${searchKeyWord}`;

  const resp = await axios.get<TagCategory[]>(url, {});

  return resp.data;
  // return []
  // return !!resp.data ? populateTagSearchResult(resp.data) : [];
}

export async function SearchTagCategoryID({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<string[]> {
  const [_, searchKeyWord] = queryKey;

  const path_ = `search/tag/category/id`;
  const url = `${API_HOST}/${path_}?keyword=${searchKeyWord}`;

  const resp = await axios.get<string[]>(url, {});

  return resp.data;
  // return []
  // return !!resp.data ? populateTagSearchResult(resp.data) : [];
}
