export type World = 'Mexico' | 'HotWheels' | 'SierraNueva';
export const Worlds: World[] = ['Mexico', 'HotWheels', 'SierraNueva'];

export type TrackCategory = 'crossCountry' | 'offRoad' | 'road' | 'street' | 'drag';
export const TrackCategories: TrackCategory[] = [
  'crossCountry',
  'offRoad',
  'road',
  'street',
  'drag',
];

export type TrackFormat =
  | 'circuit'
  | 'sprint'
  | 'scramble'
  | 'trail'
  | 'crossCountryCircuit'
  | 'crossCountry'
  | 'street'
  | 'drag'
  | 'goliath'
  | 'colossus'
  | 'marathon'
  | 'juggernaut'
  | 'gauntlet'
  | 'titan';
export const TrackFormats: TrackFormat[] = [
  'circuit',
  'sprint',
  'scramble',
  'trail',
  'street',
  'drag',
  'crossCountryCircuit',
  'crossCountry',
  'goliath',
  'colossus',
  'marathon',
  'juggernaut',
  'gauntlet',
  'titan',
];

export type TrackFormatTopology = 'linear' | 'circular';
export const TrackFormatTopologies: TrackFormatTopology[] = ['linear', 'circular'];

export const CircularFormats: TrackFormat[] = [
  'circuit',
  'crossCountryCircuit',
  'scramble',
  'goliath',
];

export const LinearFormats: TrackFormat[] = [
  'sprint',
  'trail',
  'street',
  'crossCountry',
  'colossus',
  'marathon',
  'juggernaut',
  'gauntlet',
  'titan',
];

export const RoadFormats: TrackFormat[] = ['circuit', 'goliath', 'sprint', 'colossus'];

export const StreetFormats: TrackFormat[] = ['street', 'marathon'];
export const OffRoadFormats: TrackFormat[] = ['scramble', 'trail', 'juggernaut', 'gauntlet'];
export const CrossCountryFormats: TrackFormat[] = ['crossCountryCircuit', 'crossCountry', 'titan'];
export const DragFormats: TrackFormat[] = ['drag'];
