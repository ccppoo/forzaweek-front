import { z } from 'zod';

export const reward = z.object({
  car: z.optional(z.string()),
  forzaLink: z.optional(z.string()),
  clothing: z.optional(z.string()),
  emote: z.optional(z.string()),
  superWheelSpin: z.number().gte(0),
  wheelSpin: z.number().gte(0),
});

export const rewards = z.object({
  rewards: z.array(reward).default([]),
});

export type RewardInput = z.input<typeof reward>;
export type Reward = z.infer<typeof reward>;
export type RewardsInput = z.input<typeof rewards>;

export const rewardDefault: Reward = {
  car: undefined,
  forzaLink: undefined,
  clothing: undefined,
  emote: undefined,
  superWheelSpin: 0,
  wheelSpin: 0,
};
