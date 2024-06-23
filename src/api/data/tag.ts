import axios from 'axios';

import type { TagEditSchema, TagSchemaType } from '@/FormData/tag';
import { UploadImage } from '@/api/data/image';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

type GetTag = {
  id: string;
  name_en: string;
  founded: number;
  imageURL: string;
};

export async function AddNewTag({ tag }: { tag: TagEditSchema }) {
  const { value: name_en } = tag.name.filter((i18n) => i18n.lang == 'en')[0];

  const data = {
    ...tag,
    name_en: name_en.trim(),
  };

  // console.log(`처리된 data : ${JSON.stringify(data)}`);

  const path_ = `tag`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function EditTag({ tag }: { tag: TagEditSchema }) {
  const NAME_EN = tag.name.filter((i18n) => i18n.lang == 'en')[0].value;

  const { id: docID } = tag;

  const data = {
    ...tag,
    name_en: NAME_EN,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `tag/edit/${docID}`;
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
}): Promise<TagSchemaType[]> {
  const [_, tagKind] = queryKey;

  const path_ = `tag`;

  const url = `${API_HOST}/${path_}${!!tagKind ? `?kind=${tagKind}` : ''}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
