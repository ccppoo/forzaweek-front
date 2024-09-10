import axios from 'axios';

import { API_HOST, API_IMAGE_UPLOAD_HOST, AuthHeaders } from '@/api/index';

interface AuthRequiredRequest {
  authToken: string;
}

interface SingleImageDeleteIntf extends AuthRequiredRequest {
  imageURL: string;
}

export async function AuthedImageDelete(params: SingleImageDeleteIntf): Promise<void> {
  const { authToken, imageURL } = params;
  const authHeaders = AuthHeaders(authToken);

  const imageKey = new URL(imageURL).pathname;
  const HOST = `${API_IMAGE_UPLOAD_HOST}${imageKey}`;

  // NOTE: 실패하더라도 클라우드에서 알아서 삭제, 클라이언트는 알아서 URL지우면 그만임
  const { status } = await axios.delete(HOST, {
    headers: {
      ...authHeaders,
    },
  });
  return;
}
