import { z } from 'zod';

export const commentBase = z.object({
  creator: z.optional(z.string()),
  value: z.string().default(''),
  created_at: z.optional(z.date()),
  modified_at: z.optional(z.date()),
});

export const commentsBase = z.object({
  subject_to: z.string(),
  created_at: z.date(),
  comments: z.array(z.string()).default([]),
});

export type CommentBaseType = z.infer<typeof commentBase>;
export type CommentsType = z.infer<typeof commentsBase>;
