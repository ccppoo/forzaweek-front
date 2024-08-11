import { z } from 'zod';

export const blockSchemaBase = z.object({
  id: z.optional(z.string()),
  type: z.string(),
  tunes: z.optional(z.any()).default({}),
});
