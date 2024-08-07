import axios from 'axios';
import type { AxiosResponse } from 'axios';

import { API_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';
import type {
  BoardImageUploadType,
  RemoveBoardImageType,
  UploadByFileType,
} from '@/components/Editor/types';

const getBoardCreateImageUploader = (token: string): UploadByFileType => {
  const authHeaders = AuthHeaders(token);

  async function uploadByFile(file: File): Promise<BoardImageUploadType> {
    const folder = `board/upload`;

    const formData = new FormData();
    formData.append('file', file);

    const path_ = `image/${folder}`;
    const url = `${API_HOST}/${path_}`;

    const resp = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeaders,
      },
    });

    return resp.data;
  }

  return uploadByFile;
};

const getBoardCreateImageRemover = (token: string): RemoveBoardImageType => {
  const authHeaders = AuthHeaders(token);

  function RemoveBoardImage(image_url: string): void {
    const folder = `board/delete`;
    const path_ = `image/${folder}`;
    const url = `${API_HOST}/${path_}`;

    const data = {
      url: image_url,
    };
    const resp = axios
      .post(url, data, {
        headers: {
          ...authHeaders,
        },
      })
      .then()
      .catch();
    // return;
  }

  return RemoveBoardImage;
};

export async function UploadBoardImage(file: File): Promise<BoardImageUploadType> {
  const folder = `board/upload`;

  const formData = new FormData();
  formData.append('file', file);

  const path_ = `image/${folder}`;
  // const authHeaders = AuthHeaders(token);
  const url = `${API_HOST}/${path_}`;

  const resp = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // ...authHeaders,
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

export default {
  getBoardCreate: {
    imageUploader: getBoardCreateImageUploader,
    imageRemover: getBoardCreateImageRemover,
  },
};
