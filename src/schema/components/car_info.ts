import { z } from 'zod';

const productionYear = z.object({
  productionYear: z.number().gte(1900).lte(2600),
});

// TODO: engine type -> literal ICE, HVE, EV, HV
const engineType = z.object({
  engineType: z.string(),
});

// NOTE: body style is subjective so it's array
const bodyStyle = z.object({
  bodyStyle: z.array(z.string()).default([]),
});

const door = z.object({
  door: z.number().gte(0).lte(100),
});

export const carBaseInfo = productionYear.merge(engineType).merge(bodyStyle).merge(door);
