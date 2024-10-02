import axios from 'axios';

import { API_HOST, API_IMAGE_UPLOAD_HOST, AuthHeaders } from '@/api/index';
import type {
  BoardImageUploadType,
  RemoveBoardImageType,
  UploadByFileType,
} from '@/components/Editor/types';

type AdditionalInfo = {
  size: number;
  time: number;
};

const getBoardCreateImageUploader = (token: string): UploadByFileType => {
  const authHeaders = AuthHeaders(token);

  async function uploadByFile(file: File): Promise<BoardImageUploadType> {
    const formData = new FormData();
    formData.append('file', file);
    const [fileType, ext] = file.type.split('/');
    // if(fileType !='image') return;
    const url = `${API_IMAGE_UPLOAD_HOST}`;

    const resp = await axios.post<BoardImageUploadType & AdditionalInfo>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ext: ext,
        ...authHeaders,
      },
    });

    const { size, time, ...rest } = resp.data;

    console.log(`rest : ${JSON.stringify(rest)}`);

    return rest;
  }

  return uploadByFile;
};

const getBoardCreateImageRemover = (token: string): RemoveBoardImageType => {
  // 글 최초 작성시에는 삭제하면 바로 삭제하도록 한다
  // 글 수정시에는 이 함수 대신 삭제할 것들 모아 놓는 함수를 호출함
  const authHeaders = AuthHeaders(token);

  function RemoveBoardImage(image_url: string): void {
    // NOTE: should be sync -> limit of editor.js remove eventhandler
    const deleteImageUrl = new URL(image_url);
    // console.log(`deleteImageUrl.host : ${deleteImageUrl.host}`);
    // console.log(`deleteImageUrl.pathname : ${deleteImageUrl.pathname}`);
    const url = `${API_IMAGE_UPLOAD_HOST}${deleteImageUrl.pathname}`;

    // body: plain 'success' and code : 204
    const resp2 = axios
      .delete(url, {
        headers: {
          ...authHeaders,
        },
      })
      .then()
      .catch();
  }

  return RemoveBoardImage;
};

export default {
  getBoardCreate: {
    imageUploader: getBoardCreateImageUploader,
    imageRemover: getBoardCreateImageRemover,
  },
};
