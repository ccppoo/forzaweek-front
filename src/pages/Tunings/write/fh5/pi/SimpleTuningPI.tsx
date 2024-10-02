import { FocusEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';
import type { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { Button, Paper, Typography } from '@mui/material';
import { ButtonBase } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import { PI_Card } from '@/components/PI';
import { FlexBox } from '@/components/styled';
import type { PI } from '@/schema/fh5/tuning/bulkWrite';
import type { PIClass } from '@/types';
import { get_pi_class, get_pi_color, get_pi_color_by_class } from '@/utils/car';

export default function SimpleTuningPI<T extends PI>() {
  const { getValues, setValue, watch } = useFormContext<T>();

  const [age, setAge] = useState('');
  const PIformPath = 'pi' as FieldPath<T>;
  type PIValueType = PathValue<T, FieldPath<T>>;

  const handleChange = (event: SelectChangeEvent<number>) => {
    setValue(PIformPath, event.target.value as PIValueType);
  };

  const PIvalue = watch(PIformPath);
  const PIs = [500, 600, 700, 800, 900, 998, 999];

  return (
    <Select<number>
      defaultValue={800}
      value={PIvalue}
      onChange={handleChange}
      fullWidth={true}
      size="small"
      sx={{ height: 50 }}
      renderValue={(pi) => <PI_Card pi_number={pi} height={30} />}
    >
      {PIs.map((pi) => (
        <MenuItem value={pi} key={`PI-select-${pi}`}>
          <PI_Card pi_number={pi} height={30} />
        </MenuItem>
      ))}
    </Select>
  );
}

export function FieldArraySimpleTuningPI<T extends FieldValues>({
  register,
  formPath,
  watch,
}: {
  register: UseFormRegister<T>;
  formPath: FieldPath<T>;
  watch: UseFormWatch<T>;
}) {
  // const { getValues, setValue, watch } = useFormContext<T>();

  // const [age, setAge] = useState('');
  // const PIformPath = 'pi' as FieldPath<T>;
  // type PIValueType = PathValue<T, FieldPath<T>>;

  // const handleChange = (event: SelectChangeEvent<number>) => {
  //   setValue(PIformPath, event.target.value as PIValueType);
  // };

  const PIvalue = watch(formPath);
  const PIs = [500, 600, 700, 800, 900, 998, 999];

  return (
    <Select<number>
      defaultValue={800}
      value={PIvalue}
      // onChange={handleChange}
      fullWidth={true}
      size="small"
      sx={{ height: 50 }}
      renderValue={(pi) => <PI_Card pi_number={pi} height={30} />}
      {...register(formPath, {
        required: 'Please input creator of decal',
      })}
    >
      {PIs.map((pi) => (
        <MenuItem value={pi} key={`PI-select-${pi}`}>
          <PI_Card pi_number={pi} height={30} />
        </MenuItem>
      ))}
    </Select>
  );
}
