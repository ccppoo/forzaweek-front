import { z } from 'zod';

import { Tag } from '@/FormData/tag';

import { tuningDetailed, tuningDetailedDefault } from './detailed';
import { tuningMajorParts, tuningMajorPartsDefault } from './majorParts';
import { tuningPerformance, tuningPerformanceDefault } from './performance';
import { tuningTestReading, tuningTestReadingDefault } from './testReading';

export const tuningEditSchema = z.object({
  id: z.optional(z.string()), // 튜닝 글 작성 자체 DocumnetID

  share_code: z.optional(z.string()), // 공유코드
  car: z.optional(z.string()), // 차 (id)
  creator: z.optional(z.string()), // 튜닝 제작자

  tags: z.array(z.string()), // 튜닝 태그
  pi: z.optional(z.number().min(100).max(999)),
  performance: tuningPerformance, // 성능 레이더 차트
  testReadings: tuningTestReading, // 성능 지표
  tuningMajorParts: tuningMajorParts,
  detailedTuning: z.optional(tuningDetailed), // 세부 튜닝
});
export type TuningEditSchema = z.infer<typeof tuningEditSchema>;

export const tuningEditSchemaDefault: TuningEditSchema = {
  share_code: undefined, // 공유코드
  car: undefined, // 차 (id)
  creator: undefined, // 튜닝 제작자

  tags: [], // 튜닝 태그
  pi: 800,
  performance: tuningPerformanceDefault,
  testReadings: tuningTestReadingDefault,
  tuningMajorParts: tuningMajorPartsDefault,
  detailedTuning: tuningDetailedDefault,
};

// 태그는 최초 생성시 string으로 제공, 이후 서버에서 올 때는 무조건 general type으로 생성하고 반환됨
export const tuningSchemaType = z.object({
  id: z.string(), // 차 자체 DocumnetID

  share_code: z.string(), // 공유코드
  car: z.string(), // 차 (id)
  creator: z.string(), // 데칼 제작자

  tags: z.array(Tag.tagSchemaTypeExtended), // 튜닝 태그
  // tuning stat
  pi: z.number(), // PI 성능 - 클래스는 값 범위에 따라서 보여줌
  performance: tuningPerformance, // 성능 레이더 차트
  testReadings: tuningTestReading, // 성능 지표
  tuningMajorParts: tuningMajorParts, // 튜닝 주요 부품 - 서스펜션, 타이어, AWD/RWD/FWD
  detailedTuning: tuningDetailed, // 세부 튜닝
});
export type TuningSchemaType = z.infer<typeof tuningSchemaType>;
