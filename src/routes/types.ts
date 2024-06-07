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
  Tracks,
  TrackDetail,
  Tunings,
  TuningDetail,
  Data,
  DataWrite,
  DataEdit,
  NotFound,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  dev?: boolean;
  devUrl?: string;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
