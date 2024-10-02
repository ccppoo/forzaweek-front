import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { FlexBox } from '@/components/styled';
import type { FestivalInput } from '@/schema/fh5/season/festival';
import { festivalDefault } from '@/schema/fh5/season/festival';

import FestivalDateInput from './festival/FestivalDateInput';
import FestivalTitleInput from './festival/FestivalTitleInput';
import RewardsInputField from './festival/RewardInput';

// 음력 새해 - 30 (~2/29)
// 유럽 자동차 - 31 (~3/28)
// Horizon 레이스 오프 - 32 (~4/25)
// APEX 올스타즈 - 33 (~5/23)
// Horizon 레트로 웨이브 - 34 (~6/20)
// 모던 Horizons - 35 (~7/18)
// Horizon 자동차와 커피 - 36 (~8/15)
// 고성능 데일리즈 - 37 (~9/12)
// 숨겨진 호라이즌 - 38 (~)

function FestivalInput({}) {
  const [festivalNumber, setFestivalNumber] = useState<number>(38);
  const methods = useForm<FestivalInput>({ defaultValues: festivalDefault });

  console.log(`value : ${JSON.stringify(methods.getValues())}`);

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FormProvider {...methods}>
        <FlexBox sx={{ paddingY: 2, flexDirection: 'column' }}>
          <FestivalTitleInput />
          <FestivalDateInput />
          <RewardsInputField />
        </FlexBox>
      </FormProvider>
    </FlexBox>
  );
}

export default function EditSeason() {
  return (
    <Container maxWidth={'xl'}>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FestivalInput />
      </FlexBox>
    </Container>
  );
}
