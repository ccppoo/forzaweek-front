import { z } from 'zod';

export const multipleImageURLs = z.object({
  imageURLs: z.array(z.string()).default([]),
});

export const singleImageURL = z.object({
  imageURL: z.array(z.string()).default([]),
});
