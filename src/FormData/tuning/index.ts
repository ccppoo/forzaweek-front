import { z } from 'zod';

import { documentBase } from '@/FormData/base';
import { tag } from '@/FormData/post';
import { car, sharingCreation, track } from '@/FormData/post/sharingCreation';

import { tuningDetailed, tuningDetailedDefault } from './detailed';
import { tuningMajorParts, tuningMajorPartsDefault } from './majorParts';
import { tuningPerformance, tuningPerformanceDefault } from './performance';
import { tuningTestReading, tuningTestReadingDefault } from './testReading';

export const tuningEditSchema = documentBase
  .merge(sharingCreation)
  .merge(car.carDependent)
  // .merge(tag.tagDependent)
  .merge(
    z.object({
      pi: z.optional(z.number().min(100).max(999)), // PI
    }),
  )
  .merge(
    z.object({
      performance: tuningPerformance, // 성능 레이더 차트
    }),
  )
  .merge(
    z.object({
      testReadings: tuningTestReading, // 성능 지표
    }),
  )
  .merge(
    z.object({
      tuningMajorParts: tuningMajorParts, // 주요 부품
    }),
  )
  .merge(
    z.object({
      detailedTuning: z.optional(tuningDetailed), // 세부 튜닝
    }),
  );

export type TuningEditSchema = z.infer<typeof tuningEditSchema>;

export const tuningEditSchemaDefault: TuningEditSchema = {
  share_code: undefined, // 공유코드
  car: undefined, // 차 (id)
  creator: undefined, // 튜닝 제작자

  // tags: [], // 튜닝 태그
  pi: 800,
  performance: tuningPerformanceDefault,
  testReadings: tuningTestReadingDefault,
  tuningMajorParts: tuningMajorPartsDefault,
  detailedTuning: tuningDetailedDefault,
};

export const tuningSchemaType = tuningEditSchema.required({
  id: true,
  share_code: true,
  car: true,
  creator: true,
  // tags: true,
  pi: true,
  performance: true,
  testReadings: true,
  tuningMajorParts: true,
});

export type TuningSchemaType = z.infer<typeof tuningSchemaType>;
