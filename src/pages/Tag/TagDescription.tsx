import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import { tagItem } from '@/FormData/tag/tag';
import type { TagItem } from '@/FormData/tag/tag';
import { GetAllTagCategory } from '@/api/tag/category';
import { AddNewTag, EditTag, GetAllTag } from '@/api/tag/tag';
import { TagKindItemCell } from '@/components/Tag';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';
import { supportLangs } from '@/config/i18n';
import type { i18nMapDescriptionInput } from '@/schema/i18n/types';
import type { Tag, TagInput } from '@/schema/tag';
import { tagDefault } from '@/schema/tag';

export function InputTagDescriptions<T extends i18nMapDescriptionInput>() {
  const { register, formState } = useFormContext<T>();

  const formPaths = supportLangs.map((lang) => {
    return { lang: lang, path: `description.${lang}` as FieldPath<T> };
  });

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
