import { z } from 'zod';

export const tagHorizontalRelation = z.object({
  mergedTo: z.optional(z.string()),
  mergedFrom: z.optional(z.array(z.string()).default([])),
});

export const tagVerticalRelation = z.object({
  parent: z.optional(z.string()),
  children: z.optional(z.array(z.string()).default([])),
});
