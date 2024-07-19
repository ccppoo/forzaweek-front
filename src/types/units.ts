type PowerUnit = 'hp' | 'PS' | 'kW';
type SpeedUnit = 'km/h' | 'mph';
type SpringUnit = 'N/Mm' | 'LB/IN' | 'KGF/MM';
type SpringHeightUnit = 'CM' | 'IN';
type DownForceUnit = 'LB' | 'KGF';
type SkidPadUnit = 'Gs';
type WeightUnit = 'kg' | 'lbs';
type TorqueUnit = 'kg·m' | 'ft⋅lb'; //'N⋅m'
type PressureUnit = 'Pa' | 'bar' | 'psi';

const PowerUnits: PowerUnit[] = ['hp', 'PS', 'kW'];
const SpeedUnits: SpeedUnit[] = ['km/h', 'mph'];
const SpringUnits: SpringUnit[] = ['N/Mm', 'LB/IN', 'KGF/MM'];
const SpringHeightUnits: SpringHeightUnit[] = ['CM', 'IN'];
const DownForceUnits: DownForceUnit[] = ['LB', 'KGF'];
const SkidPadUnits: SkidPadUnit[] = ['Gs'];
const WeightUnits: WeightUnit[] = ['kg', 'lbs'];
const TorqueUnits: TorqueUnit[] = ['kg·m', 'ft⋅lb'];
const PressureUnits = ['Pa', 'bar', 'psi'];

export type {
  PowerUnit,
  SpeedUnit,
  SpringUnit,
  SpringHeightUnit,
  DownForceUnit,
  SkidPadUnit,
  WeightUnit,
  TorqueUnit,
  PressureUnit,
};

export {
  PowerUnits,
  SpeedUnits,
  SpringUnits,
  SpringHeightUnits,
  DownForceUnits,
  SkidPadUnits,
  WeightUnits,
  TorqueUnits,
  PressureUnits,
};
