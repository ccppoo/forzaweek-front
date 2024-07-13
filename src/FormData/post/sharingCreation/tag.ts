import { z } from 'zod';

// 태그 포함되어야하는 경우
export const tagDependent = z.object({
  tags: z.array(z.string()),
});

export type TagDependentCreation = z.infer<typeof tagDependent>;
