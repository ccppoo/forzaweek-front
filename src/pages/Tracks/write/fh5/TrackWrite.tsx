import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Container, Paper, Typography } from '@mui/material';

import type { TrackEditSchema as TrackEditSchema_FH5 } from '@/FormData/tracks/fh5';
import { trackEditSchemaDefault } from '@/FormData/tracks/fh5';
import { AddNewDecal, EditDecal } from '@/api/data/fh5/decal';
import AddMultipleImages from '@/components/FormInputs/AddMultipleImages';
import SelectCar from '@/components/FormInputs/CarSelect';
import TrackWorldInput from '@/components/FormInputs/Tracks/TrackWorldInput';
import I18nTextInput from '@/components/FormInputs/i18n/I18nTextInput';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';

interface dataTextInputIntf {
  editSchema?: TrackEditSchema_FH5;
}

export default function TrackWrite(props: dataTextInputIntf) {
  const { editSchema } = props;

  const selectScope = 'decal-post-create';

  const methods = useForm<TrackEditSchema_FH5>({
    defaultValues: editSchema || trackEditSchemaDefault,
    mode: 'onChange',
  });

  const isEditMode = !!methods.getValues('id');
  const submit = async (data: TrackEditSchema_FH5) => {
    console.log(`data : ${JSON.stringify(data)}`);

    // if (isEditMode) {
    //   await EditDecal({ decal: data });
    //   return;
    // }
    // if (!isEditMode) {
    //   await AddNewDecal({ decal: data });
    // }
    return;
  };

  console.log(`isEditMode :${isEditMode}`);

  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ width: '100%', paddingBottom: 10, paddingTop: 4 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 2, width: '100%' }}>
              {/* 1. 이미지 올리기 */}
              {/* <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Track Images</Typography>
                </FlexBox>
                <AddMultipleImages postType="decal upload" />
              </Box> */}
              {/* 2. 트랙 월드 선택 */}
              <TrackWorldInput />
              {/* 3. 트랙 이름 */}
              <I18nTextInput basePath="name" />
              {/* 4. 트랙 의역(선택) */}
              <I18nTextInput basePath="liberal_translation" />

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
