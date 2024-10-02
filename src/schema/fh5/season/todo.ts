import { z } from 'zod';

import { documentBase, documentID } from '@/schema/base';

import { carLimit } from './carLimit';
import { reward } from './reward';

export const festivalSeasonTODO = documentBase.merge(
  z.object({
    world: z.string(),
    seasonPoint: z.number().gte(0),
    carLimit: carLimit,
    reward: reward,
  }),
);

const photoChallenge = z
  .object({
    description: z.string(),
  })
  .merge(festivalSeasonTODO);

const horizonOpenTODO = z.object({}).merge(festivalSeasonTODO);

const horizonTourTODO = z.object({}).merge(festivalSeasonTODO);

const treasureHunt = z.object({}).merge(festivalSeasonTODO);

const weeklyChallenge = z
  .object({
    chapter: z.array(z.string()).default([]),
  })
  .merge(festivalSeasonTODO);

const dailyChallenge = z
  .object({
    startDate: z.date(),
    description: z.string(),
  })
  .merge(festivalSeasonTODO);

const dailyChallenges = z.object({
  dailyChallenges: z.array(dailyChallenge).default([]),
});

const eventLabTODO = z
  .object({
    eventLab: z.string(),
  })
  .merge(festivalSeasonTODO);

const stuntTODO = z
  .object({
    stuntType: z.string(),
    stunt: z.string(),
  })
  .merge(festivalSeasonTODO);

const challengeTODO = z
  .object({
    raceRoutes: z.array(z.string()).default([]),
  })
  .merge(festivalSeasonTODO);

const seasonChampionship = z
  .object({
    raceRoutes: z.array(z.string()).default([]),
  })
  .merge(festivalSeasonTODO);

const monthlyRivalTODO = z
  .object({
    raceRoute: z.string(),
  })
  .merge(festivalSeasonTODO);

export {
  photoChallenge,
  horizonOpenTODO,
  horizonTourTODO,
  treasureHunt,
  weeklyChallenge,
  dailyChallenge,
  dailyChallenges,
  eventLabTODO,
  stuntTODO,
  challengeTODO,
  seasonChampionship,
  monthlyRivalTODO,
};
