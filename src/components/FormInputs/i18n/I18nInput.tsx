import type { FieldPath, FieldValues } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { TextField, Typography } from '@mui/material';

import { FlexBox } from '@/components/styled';

/**
 * i18n {value : string, lang : string} 를 사용하는 필드에서 사용하는 컨트롤러
 *
 */
export default function I18nInput<T extends FieldValues>({
  valuePath,
  langPath,
}: {
  valuePath: string;
  langPath: string;
}) {
  const i18nValueFormPath = valuePath as FieldPath<T>;
  const i18nLangFormPath = langPath as FieldPath<T>;
  const { getValues, formState, register } = useFormContext<T>();
  const helperText = formState.errors.name?.message ? 'Please input name' : undefined;

  const langValue = getValues(i18nLangFormPath);
  // console.log(`val : ${JSON.stringify(val)} | nestedFormPath :${i18nValueFormPath}`);
  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
        <FlexBox key={`nation-input-value-`} sx={{ width: '100%' }}>
          <FlexBox
            sx={{
              minWidth: 150,
              width: 150,
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              {langValue}
            </Typography>
          </FlexBox>

          <FlexBox sx={{ width: '100%', minWidth: 300 }}>
            <TextField
              {...register(i18nValueFormPath, { required: true })}
              defaultValue={''}
              // placeholder={!isDefaultLang ? 'optional' : undefined}
              size="small"
              fullWidth
              error={!!formState.errors.name}
              helperText={helperText}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
