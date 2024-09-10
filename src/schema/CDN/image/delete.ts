import { z } from 'zod';

// image delete response from CDN

const imageDeleteResponseBase = z.object({
  code: z.number().gte(1000).lt(5000),
});

const imageDeleteResponse = imageDeleteResponseBase.merge(
  z.object({
    name: z.string(), // new name of file with extension
    remoteURL: z.string().url(), // remote URL
    aliveUntil: z.number(), // UNIX
    time: z.number().gt(0), // UNIX
    size: z.number().gt(0),
  }),
);

export type ImageDeleteSuccessResponse = z.infer<typeof imageDeleteResponse>;

const imageDeleteFailResponse = imageDeleteResponseBase.merge(
  z.object({
    reason: z.string(),
  }),
);

export type ImageDeleteFailResponse = z.infer<typeof imageDeleteFailResponse>;

export type ImageDeleteResponse = ImageDeleteSuccessResponse | ImageDeleteFailResponse;
