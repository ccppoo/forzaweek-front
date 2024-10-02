import axios from 'axios';

import type { DecalEditSchema, DecalSchemaReadType, DecalSchemaType } from '@/FormData/decal';
import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';
import type { DecalImageRead, DecalRead } from '@/schema/fh5/decal';

import { BASE_PATH, JSONContentType } from './config';

type AUTH_TOKEN = string | undefined;
type DECAL_ID = string;
type DECAL_IMAGE_ID = string;

export async function CreateDecalPost({
  decal,
  authToken,
}: {
  decal: DecalSchemaType;
  authToken: string;
}) {
  // 1. blob으로 추가된 사진은 서버로 보내서 URL 받아오기
  const a = {
    car: '66d6a4f32090a29cc017fbb9',
    creator: 'temp-user-123',
    imageURLs: [
      'https://fzwcdn.forzaweek.com/user/upload/ad836d7d-2890-4d4f-9933-4d1676c4bf47.jpeg',
      'https://fzwcdn.forzaweek.com/user/upload/869cb6a1-bc17-48c1-a8bb-6ccea2f5e0c8.jpeg',
      'https://fzwcdn.forzaweek.com/user/upload/b538cac5-f074-4d0b-bf7d-96c85f67bcf4.jpeg',
    ],
    shareCode: '123456789',
    gamerTag: 'temp-user-123',
  };
  // const imageUrls = await Promise.all(
  //   decal.imageURLs.map(async (img) => {
  //     if (img.startsWith('blob')) {
  //       return await UploadImage({ folder: 'decal', fileBlobURL: img });
  //     }
  //     return img;
  //   }),
  // );

  const data = {
    ...decal,
  };

  console.log(`처리된 data : ${JSON.stringify(data)}`);

  const resp = await axios.post(BASE_PATH, data, {
    headers: {
      ...JSONContentType,
      ...AuthHeaders(authToken),
    },
  });
}

export async function EditDecal({
  decal,
  authToken,
}: {
  decal: DecalEditSchema;
  authToken: string;
}) {
  const { id: docID } = decal;

  const data = {
    ...decal,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `decal/edit/${docID}`;
  const url = `${API_HOST}/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      ...JSONContentType,

      ...AuthHeaders(authToken),
    },
  });
  console.log(`resp.data : ${JSON.stringify(resp.data)}`);

  // return resp.data;
}

// TODO: pagination
// TODO: 데칼 -> 차, 태그 query param에 따라 검색
export async function GetAllDecal({
  queryKey,
}: {
  queryKey: [API_NAME];
}): Promise<DecalSchemaType[]> {
  const [_] = queryKey;

  const path_ = `decal`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.get(url, {});

  return resp.data;
}

export async function GetDecal({
  queryKey,
}: {
  queryKey: [API_NAME, DECAL_ID, AUTH_TOKEN];
}): Promise<DecalRead> {
  const [_, decalID, authToken] = queryKey;

  const url = `${BASE_PATH}/${decalID}`;
  const authHeaders = authToken ? AuthHeaders(authToken) : {};

  const resp = await axios.get(url, { headers: { ...authHeaders } });

  return resp.data;
}

export async function GetDecalImageUploadIDs({
  queryKey,
}: {
  queryKey: [API_NAME, DECAL_ID];
}): Promise<string[]> {
  const [_, decalID] = queryKey;

  // pagination
  const url = `${BASE_PATH}/${decalID}/image`;
  const resp = await axios.get(url);

  return resp.data;
}

export async function GetDecalImageUpload({
  queryKey,
}: {
  queryKey: [API_NAME, DECAL_ID, DECAL_IMAGE_ID, AUTH_TOKEN];
}): Promise<DecalImageRead> {
  const [_, decalID, decalImageID, authToken] = queryKey;

  const url = `${BASE_PATH}/${decalID}/image/${decalImageID}`;
  const authHeaders = authToken ? AuthHeaders(authToken) : {};
  const resp = await axios.get(url, { headers: { ...authHeaders } });

  return resp.data;
}

export async function GetAnyOneImageOfDecalImages({
  queryKey,
}: {
  queryKey: [API_NAME, DECAL_ID];
}): Promise<string> {
  const [_, decalID] = queryKey;

  // car detail, decal detail -> other decals 칸에 미리보기 이미지 하나
  const url = `${BASE_PATH}/${decalID}/front`;
  const resp = await axios.get(url);

  return resp.data;
}
