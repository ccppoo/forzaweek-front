import { z } from 'zod';

// 데칼, 튜닝, 트랙, 등 게임내에서 창작하고 공유하는 글 작성
export const sharingCreation = z.object({
  share_code: z.optional(z.string()), // 공유코드
  creator: z.optional(z.string()), // 창작물 제작자
});

export type SharingCreation = z.infer<typeof sharingCreation>;
