import { z } from 'zod';

export const decalEditSchema = z.object({
  id: z.optional(z.string()), // 데칼 글 작성 자체 DocumnetID

  share_code: z.optional(z.string()), // 공유코드
  car: z.optional(z.string()), // 차 (id)
  decal_creator: z.optional(z.string()), // 데칼 제작자

  imageURLs: z.array(z.string()), // 데칼 사진
  firstImage: z.optional(z.string()),

  tags: z.array(z.string()), // 데칼 태그
});

export const decalSchemaType = z.object({
  id: z.string(), // 차 자체 DocumnetID

  share_code: z.string(), // 공유코드
  car: z.string(), // 차 (id)
  decal_creator: z.string(), // 데칼 제작자

  imageURLs: z.array(z.string()), // 데칼 사진
  firstImage: z.string(),

  tags: z.array(z.string()), // 데칼 태그
});
export type DecalSchemaType = z.infer<typeof decalSchemaType>;

export type DecalEditSchema = z.infer<typeof decalEditSchema>;

export const decalEditSchemaDefault: DecalEditSchema = {
  share_code: undefined, // 공유코드
  car: undefined, // 차 (id)
  decal_creator: undefined, // 데칼 제작자

  imageURLs: [], // 데칼 사진
  firstImage: undefined,
  tags: [], // 데칼 태그
};
