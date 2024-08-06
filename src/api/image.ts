import axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';

async function uploadByFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return {
    success: 1,
    file: {
      // url: await Utils.returnBase64FromFile(file),
    },
  };
}

type BoardImageUploadType = {
  success: number;
  file: {
    url: string;
  };
};

export async function UploadBoardImage(file: File): Promise<BoardImageUploadType> {
  const folder = `board/upload`;

  const formData = new FormData();
  formData.append('file', file);

  const path_ = `image/${folder}`;

  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return resp.data;
}

export function RemoveBoardImage(removedImgUrl: string): void {
  const folder = `board/upload`;
  const path_ = `image/${folder}`;
  const url = `${API_HOST}/${path_}?delete=${removedImgUrl}`;

  const resp = axios.delete(url, {}).then();
  // return;
}
