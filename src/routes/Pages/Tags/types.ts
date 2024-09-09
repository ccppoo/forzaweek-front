import type { RoutesBase } from '@/routes/types';

enum TagsPages {
  Tags,
  TagList,
  TagDetail,
}

type RoutesTags = RoutesBase<TagsPages>;

export { TagsPages };
export type { RoutesTags };
