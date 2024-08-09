import { z } from 'zod';

export const blockSchemaBase = z.object({
  id: z.string(),
  type: z.string(),
  tunes: z.any().default({}),
});
