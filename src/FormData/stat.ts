import { z } from 'zod';

const statEditSchemaBase = z.object({
  id: z.optional(z.string()), // 스탯 자체 DocumentID
  carID: z.optional(z.string()), // 스탯 대상 자동차
});

const _FH5_PerformanceStat = z.object({
  PI: z.optional(z.number().gte(100).lte(999)),

  speed: z.optional(z.number().gte(0).lte(10)),
  handling: z.optional(z.number().gte(0).lte(10)),
  acceleration: z.optional(z.number().gte(0).lte(10)),
  launch: z.optional(z.number().gte(0).lte(10)),
  braking: z.optional(z.number().gte(0).lte(10)),
  offroad: z.optional(z.number().gte(0).lte(10)),
});

export const FH5_PerformanceStat = statEditSchemaBase.merge(_FH5_PerformanceStat);

export type FH5_PerformanceStatSchema = z.infer<typeof FH5_PerformanceStat>;

export const FH5_PerformanceStatSchemaDefault: FH5_PerformanceStatSchema = {
  carID: undefined,
  PI: undefined,
  speed: undefined,
  handling: undefined,
  acceleration: undefined,
  launch: undefined,
  braking: undefined,
  offroad: undefined,
};
