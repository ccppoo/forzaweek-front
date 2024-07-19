import { useFormContext } from 'react-hook-form';

import { MenuItem, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';
import { SkidPadUnits } from '@/types/units';

export default function TestReadingSkidPad() {
  const { control, watch, getValues, formState } = useFormContext<TuningEditSchema>();

  const formPathUnit = `testReadings.skid_pad.unit`;
  const formPathValue = `testReadings.skid_pad.value`;
  const unitChoiceWidth = 100;
  const Name = 'Skid pad';
  const units = SkidPadUnits;

  return (
    <FlexBox sx={{ columnGap: 2 }}>
      <FlexBox sx={{ alignItems: 'center', height: '100%', flex: 5, columnGap: 1 }}>
        <Typography variant="h6" fontWeight={350}>
          {Name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ height: '100%', flex: 5, columnGap: 1 }}>
        {/* TODO: 입력 숫자 제한(소수점 허용) */}
        <FlexBox sx={{ height: '100%', alignItems: 'center', justifyContent: 'end', flex: 5 }}>
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
        <FlexBox sx={{ height: '100%', alignItems: 'center', flex: 5 }}>
          {units.length > 1 ? (
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
          ) : (
            <Typography>{units[0]}</Typography>
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
