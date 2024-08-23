import { z } from 'zod';

import { _searchResultBase } from './response';

const tagCategoryPopulated = _searchResultBase.extend({
  id: z.string(),
});
const tagItemPopulatedBase = _searchResultBase.extend({
  id: z.string(),
});

export const tagItemPopulated = tagItemPopulatedBase.extend({
  // name
  // image_url
  id: z.string(),
  category: z.optional(tagCategoryPopulated),
  merged_to: z.optional(tagItemPopulatedBase), // 이거 재귀된거
  parent: z.optional(tagItemPopulatedBase), // 이거 재귀된거
});

export type TagCategoryPopulated = z.infer<typeof tagCategoryPopulated>;
export type TagItemPopulatedBase = z.infer<typeof tagItemPopulatedBase>;
export type TagItemPopulated = z.infer<typeof tagItemPopulated>;
