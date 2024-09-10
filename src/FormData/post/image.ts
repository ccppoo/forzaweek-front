import { z } from 'zod';

// 이미지 하나만 필요한 요소 -> nation, tag, 등
export const singleImage = z.object({
  imageURL: z.optional(z.string()),
});

// 이미지 여러개 들어가는 요소  -> car, decal, map 등
export const multipleImages = z.object({
  imageURLs: z.optional(z.array(z.string())),
});

export type SingleImageDependentCreation = z.infer<typeof singleImage>;

export type MultipleImagesDependentCreation = z.infer<typeof multipleImages>;
