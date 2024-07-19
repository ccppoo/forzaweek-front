import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

import { Box, Typography } from '@mui/material';
import { MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';

interface SliderTitleProp {
  name: string;
  LeftName: string;
  RightName: string;
  formPath?: string;
  unitNames?: string[];
}

export default function SliderTitle(props: SliderTitleProp) {
  const { control, getValues, formState } = useFormContext<TuningEditSchema>();
  const formPathUnit = `detailedTuning.tires.tirePressure.unit`;
  const { name, LeftName, RightName, unitNames, formPath } = props;

  const formPath_ = formPath as FieldPath<TuningEditSchema>;
  // type FormDataType = PathValue<T, FieldPath<T>>;
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        minHeight: 60,
        height: '100%',
        gridTemplateColumns: '5fr 4fr 150px',
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          paddingX: 1,
        }}
      >
        <Typography variant="h5">{name}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 2,
        }}
      >
        <Typography>{LeftName}</Typography>
        <Typography>{RightName}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {unitNames && (
          <TextField
            select
            defaultValue={getValues(formPath_) || ''}
            inputProps={control.register(formPath_, {
              required: 'Please select unit',
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
            size="small"
          >
            {unitNames.map((tUnit) => (
              <MenuItem key={`detailed-tuning-unit-${tUnit}`} value={tUnit}>
                <FlexBox>
                  <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                    <Typography>{tUnit}</Typography>
                  </FlexBox>
                </FlexBox>
              </MenuItem>
            ))}
          </TextField>
        )}
      </FlexBox>
    </Box>
  );
}
