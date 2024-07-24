import axios from 'axios';

import type { DecalEditSchema, DecalSchemaReadType, DecalSchemaType } from '@/FormData/decal';
import { UploadImage } from '@/api/data/image';
import { API_HOST } from '@/api/index';
import type { API_NAME } from '@/api/types';

export async function AddNewDecal({ decal }: { decal: DecalEditSchema }) {
  // 1. blob으로 추가된 사진은 서버로 보내서 URL 받아오기
  const firstImageIdx = decal.firstImage ? decal.imageURLs.indexOf(decal.firstImage) : 0;
  const imageUrls = await Promise.all(
    decal.imageURLs.map(async (img) => {
      if (img.startsWith('blob')) {
        return await UploadImage({ folder: 'decal', fileBlobURL: img });
      }
      return img;
    }),
  );

  decal.imageURLs = imageUrls;
  decal.firstImage = imageUrls[firstImageIdx];

  const data = {
    ...decal,
  };

  console.log(`처리된 data : ${JSON.stringify(data)}`);

  const path_ = `decal`;
  const url = `${API_HOST}/FH5/${path_}`;
  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function EditDecal({ decal }: { decal: DecalEditSchema }) {
  const { id: docID } = decal;

  const data = {
    ...decal,
  };
  console.log(`data : ${JSON.stringify(data)}`);

  const path_ = `decal/edit/${docID}`;
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
  queryKey: [API_NAME, string];
}): Promise<DecalSchemaReadType> {
  const [_, decalID] = queryKey;

  const path_ = `decal`;

  const url = `${API_HOST}/FH5/${path_}/${decalID}`;

  const resp = await axios.get(url, {});

  return resp.data;
}
