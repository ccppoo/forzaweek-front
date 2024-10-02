import type { RoutesBase } from '@/routes/types';

enum TagsPages {
  Tags,
  TagList,
  TagDetail,
  TagEdit,
  TagCreate,
  TagCategroyCreate,
  TagCategroyEdit,
  TagCategoryDetail,
}

type RoutesTags = RoutesBase<TagsPages>;

export { TagsPages };
export type { RoutesTags };
