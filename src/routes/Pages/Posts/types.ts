import type { RoutesBase } from '@/routes/types';

enum PostsPages {
  Write,
  Edit,
  List,
  Read,
}

type RoutesPosts = RoutesBase<PostsPages>;

export { PostsPages };
export type { RoutesPosts };
