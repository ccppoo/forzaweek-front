import { useFormContext } from 'react-hook-form';

import { MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';

export default function TuningMajorPartsDrivingSystem() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathValue = `tuningMajorParts.drivingSystem`;
  const unitChoiceWidth = 150;
  const Name = 'Driving System';
  const choies = ['AWD', 'RWD', 'FWD'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5, columnGap: 1 }}>
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
