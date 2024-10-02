import { z } from 'zod';

export const decalRead = z.object({
  id: z.string(), // 데칼 문서 id
  uploadedAt: z.date(),
  lastEdited: z.date(),
  shareCode: z.string(), // 공유코드
  gamerTag: z.string(), // 데칼 제작자
  uploader: z.string(),
  baseCar: z.string(),
  name: z.string(),
});

export type DecalRead = z.infer<typeof decalRead>;
const votedUser = z.object({
  up: z.array(z.string()).default([]),
  down: z.array(z.string()).default([]),
});

export const decalImageRead = z.object({
  id: z.string(), // 데칼 문서 id
  decalBase: z.string(),
  uploadedAt: z.date(),
  lastEdited: z.date(),

  images: z.array(z.string().url()).default([]),

  uploader: z.string(),
  up_votes: z.number().gte(0),
  down_votes: z.number().gte(0),
  voted: votedUser,
  faved: z.boolean().default(false),
});

export type DecalImageRead = z.infer<typeof decalImageRead>;
