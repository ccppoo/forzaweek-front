import { z } from 'zod';

// 트랙이 포함된 창작물 공유 포스트에 추가 - 이벤트랩, 트랙 공략 등
export const trackDependent = z.object({
  track: z.optional(z.string()), // 트랙 (id)
});
