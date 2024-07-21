import { z } from 'zod';

import { Worlds } from '@/types/fh5';
import { toZodLiteral } from '@/utils/zod';

const worlds_fh5 = toZodLiteral(Worlds);

export const trackWorld = z.object({
  world: z.optional(worlds_fh5),
});

export type TrackWorld = z.infer<typeof trackWorld>;
