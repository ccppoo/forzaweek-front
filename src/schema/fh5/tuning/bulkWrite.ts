import { z } from 'zod';

import { documentBase, documentID } from '@/schema/base';
import { tags } from '@/schema/tag';

import { tuningDetailed } from './detailed';
import { drivingsystem, tuningMajorParts } from './majorParts';
import { tuningPerformance } from './performance';
import { tuningTestReading } from './testReading';

export const carDependent = z.object({
  car: z.optional(z.string()), // 차 (id)
});

export const sharingCreation = z.object({
  shareCode: z.optional(z.string()), // 공유코드
  gamerTag: z.optional(z.string()), // 창작물 제작자
  name: z.optional(z.string()), // 데칼, 튜닝 이름
});

const pi = z.object({
  pi: z.optional(z.number().min(100).max(999)), // PI
});

export type PI = z.infer<typeof pi>;

export const tuning = documentBase
  .merge(sharingCreation)
  .merge(carDependent)
  .merge(pi)
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

const tuningSimple = documentBase
  .merge(sharingCreation)
  .merge(carDependent)
  .merge(pi)
  .merge(
    z.object({
      drivingSystem: drivingsystem,
    }),
  );

export type TuningInput = z.input<typeof tuning>;
export type TuningType = z.infer<typeof tuning>;

const tuningWrite = tuning.merge(tags);

const tuningSimpleWrite = tuningSimple.merge(tags);

export type TuningWriteInput = z.input<typeof tuningWrite>;
export type TuningWriteType = z.infer<typeof tuningWrite>;

export type TuningSimpleWriteInput = z.input<typeof tuningSimpleWrite>;
export type TuningSimpleWriteType = z.infer<typeof tuningSimpleWrite>;

const tuningBulkWrite = z.object({
  tunings: z.array(tuning).default([]),
});

export type TuningBulkWriteInput = z.input<typeof tuningBulkWrite>;
export type TuningBulkWriteType = z.infer<typeof tuningBulkWrite>;
