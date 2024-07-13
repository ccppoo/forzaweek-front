import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import type { TuningEditSchema } from '@/FormData/tuning';
import { tuningEditSchemaDefault } from '@/FormData/tuning';
import { AddNewTuning } from '@/api/data/fh5/tuning';
import AddTags from '@/components/FormInputs/AddTags';
import SelectCar from '@/components/FormInputs/CarSelect';
import CreatorUsernameInput from '@/components/FormInputs/CreatorUsername';
import ShareCodeInput from '@/components/FormInputs/ShareCode';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';

import DetailedTuningTabs from './detailedTuning';
import MajorParts from './majorPart';
import TuningPerformance from './performance';
import TuningPI from './pi';
import TestReadingInput from './testReading';

interface dataTextInputIntf {
  tuningEditSchema?: TuningEditSchema;
}

export default function TuningWrite(props: dataTextInputIntf) {
  const selectScope = 'tuning-post-create';

  const { tuningEditSchema } = props;
  const methods = useForm<TuningEditSchema>({
    defaultValues: tuningEditSchema || tuningEditSchemaDefault,
    mode: 'onChange',
  });

  const isEditMode = !!methods.getValues('id');

  console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: TuningEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);
    // AddNewTuning()
    // const values = getValues();
    // const queryKey = ['add_nation', data.i18n[0].value];
    return;
  };

  const handleOnError = (errors: SubmitErrorHandler<TuningEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ width: '100%', paddingBottom: 10, paddingTop: 4 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 4, width: '100%' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: '200px',
                }}
              >
                <FlexBox sx={{ alignItems: 'center', height: '100%' }}>
                  <Typography>Base Car</Typography>
                </FlexBox>
                <SelectCar selectScope={selectScope} />
              </Box>
              {/* 1. 원본 제작자 이름 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: '50px',
                }}
              >
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Typography>Creator username</Typography>
                </FlexBox>
                <CreatorUsernameInput />
              </Box>
              {/* 2. 공유 코드 입력 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: '50px',
                }}
              >
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Typography>Share code</Typography>
                </FlexBox>
                <ShareCodeInput />
              </Box>
              {/* 3. 태그 붙이기 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox sx={{ alignItems: 'center', height: 60 }}>
                  <Typography>Tuning Tags</Typography>
                </FlexBox>
                <AddTags selectScope={selectScope} postType="tuning" />
              </Box>
              {/* 3. 튜닝 성능 입력(PI) */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Tuning PI</Typography>
                </FlexBox>
                <FlexBox sx={{ width: '100%', height: '100%', columnGap: 2 }}>
                  <TuningPI />
                </FlexBox>
              </Box>
              {/* 4. 튜닝 성능 입력 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Tuning Performance</Typography>
                </FlexBox>
                <FlexBox sx={{ width: '100%', height: '100%', columnGap: 2 }}>
                  <TuningPerformance />
                </FlexBox>
              </Box>
              {/* 5. 튜닝 측정치 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Tuning test readings</Typography>
                </FlexBox>
                <FlexBox sx={{ width: '100%', height: '100%', columnGap: 2 }}>
                  <TestReadingInput />
                </FlexBox>
              </Box>
              {/* 6. 주요부품 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Tuning Major parts</Typography>
                </FlexBox>
                <FlexBox sx={{ width: '100%', height: '100%', columnGap: 2 }}>
                  <MajorParts />
                </FlexBox>
              </Box>

              {/* 7. 세부 튜닝 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Detail Tuning</Typography>
                </FlexBox>
                <FlexBox sx={{ width: '100%', height: '100%', minHeight: 400, columnGap: 2 }}>
                  <DetailedTuningTabs />
                </FlexBox>
              </Box>

              <FlexBox sx={{ width: '100%', justifyContent: 'end' }}>
                <Button type="submit" variant="outlined">
                  Post
                </Button>
              </FlexBox>
            </FlexBox>
          </form>
        </FormProvider>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
