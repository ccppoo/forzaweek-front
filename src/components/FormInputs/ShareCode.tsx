import { useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import type { SharingCreation } from '@/FormData/post/sharingCreation';
import { FlexBox } from '@/components/styled';

/**
 * TODO: 3개로 나눠서 보기 편하게
 * share code : ___ ___ ___
 */

export default function ShareCodeInput<T extends SharingCreation>() {
  const { getValues, formState, register } = useFormContext<T>();

  const formPath = 'shareCode' as FieldPath<T>;
  const helperText = formState.errors.shareCode?.message ? 'Please input share code' : undefined;

  return (
    // <FlexBox sx={{ alignItems: 'center' }}>
    <TextField
      fullWidth
      // label="e.g) 1234567890"
      defaultValue={getValues(formPath) || ''}
      inputProps={register(formPath, {
        required: 'Please input share code',
      })}
      error={!!formState.errors.shareCode}
      helperText={helperText}
      SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
      size="small"
    />
    //</FlexBox>
  );
}

export function FieldArrayShareCodeInput<T extends FieldValues>({
  register,
  formPath,
}: {
  register: UseFormRegister<T>;
  formPath: FieldPath<T>;
}) {
  return (
    <TextField
      fullWidth
      maxRows={1}
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
