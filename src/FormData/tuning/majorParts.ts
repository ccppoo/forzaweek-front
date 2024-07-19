import { z } from 'zod';

import { DrivingSystemTypeSchema } from './drivingSystem';

// TODO: 파츠 종류 -> type tireTypes = 'drift' | 'rally' | 'offroad' ... 이런식으로 만들 것
export const tuningMajorParts = z.object({
  tire: z.optional(z.string()),
  suspension: z.optional(z.string()),
  drivingSystem: DrivingSystemTypeSchema,
});

export type TuningMajorPartsType = z.infer<typeof tuningMajorParts>;

export const tuningMajorPartsDefault: TuningMajorPartsType = {
  tire: 'normal',
  suspension: 'normal',
  drivingSystem: 'AWD',
};
