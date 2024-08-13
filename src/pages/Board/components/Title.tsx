import { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import type { BoardPostTitle, OutputSchemaType } from '@/FormData/editorjs';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

// NOTE: 게시글 외에도 OutputData 하고 추가로 관리할 데이터들
// 1. 수정하는 경우 -> 이미지 삭제시 최종 POST 할 때 삭제할 이미지 첨부하기

interface TitleIntf {
  editMode?: boolean;
}

export default function Title<T extends BoardPostTitle>(props: TitleIntf) {
  const { editMode } = props;
  const { getValues, setValue, formState, register } = useFormContext<T>();

  const formPath = 'title' as FieldPath<T>;
  type FormDataType = PathValue<T, FieldPath<T>>;

  const helperText = formState.errors.title?.message ? 'Please input creator username' : undefined;

  const titleValue = getValues(formPath);
  const setTitleValue = (value: string) => setValue(formPath, value as FormDataType);

  if (editMode) {
    return (
      <TextField
        fullWidth
        label=""
        // defaultValue={titleValue}
        inputProps={register(formPath, {
          required: 'Please input title of post',
        })}
        // value={getValues(formPath)}
        // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        //   console.log(`event.target.value : ${event.target.value}`);
        //   setTitleValue(event.target.value);
        // }}
        placeholder="title of post"
        error={!!formState.errors.title}
        helperText={helperText}
        size="small"
      />
    );
  }

  return <Typography>{titleValue}</Typography>;
}
