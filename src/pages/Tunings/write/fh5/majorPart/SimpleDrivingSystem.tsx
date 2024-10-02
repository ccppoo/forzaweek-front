import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';
import type { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox, Image } from '@/components/styled';
import { drivingSystem } from '@/image/tuning';
import type { TuningMajorPartsType } from '@/schema/fh5/tuning/majorParts';

export default function TuningMajorPartsDrivingSystem<T extends TuningMajorPartsType>() {
  const { control, watch, getValues, formState } = useFormContext<T>();

  const formPath = `tuningMajorParts.drivingSystem` as FieldPath<T>;
  const unitChoiceWidth = 150;
  const Name = 'Driving System';
  const choies = ['AWD', 'RWD', 'FWD'];

  const isFormError = formState.errors.drivingSystem;
  const errorMessage = formState.errors.drivingSystem?.message;

  const DS_choice = [
    {
      name: 'AWD',
      image: drivingSystem.AWD,
    },
    {
      name: 'FWD',
      image: drivingSystem.FWD,
    },
    {
      name: 'RWD',
      image: drivingSystem.RWD,
    },
  ];

  return (
    <TextField
      select
      defaultValue={getValues(formPath) || 'AWD'}
      inputProps={control.register(formPath, {
        required: 'Please select AWD/RWD/FWD',
      })}
      fullWidth
      error={!!isFormError}
      helperText={!!errorMessage}
      SelectProps={{
        MenuProps: { sx: { maxHeight: 350, padding: 0 } },
      }}
      sx={{ padding: 0 }}
      size="small"
    >
      {DS_choice.map((choice) => (
        <MenuItem key={`major-parts-ds-${choice.name}`} value={choice.name}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <Image src={choice.image} sx={{ objectFit: 'contain', height: 40 }} />
            <FlexBox sx={{ alignItems: 'center', paddingX: 1, paddingY: 1 }}>
              <Typography fontWeight={500} fontSize={15}>
                {choice.name}
              </Typography>
            </FlexBox>
          </FlexBox>
        </MenuItem>
      ))}
    </TextField>
  );
}

export function FieldArrayTuningMajorPartsDrivingSystem<T extends FieldValues>({
  register,
  formPath,
  watch,
}: {
  register: UseFormRegister<T>;
  formPath: FieldPath<T>;
  watch: UseFormWatch<T>;
}) {
  // const { control, watch, getValues, formState } = useFormContext<T>();

  // const formPath = `tuningMajorParts.drivingSystem` as FieldPath<T>;
  const unitChoiceWidth = 150;
  const Name = 'Driving System';
  const choies = ['AWD', 'RWD', 'FWD'];

  // const isFormError = formState.errors.drivingSystem;
  // const errorMessage = formState.errors.drivingSystem?.message;

  const DS_choice = [
    {
      name: 'AWD',
      image: drivingSystem.AWD,
    },
    {
      name: 'FWD',
      image: drivingSystem.FWD,
    },
    {
      name: 'RWD',
      image: drivingSystem.RWD,
    },
  ];
  const DSValue = watch(formPath);

  return (
    <Select<'AWD' | 'FWD' | 'RWD'>
      // defaultValue={getValues(formPath) || 'AWD'}
      // inputProps={control.register(formPath, {
      //   required: 'Please select AWD/RWD/FWD',
      // })}
      value={DSValue}
      {...register(formPath, {})}
      fullWidth
      // error={!!isFormError}
      // helperText={!!errorMessage}
      // SelectProps={{
      //   MenuProps: { sx: { maxHeight: 350, padding: 0 } },
      // }}
      sx={{ padding: 0 }}
      size="small"
    >
      {DS_choice.map((choice) => (
        <MenuItem key={`major-parts-ds-${choice.name}`} value={choice.name}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <Image src={choice.image} sx={{ objectFit: 'contain', height: 40 }} />
            <FlexBox sx={{ alignItems: 'center', paddingX: 1, paddingY: 1 }}>
              <Typography fontWeight={500} fontSize={15}>
                {choice.name}
              </Typography>
            </FlexBox>
          </FlexBox>
        </MenuItem>
      ))}
    </Select>
  );
}
