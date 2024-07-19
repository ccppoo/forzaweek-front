import { z } from 'zod';

import { DrivingSystemTypes } from '@/types/car';

const literalToZod = (literalType: any[]) => z.custom<string>((val) => literalType.includes(val));
const drivingSystems = literalToZod(DrivingSystemTypes);

export const DrivingSystemTypeSchema = drivingSystems;
export type DrivingSystemType = z.infer<typeof DrivingSystemTypeSchema>;
