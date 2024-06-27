import { z } from 'zod';

const testReadingValue = z.object({
  value: z.optional(z.number()),
  unit: z.optional(z.string()),
});
export type TestReadingValueType = z.infer<typeof testReadingValue>;

export const tuningTestReading = z.object({
  maxspeed: testReadingValue,
  zero100: testReadingValue,
  output: testReadingValue,
  tork: testReadingValue,
  weight: testReadingValue,
  skid_pad: testReadingValue,
});

export type TuningTestReadingType = z.infer<typeof tuningTestReading>;

export const tuningTestReadingDefault: TuningTestReadingType = {
  maxspeed: {
    value: 100,
    unit: 'km/h',
  },
  zero100: {
    value: 10.0,
    unit: 'km/h',
  },
  output: {
    value: 300,
    unit: 'ps',
  },
  tork: {
    value: 80,
    unit: 'kg·m',
  },
  weight: {
    value: 1200,
    unit: 'kg',
  },
  skid_pad: {
    value: 1.4,
    unit: undefined,
  },
};
