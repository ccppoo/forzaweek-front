import { z } from 'zod';

const PI = z.object({
  PI: z.number().gte(100).lte(999),
});

// TODO: change to literal
const meta = z.object({
  division: z.string(),
  rarity: z.string(),
  boost: z.string().optional(),
  value: z.number().gte(10000),
});

const performance = z.object({
  speed: z.number().gte(1.0).lte(10),
  handling: z.number().gte(1.0).lte(10),
  acceleration: z.number().gte(1.0).lte(10),
  launch: z.number().gte(1.0).lte(10),
  braking: z.number().gte(1.0).lte(10),
  offroad: z.number().gte(1.0).lte(10),
});

export const carBaseStat = z
  .object({
    meta: meta,
    performance: performance,
  })
  .merge(PI);

// NOTE: used when car tuning posts
export const carStat = z
  .object({
    performance: performance,
  })
  .merge(PI);
