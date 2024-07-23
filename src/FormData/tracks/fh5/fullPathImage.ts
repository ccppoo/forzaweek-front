import { z } from 'zod';

// 이미지 하나만 필요한 요소 -> nation, tag, 등
export const fullPathImage = z.object({
  fullPathImage: z.object({
    zoom_out: z.optional(z.string()),
    zoom_in: z.optional(z.string()),
  }),
});

export type FullPathImage = z.infer<typeof fullPathImage>;
