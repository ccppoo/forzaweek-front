import { ChangeEvent, useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { FieldPath, SubmitErrorHandler } from 'react-hook-form';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';
import { supportLangs } from '@/config/i18n';
import type { i18nMapNameInput } from '@/schema/i18n/types';

export function InputTagName<T extends i18nMapNameInput>() {
  const { register, formState, getValues } = useFormContext<T>();

  const formPaths = supportLangs.map((lang) => {
    return { lang: lang, path: `name.${lang}` as FieldPath<T> };
  });

  // console.log(`tag name, : ${JSON.stringify(getValues())}`);

  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
      {formPaths.map((field, index) => {
        const langType = `${field.lang}`;
        return (
          <FlexBox key={`nation-input-value-${field.lang}-${index}`} sx={{ width: '100%' }}>
            <FlexBox
              sx={{
                width: 200,
                minWidth: 200,
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
                {...register(field.path, { required: true })}
                multiline
                // placeholder={!isDefaultLang ? 'optional' : undefined}
                size="small"
                fullWidth
                // error={
                // }
                // helperText={
                //   methods.formState.errors.name &&
                //   methods.formState.errors.name[index] &&
                //   'you must provide value'
                // }
              />
            </FlexBox>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
}
