import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import type { DecalEditSchema } from '@/FormData/decal';
import { decalEditSchemaDefault } from '@/FormData/decal';
import { AddNewDecal, EditDecal } from '@/api/data/fh5/decal';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';

import AddImages from './AddImages';
import AddTags from './AddTags';
import SelectCar from './SelectCar';

interface dataTextInputIntf {
  decalEditSchema?: DecalEditSchema;
}

export default function DecalWrite(props: dataTextInputIntf) {
  const { decalEditSchema } = props;
  const methods = useForm<DecalEditSchema>({
    defaultValues: decalEditSchema || decalEditSchemaDefault,
    mode: 'onChange',
  });

  const isEditMode = !!methods.getValues('id');
  const submit = async (data: DecalEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);

    if (isEditMode) {
      await EditDecal({ decal: data });
      return;
    }
    if (!isEditMode) {
      await AddNewDecal({ decal: data });
    }
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
                <SelectCar />
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
                <FlexBox sx={{ alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label=""
                    defaultValue={methods.getValues('creator') || ''}
                    inputProps={methods.register('creator', {
                      required: 'Please input creator of decal',
                    })}
                    error={!!methods.formState.errors.share_code}
                    helperText={methods.formState.errors.share_code?.message}
                    SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                    size="small"
                  />
                </FlexBox>
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
                {/* 3개로 나눠서 보기 편하게 */}
                <FlexBox sx={{ alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label="e.g) 1234567890"
                    defaultValue={methods.getValues('share_code') || ''}
                    inputProps={methods.register('share_code', {
                      required: 'Please input share code',
                    })}
                    error={!!methods.formState.errors.share_code}
                    helperText={methods.formState.errors.share_code?.message}
                    SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                    size="small"
                  />
                </FlexBox>
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
                <AddTags />
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
                <AddImages />
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
