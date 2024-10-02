import { z } from 'zod';

export const tuningPerformance = z.object({
  acceleration: z.optional(
    z
      .number()
      .min(0, { message: 'it should be over 0' })
      .max(10, { message: 'it should be less than 10' }),
  ),
  speed: z.optional(
    z
      .number()
      .min(0, { message: 'it should be over 0' })
      .max(10, { message: 'it should be less than 10' }),
  ),
  braking: z.optional(
    z
      .number()
      .min(0, { message: 'it should be over 0' })
      .max(10, { message: 'it should be less than 10' }),
  ),
  offroad: z.optional(
    z
      .number()
      .min(0, { message: 'it should be over 0' })
      .max(10, { message: 'it should be less than 10' }),
  ),
  launch: z.optional(
    z
      .number()
      .min(0, { message: 'it should be over 0' })
      .max(10, { message: 'it should be less than 10' }),
  ),
  handling: z.optional(
    z
      .number()
      .min(0, { message: 'it should be over 0' })
      .max(10, { message: 'it should be less than 10' }),
  ),
});
