import type { FieldName } from 'react-hook-form';

import type { TuningEditSchema } from '@/FormData/tuning';

export const getFormPath: (base: string[], depth: string[]) => FieldName<TuningEditSchema> = (
  base: string[],
  depth: string[],
) => base.concat(depth).join('.') as FieldName<TuningEditSchema>;
