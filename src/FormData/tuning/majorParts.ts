import { z } from 'zod';

import { DrivingSystemTypeSchema } from './drivingSystem';

// TODO: 파츠 종류 -> type tierTypes = 'drift' | 'rally' | 'offroad' ... 이런식으로 만들 것
export const tuningMajorParts = z.object({
  tier: z.optional(z.string()),
  suspension: z.optional(z.string()),
  drivingSystem: DrivingSystemTypeSchema,
});

export type TuningMajorPartsType = z.infer<typeof tuningMajorParts>;

export const tuningMajorPartsDefault: TuningMajorPartsType = {
  tier: 'normal',
  suspension: 'normal',
  drivingSystem: 'AWD',
};
