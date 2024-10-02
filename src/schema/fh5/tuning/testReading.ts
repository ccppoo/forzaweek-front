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
  torque: testReadingValue,
  weight: testReadingValue,
  skid_pad: testReadingValue,
});
