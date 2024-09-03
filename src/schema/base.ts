import { z } from 'zod';

// objectID
export const documentID = z.string();

export const documentBase = z.object({
  id: z.optional(documentID), // 데칼 글 작성 자체 DocumnetID
});
