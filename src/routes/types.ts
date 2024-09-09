import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  Home,
  DEV,
  Cars,
  CarDetail,
  Decals,
  DecalDetail,
  DecalWrite,
  Tracks,
  TrackDetail,
  TrackWrite,
  Tunings,
  TuningDetail,
  TuningWrite,
  UserProfile,
  Tags,
  TagList,
  TagDetail,
  Data,
  DataList,
  DataWrite,
  DataEdit,
  NotFound,
  BoardWrite,
  BoardPostEdit,
  BoardRead,
  Login,
  CallBack,
}

enum GeneralPages {
  Home,
  DEV,
  UserProfile,
  Tags,
  TagList,
  TagDetail,
  Data,
  DataList,
  DataWrite,
  DataEdit,
  NotFound,
  BoardWrite,
  BoardPostEdit,
  BoardRead,
  Login,
  CallBack,
}

enum FH5 {
  Cars,
  CarDetail,
  Decals,
  DecalDetail,
  DecalWrite,
  Tracks,
  TrackDetail,
  TrackWrite,
  Tunings,
  TuningDetail,
  TuningWrite,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  devHide?: boolean;
  devUrl?: string;
};

export type RoutesBase<T extends string | number | symbol> = Record<
  T,
  PathRouteProps & PathRouteCustomProps
>;

export type RoutesBaseDev = PathRouteProps & Omit<PathRouteCustomProps, 'component'>;

export type RouteItem = PathRouteProps & PathRouteCustomProps;

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;
type RoutesFH5 = RoutesBase<FH5>;
type RoutesGeneral = RoutesBase<GeneralPages>;

type RoutesEssential = {
  prefix: string;
  routes: RoutesBase<any>;
};

type RotuesRoot = {
  rootPrefix: string;
  routeItems: RoutesEssential[];
};

export type { Routes, RoutesFH5, RoutesEssential, RotuesRoot };
export { Pages };
