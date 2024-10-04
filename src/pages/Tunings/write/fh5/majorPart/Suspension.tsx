import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';
import type { FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form';

import { MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';

export default function TuningMajorPartsSuspension() {
  const { control, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathValue = `tuningMajorParts.suspension`;
  const unitChoiceWidth = 150;
  const Name = 'Suspension';
  const choies = ['normal', 'drift', 'rally', 'offroad', 'speed'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 4, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 6, columnGap: 1 }}>
          <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
            <TextField
              select
              defaultValue={getValues(formPathValue) || ''}
              inputProps={control.register(formPathValue, {
                required: 'Please select manufacturer',
              })}
              fullWidth
              error={!!formState.errors.testReadings?.maxspeed?.unit}
              helperText={!!formState.errors.testReadings?.maxspeed?.message}
              SelectProps={{
                MenuProps: { sx: { maxHeight: 350, padding: 0 } },
              }}
              sx={{ padding: 0 }}
              size="small"
            >
              {choies.map((choice) => (
                <MenuItem key={`major-parts-${Name}-${choice}`} value={choice}>
                  <FlexBox>
                    <FlexBox sx={{ alignItems: 'center', paddingX: 2, paddingY: 1 }}>
                      <Typography>{choice}</Typography>
                    </FlexBox>
                  </FlexBox>
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export function FieldArrayTuningMajorPartsSuspension<T extends FieldValues>({
  register,
  formPath,
  watch,
}: {
  register: UseFormRegister<T>;
  formPath: FieldPath<T>;
  watch: UseFormWatch<T>;
}) {
  // const { control, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathValue = `tuningMajorParts.suspension`;
  const unitChoiceWidth = 150;
  const Name = 'Suspension';
  const choies = ['normal', 'drift', 'rally', 'offroad', 'race', 'sports'];

  const Suspension_choice = [
    {
      name: 'normal',
      // image: drivingSystem.AWD,
    },
    {
      name: 'drift',
      // image: drivingSystem.FWD,
    },
    {
      name: 'rally',
      // image: drivingSystem.RWD,
    },
    {
      name: 'offroad',
      // image: drivingSystem.FWD,
    },
    {
      name: 'race',
      // image: drivingSystem.FWD,
    },
    {
      name: 'sports',
      // image: drivingSystem.RWD,
    },
  ];
  const DSValue = watch(formPath);

  return (
    // <TextField
    //   select
    //   // defaultValue={getValues(formPathValue) || ''}
    //   // inputProps={control.register(formPathValue, {
    //   //   required: 'Please select manufacturer',
    //   // })}
    //   fullWidth
    //   // error={!!formState.errors.testReadings?.maxspeed?.unit}
    //   // helperText={!!formState.errors.testReadings?.maxspeed?.message}
    //   SelectProps={{
    //     MenuProps: { sx: { maxHeight: 350, padding: 0 } },
    //   }}
    //   sx={{ padding: 0 }}
    //   size="small"
    //   {...register(formPath)}
    // >
    //   {choies.map((choice) => (
    //     <MenuItem key={`major-parts-${Name}-${choice}`} value={choice}>
    //       <FlexBox>
    //         <FlexBox sx={{ alignItems: 'center', paddingX: 2, paddingY: 1 }}>
    //           <Typography>{choice}</Typography>
    //         </FlexBox>
    //       </FlexBox>
    //     </MenuItem>
    //   ))}
    // </TextField>
    <Select<'normal' | 'drift' | 'rally' | 'offroad' | 'race' | 'sports'>
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
      {Suspension_choice.map((choice) => (
        <MenuItem key={`major-parts-ss-${choice.name}`} value={choice.name}>
          <FlexBox sx={{ alignItems: 'center' }}>
            {/* <Image src={choice.image} sx={{ objectFit: 'contain', height: 40 }} /> */}
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
