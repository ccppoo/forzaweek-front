import { z } from 'zod';

import { documentBase, documentID } from '@/schema/base';
import { i18nMap } from '@/schema/i18n';
import type { FH5_Category, FH5_Format, FH5_World } from '@/types/fh5/race_route';

const fullPathImage = z.object({
  zoom_out: z.optional(z.string()),
  zoom_in: z.optional(z.string()),
});

const coordinateImage = z.object({
  x: z.number(),
  y: z.number(),
  imageURL: z.string(),
});

const raceRouteFH5Trait = z.object({
  world: z.string(),
  laps: z.number().int().gte(0),
  category: z.string(),
  raceFormat: z.string(),
  event: z.optional(z.string()),
});

const _raceRouteFH5 = documentBase.merge(
  z.object({
    name: i18nMap,
    nameTranslated: i18nMap,
    description: i18nMap,

    imageURLs: z.array(z.string()).default([]),
    fullPathImage: fullPathImage,
    coordinateImages: z.array(coordinateImage).default([]),
    iconURL: z.string(),
  }),
);

export const raceRouteFH5 = _raceRouteFH5.merge(raceRouteFH5Trait);
