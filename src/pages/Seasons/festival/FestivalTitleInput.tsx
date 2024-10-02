import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

import { TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { FlexBox } from '@/components/styled';
import type { FestivalNameNumberInput } from '@/schema/fh5/season/festival';

// 음력 새해 - 30 (~2/29)
// 유럽 자동차 - 31 (~3/28)
// Horizon 레이스 오프 - 32 (~4/25)
// APEX 올스타즈 - 33 (~5/23)
// Horizon 레트로 웨이브 - 34 (~6/20)
// 모던 Horizons - 35 (~7/18)
// Horizon 자동차와 커피 - 36 (~8/15)
// 고성능 데일리즈 - 37 (~9/12)
// 숨겨진 호라이즌 - 38 (~)

export default function FestivalTitleInput<T extends FestivalNameNumberInput>() {
  const { register } = useFormContext<T>();

  type FormFieldPath = FieldPath<T>;
  const festivalNumberPath = 'number' as FormFieldPath;
  const festivalNamePath = 'name' as FormFieldPath;
  return (
    <FlexBox sx={{ justifyContent: 'center', flexDirection: 'column' }}>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>festival number</Typography>
        <TextField {...register(festivalNumberPath)} size="small" />
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>festival name</Typography>
        <TextField {...register(festivalNamePath)} size="small" />
      </FlexBox>
    </FlexBox>
  );
}
