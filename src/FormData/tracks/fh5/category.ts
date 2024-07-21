import { z } from 'zod';

import { TrackCategories } from '@/types/fh5';
import { toZodLiteral } from '@/utils/zod';

const trackCategories = toZodLiteral(TrackCategories);

export const trackCategory = z.object({
  category: z.optional(trackCategories),
});

export type TrackCategory = z.infer<typeof trackCategory>;
