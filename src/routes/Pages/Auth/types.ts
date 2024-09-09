import type { RoutesBase } from '@/routes/types';

enum AuthPages {
  Login,
  Callback,
}

type RoutesAuths = RoutesBase<AuthPages>;

export { AuthPages };
export type { RoutesAuths };
