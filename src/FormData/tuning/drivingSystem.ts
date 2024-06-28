import { z } from 'zod';

export const DrivingSystemTypeSchema = z.union([
  z.literal('AWD'),
  z.literal('RWD'),
  z.literal('FWD'),
]);
export type DrivingSystemType = z.infer<typeof DrivingSystemTypeSchema>;
