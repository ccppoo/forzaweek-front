import { z } from 'zod';

export const carLimit = z.object({
  carFH5: z.array(z.string()).default([]),
  carOrigin: z.array(z.string()).default([]),
  PI: z.optional(z.number().gte(500).lte(999)),
  division: z.array(z.string()).default([]),
  manufacturer: z.array(z.string()).default([]),
});
