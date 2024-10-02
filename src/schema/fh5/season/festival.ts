import { z } from 'zod';

import { documentBase, documentID } from '@/schema/base';

import { reward, rewards } from './reward';
import { festivalSeasonTODO } from './todo';

const monthlyRivals = z.object({});

const startEndDates = z.object({
  startDate: z.date(),
  endDate: z.date(),
});
export type FestivalDateInput = z.input<typeof startEndDates>;

const festivalNameNumber = z.object({
  name: z.string(),
  number: z.number().gte(1),
});

export type FestivalNameNumberInput = z.input<typeof festivalNameNumber>;

export const festival = documentBase
  .merge(startEndDates)
  .merge(festivalNameNumber)
  .merge(rewards)
  .merge(
    z.object({
      monthlyRivals: z.array(monthlyRivals).default([]),

      series: z.array(z.string()).default([]),

      prev: z.optional(z.string()),
      next: z.optional(z.string()),
    }),
  );

export type FestivalInput = z.input<typeof festival>;
export type Festival = z.infer<typeof festival>;

export const festivalDefault: Festival = {
  startDate: new Date(2024, 9, 12),
  endDate: new Date(2024, 10, 10),
  monthlyRivals: [],
  name: '',
  number: 10,
  rewards: [],
  series: [],
  next: '',
  prev: '',
};

export const festivalSeries = documentBase
  .merge(startEndDates)
  .merge(rewards)
  .merge(
    z.object({
      season: z.string(),
      weeklyChallenge: z.string(),
      dailyChallenge: z.array(z.string()).default([]),

      mexico: z.array(z.string()).default([]),
      rally: z.array(z.string()).default([]),
      hotWheels: z.array(z.string()).default([]),

      prev: z.optional(z.string()),
      next: z.optional(z.string()),
    }),
  );
