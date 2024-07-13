import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import type { SharingCreation } from '@/FormData/post/sharingCreation';
import { FlexBox } from '@/components/styled';

/**
 * TODO: 이쁘게?
 *
 */

export default function CreatorUsernameInput<T extends SharingCreation>() {
  const { getValues, formState, register } = useFormContext<T>();

  const formPath = 'creator' as FieldPath<T>;
  const helperText = formState.errors.creator?.message
    ? 'Please input creator username'
    : undefined;

  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <TextField
        fullWidth
        label=""
        defaultValue={getValues(formPath) || ''}
        inputProps={register(formPath, {
          required: 'Please input creator of decal',
        })}
        error={!!formState.errors.share_code}
        helperText={helperText}
        SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
        size="small"
      />
    </FlexBox>
  );
}
