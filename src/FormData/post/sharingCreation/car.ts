import { z } from 'zod';

// 차가 포함된 창작물 공유 포스트에 추가하는 요소
export const carDependent = z.object({
  car: z.optional(z.string()), // 차 (id)
});
