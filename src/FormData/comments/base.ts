import { z } from 'zod';

export const commentBase = z.object({
  creator: z.string(),
  value: z.string(),
  created_at: z.date(),
  modified_at: z.optional(z.date()),
});

export const commentsBase = z.object({
  subject_to: z.string(),
  created_at: z.date(),
  comments: z.array(z.string()).default([]),
});

export type CommentsType = z.infer<typeof commentsBase>;
