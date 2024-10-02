import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import type { SharingCreation } from '@/FormData/post/sharingCreation';
import { FlexBox } from '@/components/styled';

/**
 * TODO: 이쁘게?
 *
 */

export default function CreatorUsernameInput<T extends SharingCreation>() {
  const { getValues, formState, register } = useFormContext<T>();

  const formPath = 'gamerTag' as FieldPath<T>;
  const helperText = formState.errors.gamerTag?.message
    ? 'Please input creator username'
    : undefined;

  return (
    // <FlexBox sx={{ alignItems: 'center' }}>
    <TextField
      fullWidth
      label=""
      defaultValue={getValues(formPath) || ''}
      inputProps={register(formPath, {
        required: 'Please input creator of decal',
      })}
      error={!!formState.errors.gamerTag}
      helperText={helperText}
      SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
      size="small"
    />
    // </FlexBox>
  );
}

// register는 최상단 form 관리자의 register
// T에 들어올거 일단은 TuningBulkWriteInput
export function FieldArrayCreatorUsernameInput<T extends FieldValues>({
  register,
  formPath,
}: {
  register: UseFormRegister<T>;
  formPath: FieldPath<T>;
}) {
  return (
    <TextField
      fullWidth
      label=""
      // defaultValue={getValues(formPath) || ''}
      inputProps={register(formPath, {
        required: 'Please input creator of decal',
      })}
      // error={!!isError}
      // helperText={helperText}
      SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
      size="small"
    />
  );
}
