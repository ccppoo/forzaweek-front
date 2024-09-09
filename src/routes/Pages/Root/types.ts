import type { RoutesBase } from '@/routes/types';

enum RootPages {
  Home,
  Dev,
  NotFound,
}

type RoutesRoot = RoutesBase<RootPages>;

export { RootPages };
export type { RoutesRoot };
