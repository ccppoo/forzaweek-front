import type { ArrayPath, FieldArrayPath, FieldArrayWithId, FieldPath } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { TextField, Typography } from '@mui/material';

import type { I18nNameDependent } from '@/FormData/i18n';
import { FlexBox } from '@/components/styled';

export default function I18nNameInput<T extends I18nNameDependent>() {
  const formPath = 'name' as FieldArrayPath<T>;
  const { control, formState, register } = useFormContext<T>();
  const { fields: names } = useFieldArray({
    control,
    name: formPath,
  });
  const helperText = formState.errors.name?.message ? 'Please input name' : undefined;
  const nameLangPath = 'lang' as FieldPath<FieldArrayWithId<T, ArrayPath<T>, 'id'>>;
  const arrayFieldPath = (index: number) => `name.${index}.value` as FieldPath<T>;
  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
        {names.map((field, index) => {
          // console.log(`field : ${field} | type ${JSON.stringify(field)}`);
          const langType = `${field[nameLangPath]}`;
          return (
            <FlexBox key={`nation-input-value-${index}`} sx={{ width: '100%' }}>
              <FlexBox
                sx={{
                  minWidth: 150,
                  width: 150,
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 300 }}>
                  {langType}
                </Typography>
              </FlexBox>

              <FlexBox sx={{ width: '100%', minWidth: 300 }}>
                <TextField
                  {...register(arrayFieldPath(index), { required: true })}
                  defaultValue={''}
                  // placeholder={!isDefaultLang ? 'optional' : undefined}
                  size="small"
                  fullWidth
                  error={!!formState.errors.name}
                  helperText={helperText}
                />
              </FlexBox>
            </FlexBox>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
}
