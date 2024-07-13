import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import type { DecalEditSchema } from '@/FormData/decal';
import { decalEditSchemaDefault } from '@/FormData/decal';
import { AddNewDecal, EditDecal } from '@/api/data/fh5/decal';
import AddMultipleImages from '@/components/FormInputs/AddMultipleImages';
import AddTags from '@/components/FormInputs/AddTags';
import SelectCar from '@/components/FormInputs/CarSelect';
import CreatorUsernameInput from '@/components/FormInputs/CreatorUsername';
import ShareCodeInput from '@/components/FormInputs/ShareCode';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';

interface dataTextInputIntf {
  decalEditSchema?: DecalEditSchema;
}

export default function DecalWrite(props: dataTextInputIntf) {
  const { decalEditSchema } = props;

  const selectScope = 'decal-post-create';

  const methods = useForm<DecalEditSchema>({
    defaultValues: decalEditSchema || decalEditSchemaDefault,
    mode: 'onChange',
  });

  const isEditMode = !!methods.getValues('id');
  const submit = async (data: DecalEditSchema) => {
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
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
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
                  gridTemplateColumns: '150px auto',
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
                  gridTemplateColumns: '150px auto',
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
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox sx={{ alignItems: 'center', height: 60 }}>
                  <Typography>Decal Tags</Typography>
                </FlexBox>
                <AddTags selectScope={selectScope} postType="decal" />
              </Box>
              {/* 4. 이미지 올리기 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Decal Images</Typography>
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
