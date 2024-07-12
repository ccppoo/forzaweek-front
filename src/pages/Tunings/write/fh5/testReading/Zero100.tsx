import { useFormContext } from 'react-hook-form';

import { MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';

export default function TestReadingZero100() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.zero100.unit`;
  const formPathValue = `testReadings.zero100.value`;
  const unitChoiceWidth = 100;
  const Name = '0-100';
  const units = ['km/h', 'mph'];

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
        <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
          <TextField
            select
            defaultValue={getValues(formPathUnit) || ''}
            inputProps={control.register(formPathUnit, {
              required: 'Please select manufacturer',
            })}
            error={!!formState.errors.testReadings?.maxspeed?.unit}
            helperText={!!formState.errors.testReadings?.maxspeed?.message}
            SelectProps={{
              MenuProps: { sx: { maxHeight: 250, padding: 0 } },
              sx: {
                '& .MuiSelect-select': {
                  paddingX: 0,
                  paddingY: 0.5,
                },
              },
            }}
            sx={{ padding: 0 }}
            fullWidth
            size="small"
          >
            {units.map((tUnit) => (
              <MenuItem key={`test-reading-unit-${Name}-unit-${tUnit}`} value={tUnit}>
                <FlexBox>
                  <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                    <Typography>{tUnit}</Typography>
                  </FlexBox>
                </FlexBox>
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <FlexBox
          sx={{
            height: '100%',
            justifyContent: 'end',
            alignItems: 'center',
            flex: 5,
            columnGap: 1,
          }}
        >
          {/* TODO: 입력 숫자 제한(소수점 허용) */}
          <TextField
            id="outlined-controlled"
            size="small"
            autoComplete="off"
            defaultValue={getValues(formPathValue) || ''}
            sx={{ width: 80 }}
            inputProps={{
              sx: {
                textAlign: 'right',
                '&::placeholder': {
                  textAlign: 'right',
                },
              },
            }}
          />
        </FlexBox>
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5, columnGap: 1 }}>
          <Typography>seconds</Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
