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

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  devHide?: boolean;
  devUrl?: string;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
