import type { ImageUploadFailResponse } from '@/schema/CDN/image/upload';

export const FileSizeLimitExceeded: ImageUploadFailResponse = {
  code: 4000,
  reason: 'file size exceeded',
};

export const NotAllowedFileFomat: ImageUploadFailResponse = {
  code: 4001,
  reason: 'not allowed file format',
};
