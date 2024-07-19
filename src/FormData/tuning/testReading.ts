import { z } from 'zod';

import type * as Unit from '@/types/units';

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

export type TuningTestReadingType = z.infer<typeof tuningTestReading>;

export const tuningTestReadingDefault: TuningTestReadingType = {
  maxspeed: {
    value: 100,
    unit: 'km/h' as Unit.SpeedUnit,
  },
  zero100: {
    value: 10.0,
    unit: 'km/h' as Unit.SpeedUnit,
  },
  output: {
    value: 300,
    unit: 'PS' as Unit.PowerUnit,
  },
  torque: {
    value: 80,
    unit: 'kg·m' as Unit.TorqueUnit,
  },
  weight: {
    value: 1200,
    unit: 'kg' as Unit.WeightUnit,
  },
  skid_pad: {
    value: 1.4,
    unit: 'Gs' as Unit.SkidPadUnit,
  },
};
