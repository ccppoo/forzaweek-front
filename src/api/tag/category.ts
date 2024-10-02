import axios from 'axios';

import type { API_NAME } from '@/api/types';
import { TagCategory } from '@/schema/tag/types';

import { BASE_PATH_TAG_CATEGORY } from './config';

// TODO: pagination
export async function GetTagCategory({
  queryKey,
}: {
  queryKey: [API_NAME, string?];
}): Promise<TagCategory[]> {
  const [_, categoryType] = queryKey;

  const url = `${BASE_PATH_TAG_CATEGORY}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

type TagCategoryID = string;

export async function GetTagCategoryByID({
  queryKey,
}: {
  queryKey: [API_NAME, TagCategoryID];
}): Promise<TagCategory> {
  const [_, tagCategoryID] = queryKey;

  const url = `${BASE_PATH_TAG_CATEGORY}/${tagCategoryID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function AddNewTagCategory({ tagCategory }: { tagCategory: TagCategory }) {
  const url = `${BASE_PATH_TAG_CATEGORY}`;

  const resp = await axios.post(url, tagCategory, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function GetDefaultTagCategory({
  queryKey,
}: {
  queryKey: [API_NAME];
}): Promise<TagCategory> {
  const url = `${BASE_PATH_TAG_CATEGORY}/general`;

  const resp = await axios.get<TagCategory>(url, {});

  return resp.data;
}
