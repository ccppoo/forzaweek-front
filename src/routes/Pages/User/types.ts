import type { RoutesBase } from '@/routes/types';

enum UserPages {
  Profile,
}

type RoutesUser = RoutesBase<UserPages>;

export { UserPages };
export type { RoutesUser };
