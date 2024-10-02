import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Container, Paper, Typography } from '@mui/material';

import type { DecalEditSchema, DecalSchemaType } from '@/FormData/decal';
import { decalEditSchemaDefault } from '@/FormData/decal';
import { CreateDecalPost, EditDecal } from '@/api/fh5/decal';
import AddMultipleImages from '@/components/FormInputs/AddMultipleImages';
import AddTags from '@/components/FormInputs/AddTags';
import SelectCar from '@/components/FormInputs/CarSelect';
import CreatorUsernameInput from '@/components/FormInputs/CreatorUsername';
import ShareCodeInput from '@/components/FormInputs/ShareCode';
import SharenameInput from '@/components/FormInputs/ShareName';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import useAuthState from '@/store/auth';

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
  const [{ id_token }] = useAuthState();

  const isEditMode = !!methods.getValues('id');
  const submit = async (data: DecalEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);

    if (isEditMode) {
      await EditDecal({ decal: data, authToken: id_token! });
      return;
    }
    if (!isEditMode) {
      await CreateDecalPost({ decal: data as DecalSchemaType, authToken: id_token! });
    }
    return;
  };

  console.log(`isEditMode :${isEditMode}`);
  // console.log(`all form  : ${JSON.stringify(methods.getValues())}`);

  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ width: '100%', paddingBottom: 10, paddingTop: 4 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 2, width: '80%' }}>
              <FlexBox
                sx={{
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <FlexBox sx={{ alignItems: 'center', height: '100%' }}>
                  <Typography>Base Car</Typography>
                </FlexBox>
                <SelectCar selectScope={selectScope} />
              </FlexBox>
              {/* 1. 원본 제작자 이름 */}

              <FlexBox
                sx={{
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Typography>Creator username</Typography>
                </FlexBox>
                <CreatorUsernameInput />
              </FlexBox>
              {/* 데칼 이름  */}
              <FlexBox
                sx={{
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Typography>name</Typography>
                </FlexBox>
                <CreatorUsernameInput />
              </FlexBox>
              {/* 2. 공유 코드 입력 */}
              <FlexBox
                sx={{
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Typography>Share code</Typography>
                </FlexBox>
                <ShareCodeInput />
              </FlexBox>
              {/* 3. 이미지 올리기 */}
              <FlexBox
                sx={{
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <FlexBox>
                  <Typography>Decal Images</Typography>
                </FlexBox>
                <AddMultipleImages postType="decal upload" />
              </FlexBox>
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
