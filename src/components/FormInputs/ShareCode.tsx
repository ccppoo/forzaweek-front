import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import type { SharingCreation } from '@/FormData/post/sharingCreation';
import { FlexBox } from '@/components/styled';

/**
 * TODO: 3개로 나눠서 보기 편하게
 * share code : ___ ___ ___
 */

export default function ShareCodeInput<T extends SharingCreation>() {
  const { getValues, formState, register } = useFormContext<T>();

  const formPath = 'share_code' as FieldPath<T>;
  const helperText = formState.errors.share_code?.message ? 'Please input share code' : undefined;

  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <TextField
        fullWidth
        label="e.g) 1234567890"
        defaultValue={getValues(formPath) || ''}
        inputProps={register(formPath, {
          required: 'Please input share code',
        })}
        error={!!formState.errors.share_code}
        helperText={helperText}
        SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
        size="small"
      />
    </FlexBox>
  );
}
