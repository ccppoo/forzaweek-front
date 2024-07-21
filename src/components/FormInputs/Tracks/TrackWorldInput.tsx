import type { ArrayPath, FieldArrayPath, FieldArrayWithId, FieldPath } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { MenuItem, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import type { TrackWorld } from '@/FormData/tracks/fh5/world';
import { FlexBox } from '@/components/styled';
import { Worlds } from '@/types/fh5';

export default function TrackWorldInput<T extends TrackWorld>() {
  const formPath = 'world' as FieldPath<T>;
  const { control, formState, register, getValues } = useFormContext<T>();
  const unitChoiceWidth = 100;

  // const helperText = formState.errors.name?.message ? 'Please input name' : undefined;
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
          {Worlds.map((world) => (
            <MenuItem key={`test-reading-unit-${world}-unit-${world}`} value={world}>
              <FlexBox>
                <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                  <Typography>{world}</Typography>
                </FlexBox>
              </FlexBox>
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </FlexBox>
  );
}
