import { z } from 'zod';

import { DrivingSystemTypes } from '@/types/car';
import { toZodLiteral } from '@/utils/zod';

const drivingSystems = toZodLiteral(DrivingSystemTypes);

export const DrivingSystemTypeSchema = drivingSystems;
export type DrivingSystemType = z.infer<typeof DrivingSystemTypeSchema>;
