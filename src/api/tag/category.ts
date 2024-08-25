import axios from 'axios';

import { TagKind } from '@/FormData/tag';
import { TagCategory, TagCategoryReadOnly } from '@/FormData/tag/tag';
import { UploadImage } from '@/api/data/image';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

export async function AddNewTagKind({ tagKind }: { tagKind: TagCategory }) {
  const { value: name_en } = tagKind.name.filter((i18n) => i18n.lang == 'en')[0];

  const image_url = tagKind.imageURL!;
  let image_http_url: string | undefined = undefined;
  if (image_url && image_url.startsWith('blob')) {
    image_http_url = await UploadImage({ folder: 'tagkind', fileBlobURL: image_url });
  } else {
    image_http_url = image_url;
  }

  const data = {
    ...tagKind,
    name_en: name_en.trim(),
    imageURL: image_http_url,
  };

  console.log(`처리된 data : ${JSON.stringify(data)}`);

  const path_ = `tagkind`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function EditTagKind({ tagKind }: { tagKind: TagCategory }) {
  const NAME_EN = tagKind.name.filter((i18n) => i18n.lang == 'en')[0].value;

  const { id: docID } = tagKind;

  const image_url = tagKind.imageURL!;
  let image_http_url: string | undefined = undefined;
  if (image_url && image_url.startsWith('blob')) {
    image_http_url = await UploadImage({ folder: 'tagkind', fileBlobURL: image_url });
  } else {
    image_http_url = image_url;
  }

  const data = {
    ...tagKind,
    name_en: NAME_EN,
    imageURL: image_http_url,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `tagkind/edit/${docID}`;
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
export async function GetAllTagCategory({
  queryKey,
}: {
  queryKey: [API_NAME, string?];
}): Promise<TagCategoryReadOnly[]> {
  const [_, tagKind] = queryKey;

  const path_ = `tagkind`;

  // const url = `${API_HOST}/${path_}${!!tagKind ? `?kind=${tagKind}` : ''}`;
  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
