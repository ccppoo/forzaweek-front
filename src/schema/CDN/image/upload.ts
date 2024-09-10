import { z } from 'zod';

// image upload response from CDN

const imageUploadResponseBase = z.object({
  code: z.number().gte(1000).lt(5000),
});

const imageUploadResponse = imageUploadResponseBase.merge(
  z.object({
    name: z.string(), // new name of file with extension
    remoteURL: z.string().url(), // remote URL
    aliveUntil: z.number(), // UNIX
    time: z.number().gt(0), // UNIX
    size: z.number().gt(0),
  }),
);

export type ImageUploadSuccessResponse = z.infer<typeof imageUploadResponse>;

const imageUploadFailResponse = imageUploadResponseBase.merge(
  z.object({
    reason: z.string(),
  }),
);

export type ImageUploadFailResponse = z.infer<typeof imageUploadFailResponse>;

export type ImageUploadResponse = ImageUploadSuccessResponse | ImageUploadFailResponse;
