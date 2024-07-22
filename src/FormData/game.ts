import { z } from 'zod';

export const gameBase = z.object({
  game: z.optional(z.string()), // 어떤 Game에 관련된 내용인지
});

export const FH5_Base = z.object({
  game: z.string().default('FH5'),
});

export const FH4_Base = z.object({
  game: z.string().default('FH4'),
});

export type GameBase = z.infer<typeof gameBase>;
