import type { ArrayPath, FieldArrayPath, FieldArrayWithId, FieldPath } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { MenuItem, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import type { TrackFormat } from '@/FormData/tracks/fh5/format';
import { FlexBox } from '@/components/styled';
import { TrackFormats } from '@/types/fh5';

export default function TrackFormatInput<T extends TrackFormat>() {
  const formPath = 'format' as FieldPath<T>;
  const { control, formState, register, getValues } = useFormContext<T>();
  const unitChoiceWidth = 100;

  // const helperText = formState.errors.name?.message ? 'Please input name' : undefined;
  // TODO: Trackformat -> circuit,scramble 일 때 Laps 항목 추가해서 ( +, - ) 아이콘 버튼으로 Laps 수정할 수 있게 하기
  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <FormControl variant="standard" sx={{ width: unitChoiceWidth }}>
        <TextField
          select
          defaultValue={getValues(formPath) || ''}
          inputProps={control.register(formPath, {
            required: 'Please select manufacturer',
          })}
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
          {TrackFormats.map((trackFormats) => (
            <MenuItem
              key={`test-reading-unit-${trackFormats}-unit-${trackFormats}`}
              value={trackFormats}
            >
              <FlexBox>
                <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                  <Typography>{trackFormats}</Typography>
                </FlexBox>
              </FlexBox>
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </FlexBox>
  );
}
