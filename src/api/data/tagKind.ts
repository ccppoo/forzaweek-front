import axios from 'axios';

import type { TagKindType } from '@/FormData/tag';
import { TagKind } from '@/FormData/tag';
import { UploadImage } from '@/api/data/image';
import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

const a = {
  name: [
    { lang: 'en', value: 'animation' },
    { lang: 'ko', value: '애니메이션' },
  ],
  imageURL: 'blob:https://localhost:5173/cebbcd72-7c44-40ee-ab49-0c44cac37850',
  description: [
    {
      lang: 'en',
      value:
        'This tag means that there are objects related to animation characters, phrases, ect. for the classification of animation-related tags.',
    },
    {
      lang: 'ko',
      value:
        '애니메이션과 관련된 태그 분류로 애니메이션 캐릭터, 문구 및 사물과 관련된 항목이 있는 것을 의미합니다',
    },
  ],
};

const ass = {
  name: [
    { lang: 'en', value: 'animation' },
    { lang: 'ko', value: '애니메이션' },
  ],
  name_en: 'animation',
  imageURL: 'blob:https://localhost:5173/cebbcd72-7c44-40ee-ab49-0c44cac37850',
  description: [
    {
      lang: 'en',
      value:
        'This tag means that there are objects related to animation characters, phrases, ect. for the classification of animation-related tags.',
    },
    {
      lang: 'ko',
      value:
        '애니메이션과 관련된 태그 분류로 애니메이션 캐릭터, 문구 및 사물과 관련된 항목이 있는 것을 의미합니다',
    },
  ],
};
export async function AddNewTagKind({ tagKind }: { tagKind: TagKind.TagKindEditSchema }) {
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

export async function EditTagKind({ tagKind }: { tagKind: TagKind.TagKindEditSchema }) {
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
export async function GetAllTagKind({
  queryKey,
}: {
  queryKey: [API_NAME, string?];
}): Promise<TagKind.TagKindSchemaType[]> {
  const [_, tagKind] = queryKey;

  const path_ = `tagkind`;

  // const url = `${API_HOST}/${path_}${!!tagKind ? `?kind=${tagKind}` : ''}`;
  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
