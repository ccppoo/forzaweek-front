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

export type TuningPerformanceType = z.infer<typeof tuningPerformance>;

export const _FH5PerformanceSchemaType = z.object({
  rarity: z.string(),
  boost: z.string(),
  value: z.number().gte(0),
  division: z.string(),
});

export type FH5PerformanceSchemaType = z.infer<typeof _FH5PerformanceSchemaType>;

export const tuningPerformanceDefault: TuningPerformanceType = {
  acceleration: 6.0,
  speed: 6.0,
  braking: 6.0,
  offroad: 6.0,
  launch: 6.0,
  handling: 6.0,
};
