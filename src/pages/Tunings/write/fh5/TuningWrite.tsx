import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import { Box, Button, Container, Typography } from '@mui/material';

import type { TuningEditSchema } from '@/FormData/tuning';
import { tuningEditSchemaDefault } from '@/FormData/tuning';
import { createTuningFH5 } from '@/api/fh5/tuning';
import AddTags from '@/components/FormInputs/AddTags';
import SelectCar from '@/components/FormInputs/CarSelect';
import CreatorUsernameInput from '@/components/FormInputs/CreatorUsername';
import ShareCodeInput from '@/components/FormInputs/ShareCode';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import DetailedTuningChoiceContext, {
  detailedTuningChoicesDefault,
} from '@/context/DetailedTuningChoiceContext';
import type { DetailedTuningChoices } from '@/context/DetailedTuningChoiceContext';
import type { TuningOptionName } from '@/types/car';

import DetailedTuningTabs from './detailedTuning';
import MajorParts from './majorPart';
import TuningPerformance from './performance';
import TuningPI from './pi';
import TestReadingInput from './testReading';

interface dataTextInputIntf {
  tuningEditSchema?: TuningEditSchema;
}

const filterOptionalTuning = (
  data: TuningEditSchema,
  choices: DetailedTuningChoices,
): TuningEditSchema => {
  const { detailedTuning, ..._data } = data;
  if (choices.nothing) {
    return { ..._data, detailedTuning: undefined };
  }
  const { nothing, ..._choices } = choices;

  const map = {};
  for (const [key, value] of Object.entries(_choices)) {
    // @ts-ignore
    if (!value) map[key] = undefined;
  }

  return {
    ..._data,
    detailedTuning: {
      ...detailedTuning,
      ...map,
    },
  };
};

export default function TuningWrite(props: dataTextInputIntf) {
  const selectScope = 'tuning-post-create';
  const [detailedTuningChoices, setDetailedTuningChoices] = useState<DetailedTuningChoices>(
    detailedTuningChoicesDefault,
  );
  const { tuningEditSchema } = props;
  const methods = useForm<TuningEditSchema>({
    defaultValues: tuningEditSchema || tuningEditSchemaDefault,
    mode: 'onChange',
  });

  const isEditMode = !!methods.getValues('id');

  console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: TuningEditSchema) => {
    // console.log(`data : ${JSON.stringify(data)}`);
    // console.log(`detailedTuningChoices : ${JSON.stringify(detailedTuningChoices)}`);
    const _data = filterOptionalTuning(data, detailedTuningChoices);
    console.log(`_data : ${JSON.stringify(_data)}`);
    const path = 'fh5/tuning';

    if (isEditMode) {
      // await EditTuning({ tuning: data });
      return;
    }

    if (!isEditMode) {
      const resp = await createTuningFH5({ data: _data, path });
      console.log(`resp : ${JSON.stringify(resp)}`);
      // await AddNewTuning({ tuning: data });
    }

    return;
  };

  const detailTuningChoiceChange = (
    tuningOptionName: TuningOptionName | 'nothing',
    value: boolean,
  ) => {
    setDetailedTuningChoices((prev) => {
      return {
        ...prev,
        [tuningOptionName]: value,
      };
    });
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
              <DetailedTuningChoiceContext.Provider
                value={{
                  detailedTuningChoices: detailedTuningChoices,
                  setDetailedTuning: detailTuningChoiceChange,
                }}
              >
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
              </DetailedTuningChoiceContext.Provider>
            </FlexBox>
          </form>
        </FormProvider>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
