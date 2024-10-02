import axios from 'axios';

import type { TagItem, TagItemReadOnly } from '@/FormData/tag/tag';
import { UploadImage } from '@/api/data/image';
import type { API_NAME } from '@/api/types';
import type { Tag } from '@/schema/tag';

import { API_HOST } from '../index';
import { BASE_PATH_TAG, JSONContentType } from './config';

export async function AddNewTag({ tag }: { tag: TagItem }) {
  const url = `${BASE_PATH_TAG}`;
  const resp = await axios.post(url, tag, {
    headers: {
      ...JSONContentType,
    },
  });
}

export async function EditTag({ tag }: { tag: TagItem }) {
  const NAME_EN = tag.name.filter((i18n) => i18n.lang == 'en')[0].value;

  const { id: docID } = tag;

  const image_url = tag.imageURL!;
  let image_http_url: string | undefined = undefined;
  if (image_url && image_url.startsWith('blob')) {
    image_http_url = await UploadImage({ folder: 'tagkind', fileBlobURL: image_url });
  } else {
    image_http_url = image_url;
  }
  const data = {
    ...tag,
    name_en: NAME_EN,
    imageURL: image_http_url,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `tag/tag/edit/${docID}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}

// TODO: pagination
export async function GetAllTag({
  queryKey,
}: {
  queryKey: [API_NAME, string?];
}): Promise<TagItemReadOnly[]> {
  const [_, tagKind] = queryKey;

  const path_ = `tag/tag`;

  // const url = `${API_HOST}/${path_}/all${!!tagKind ? `?kind=${tagKind}` : ''}`;
  const url = `${API_HOST}/${path_}${!!tagKind ? `?kind=${tagKind}` : ''}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

// 작성 중 태그 동적으로 생성하는 경우
export async function GetTagByID({
  queryKey,
}: {
  queryKey: [API_NAME, string];
}): Promise<TagItemReadOnly> {
  const [_, tagID] = queryKey;
  const path_ = `tag/tag`;

  const url = `${API_HOST}/${path_}/${tagID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

type TagID = string;

export async function GetTagByID2({ queryKey }: { queryKey: [API_NAME, TagID] }): Promise<Tag> {
  const [_, tagID] = queryKey;

  const url = `${BASE_PATH_TAG}/${tagID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
