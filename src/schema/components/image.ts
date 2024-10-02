import { z } from 'zod';

export const multipleImageURLs = z.object({
  imageURLs: z.array(z.string()),
  // imageURLs: z.array(z.string()).default([]),
});

export const singleImageURL = z.object({
  imageURL: z.optional(z.string()),
});
