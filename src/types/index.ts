import { DrivingSystemType, EngineType, SuspensionType, TireType } from './car';
import { Tags } from './tag';
import { TrackInfo } from './track';

type PIClass = 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';
type GAME = 'FH5' | 'FH4';

export type {
  GAME,
  EngineType,
  Tags,
  TrackInfo,
  PIClass,
  DrivingSystemType,
  SuspensionType,
  TireType,
};
