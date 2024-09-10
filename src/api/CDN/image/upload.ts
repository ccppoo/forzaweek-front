import axios from 'axios';
import type { AxiosResponse } from 'axios';

import * as FailResponse from '@/api/RULE/failResponse';
import { isFileAllowedToUpload } from '@/api/RULE/upload';
import { API_HOST, API_IMAGE_UPLOAD_HOST, AuthHeaders } from '@/api/index';
import type { API_NAME } from '@/api/types';
import type {
  BoardImageUploadType,
  RemoveBoardImageType,
  UploadByFileType,
} from '@/components/Editor/types';
import type {
  ImageUploadFailResponse,
  ImageUploadResponse,
  ImageUploadSuccessResponse,
} from '@/schema/CDN/image/upload';

import { ContentTypeHeader } from '../config';

type AdditionalInfo = {
  size: number;
  time: number;
};

interface AuthRequiredRequest {
  authToken: string;
}

interface SingleImageUploadIntf extends AuthRequiredRequest {
  file: File;
}

export async function AuthedImageUpload(
  params: SingleImageUploadIntf,
): Promise<ImageUploadResponse> {
  const { authToken, file } = params;
  const authHeaders = AuthHeaders(authToken);

  // FIXME: return warning or reason why rejected
  const failReason = isFileAllowedToUpload(file);
  if (!!failReason) return failReason;

  const formData = new FormData();
  const [fileType, ext] = file.type.split('/');

  formData.append('file', file);

  const HOST = `${API_IMAGE_UPLOAD_HOST}`;

  const { status, data } = await axios.post<ImageUploadResponse>(HOST, formData, {
    headers: {
      ...ContentTypeHeader.FORM,
      ...authHeaders,
    },
  });

  if (!(status >= 200 || status < 300)) {
    const failResponse = data as ImageUploadFailResponse;
    return failResponse;
  }
  const successResponse = data as ImageUploadSuccessResponse;
  return successResponse;
}
