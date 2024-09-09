import type { RoutesBase } from '@/routes/types';

enum FH5_Car {
  Cars,
  CarDetail,
}

enum FH5_Decal {
  Decals,
  DecalDetail,
  DecalWrite,
}

enum FH5_VynilGroups {
  VynilGroups,
  VynilGroupDetail,
  VynilGroupWrite,
}

enum FH5_RaceRoute {
  RaceRoutes,
  RaceRouteDetail,
  RaceRouteWrite,
}

enum FH5_Tuning {
  Tunings,
  TuningDetail,
  TuningWrite,
}

type RoutesFH5Car = RoutesBase<FH5_Car>;
type RoutesFH5Decal = RoutesBase<FH5_Decal>;
type RoutesFH5VynilGroups = RoutesBase<FH5_VynilGroups>;
type RoutesFH5RaceRoute = RoutesBase<FH5_RaceRoute>;
type RoutesFH5Tuning = RoutesBase<FH5_Tuning>;

export { FH5_Car, FH5_Decal, FH5_VynilGroups, FH5_RaceRoute, FH5_Tuning };
export type {
  RoutesFH5Car,
  RoutesFH5Decal,
  RoutesFH5VynilGroups,
  RoutesFH5RaceRoute,
  RoutesFH5Tuning,
};
