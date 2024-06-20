import axios from 'axios';

import type { API_NAME } from '@/api/types';

import { API_HOST } from '../index';

export async function UploadTempImage({
  folder,
  fileBlobURL,
}: {
  folder: string;
  fileBlobURL: string;
}): Promise<string> {
  const formData = new FormData();

  const response = await fetch(fileBlobURL);
  const imgFile = await response.blob();
  formData.append('file', imgFile);

  const path_ = `image/${folder}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { image } = resp.data;
  // console.log(`resp.data.image : ${image}`);

  return image;
}

// URL 반환하는 이미지
export async function UploadImage({
  folder,
  fileBlobURL,
}: {
  folder: string;
  fileBlobURL: string;
}): Promise<string> {
  const formData = new FormData();

  const response = await fetch(fileBlobURL);
  const imgFile = await response.blob();
  formData.append('file', imgFile);

  const path_ = `image/${folder}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const { image } = resp.data;
  // console.log(`resp.data.image : ${image}`);

  return image;
}
