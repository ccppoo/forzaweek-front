import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Container, Paper, Typography } from '@mui/material';

import type { TrackEditSchema as TrackEditSchema_FH5 } from '@/FormData/tracks/fh5';
import { trackEditSchemaDefault } from '@/FormData/tracks/fh5';
import { AddNewTrack } from '@/api/data/track';
import AddMultipleImages from '@/components/FormInputs/AddMultipleImages';
import SelectCar from '@/components/FormInputs/CarSelect';
import TrackFormatInput from '@/components/FormInputs/Tracks/TrackFormatInput';
import AddFullPathImage from '@/components/FormInputs/Tracks/TrackFullPathImage';
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
    if (!isEditMode) {
      await AddNewTrack({ track: data });
    }
    return;
  };

  console.log(`isEditMode :${isEditMode}`);
  // category: 'road',
  // format: 'circuit',
  // format_topology: 'circular',
  // laps: 1,
  // tags: [], // 데칼 태그
  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox
        sx={{
          width: '100%',

          addingBottom: 10,
          paddingTop: 4,
        }}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
            <FlexBox
              sx={{
                flexDirection: 'column',
                rowGap: 2,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 2. 트랙 월드 선택 */}
              <TrackWorldInput />
              {/* 3. 트랙 포맷 */}
              <TrackFormatInput />
              {/* 4. 트랙 이름 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Track Name</Typography>
                </FlexBox>
                <I18nTextInput basePath="name" required />
              </Box>

              {/* 5. 트랙 의역(선택) */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Track Name liberal translation (Optional)</Typography>
                </FlexBox>
                <I18nTextInput basePath="liberal_translation" />
              </Box>
              {/* 6-1. 트랙 전체 경로 사진 올리기 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Track full path image - large</Typography>
                </FlexBox>
                <AddFullPathImage size="zoom_out" postType="track-full-path" />
              </Box>
              {/* 6-2. 트랙 전체 경로 사진 올리기 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Track full path image - small (optional)</Typography>
                </FlexBox>
                <AddFullPathImage size="zoom_in" postType="track-full-path" />
              </Box>

              {/* 7. 트랙 이미지 올리기 */}
              <Box
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
