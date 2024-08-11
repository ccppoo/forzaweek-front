import { z } from 'zod';

import { blockSchemaBase } from './base';

const imageBlockData = z.object({
  caption: z.string({ description: 'plain string' }).default(''),
  withBorder: z.boolean().default(false),
  withBackground: z.boolean().default(false),
  stretched: z.boolean().default(false),
  file: z.object({
    url: z.string().url(),
  }),
});

export const imageBlockSchema = blockSchemaBase.merge(z.object({ data: imageBlockData }));

export type ImageBlockSchemaType = z.infer<typeof imageBlockSchema>;

const img = {
  id: 'ZyOSIajUUS',
  type: 'image',
  data: {
    caption: '',
    withBorder: false,
    withBackground: false,
    stretched: false,
    file: {
      url: 'https://fzwcdn.forzaweek.com/user/upload/4b65b078-e0a1-4d28-ae02-62f77ac912f9.png',
    },
  },
};
