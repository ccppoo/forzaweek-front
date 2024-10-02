import { z } from 'zod';

import { documentBase, documentID } from '@/schema/base';

import { tuningDetailed } from './detailed';
import { tuningMajorParts } from './majorParts';
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

export const tuningEditSchema = documentBase
  .merge(sharingCreation)
  .merge(carDependent)
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
