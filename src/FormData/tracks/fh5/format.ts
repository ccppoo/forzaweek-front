import { z } from 'zod';

import { TrackFormatTopologies, TrackFormats } from '@/types/fh5';
import { toZodLiteral } from '@/utils/zod';

const trackFormats = toZodLiteral(TrackFormats);
const trackFormatTopologies = toZodLiteral(TrackFormatTopologies);

export const trackFormat = z.object({
  format: z.optional(trackFormats),
  laps: z.optional(z.number().gte(1)),
});

export type TrackFormat = z.infer<typeof trackFormat>;
