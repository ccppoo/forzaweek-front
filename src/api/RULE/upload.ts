import * as FailResponse from '@/api/RULE/failResponse';
import type { ImageUploadFailResponse } from '@/schema/CDN/image/upload';

const MAX_UPLOAD_SIZE_BYTE = 10 * 1024 * 1024;
const MAX_UPLOAD_SIZE_MB = 10;

interface FileAcceptConfig {
  image?: boolean;
  video?: boolean;
  audio?: boolean;
}

interface FileUploadConfig {
  accepts?: FileAcceptConfig;
  maxSize?: number;
}

const imageUploadConfig: FileUploadConfig = {
  accepts: {
    image: true,
    video: false,
    audio: false,
  },
  maxSize: 10 * 1024 * 1024,
};

function validFileSizelimit(fileSize: number, max: number): boolean {
  return fileSize < max;
}

function validFileFormat(MIMEType: string, accpets: FileAcceptConfig): boolean {
  const [type, subtype] = MIMEType.split('/');
  const allowed = Object.entries(accpets)
    .filter(([_, allowed]) => !!allowed)
    .map(([fileType, _]) => fileType);
  return allowed.includes(type);
}

export function isFileAllowedToUpload(
  file: File,
  uploadConfig?: FileUploadConfig,
): undefined | ImageUploadFailResponse {
  // default : image, 10MB
  const { accepts, maxSize } = uploadConfig || imageUploadConfig;
  const _accepts = accepts || imageUploadConfig.accepts!;
  const _maxSize = maxSize || imageUploadConfig.maxSize!;

  // 1. Max Size
  if (!validFileSizelimit(file.size, _maxSize)) return FailResponse.FileSizeLimitExceeded;

  // 2. File format
  if (!validFileFormat(file.type, _accepts)) return FailResponse.NotAllowedFileFomat;

  return;
}
