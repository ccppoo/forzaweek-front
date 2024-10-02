import { z } from 'zod';

// 데칼, 튜닝, 트랙, 등 게임내에서 창작하고 공유하는 글 작성
export const sharingCreation = z.object({
  shareCode: z.optional(z.string()), // 공유코드
  gamerTag: z.optional(z.string()), // 창작물 제작자
  name: z.optional(z.string()), // 데칼, 튜닝 이름
});

export type SharingCreation = z.infer<typeof sharingCreation>;

export const sharingCreationReq = sharingCreation.required({
  shareCode: true,
  gamerTag: true,
  name: true,
});

export type SharingCreationReq = z.infer<typeof sharingCreationReq>;
