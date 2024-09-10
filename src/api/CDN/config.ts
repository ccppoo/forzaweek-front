import { API_HOST, API_IMAGE_UPLOAD_HOST } from '@/api/config';

export { ContentTypeHeader } from '@/api/config';

export const BASE_PATH_IMAGE_HOST = `${API_IMAGE_UPLOAD_HOST}`;

const MAX_UPLOAD_SIZE_BYTE = 10 * 1024 * 1024;
const MAX_UPLOAD_SIZE_MB = 10;

function isFileAllowedToUpload(file: File): boolean {
  // 1. Max Size

  return true;
}
