import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { tuningEditSchemaDefault } from '@/FormData/tuning';
import { AddNewTuning } from '@/api/data/fh5/tuning';
import CarSearchAndSelectDialog from '@/components/Search/CarSearchAndSelectDialog';
import { TagItemCell } from '@/components/Tag';
import { TagSearchCreateTextFeild } from '@/components/TagSearchCreate';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import type { CarInfoEssential } from '@/types/car';

import DetailedTuningTabs from './DetailedTuningTabs';
import TuningPI from './TuningPI';
import TuningPerformance from './TuningPerformance';

interface dataTextInputIntf {
  tuningEditSchema?: TuningEditSchema;
}

export default function TuningWrite(props: dataTextInputIntf) {
  const searchScope = 'tuning-write';
  const selectScope = 'tuning-post-create';

  const { tuningEditSchema } = props;
  const methods = useForm<TuningEditSchema>({
    defaultValues: tuningEditSchema || tuningEditSchemaDefault,
    mode: 'onChange',
  });

  const isEditMode = !!methods.getValues('id');

  const selectedCar = methods.getValues('car');
  const tagsAdded = methods.watch('tags');
  const [carSelected, setCarSelected] = useState<CarInfoEssential | undefined>(undefined);

  const setCarForTuningWrite = (car: CarInfoEssential) => {
    setCarSelected(car);
    methods.setValue('car', car.id);
  };
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

  const [carSelectDialogOpened, setCarSelectDialogOpened] = useState<boolean>(false);

  const closeCarSelectDialog = () => setCarSelectDialogOpened(false);
  const openCarSelectDialog = () => setCarSelectDialogOpened(true);

  const deleteAddedTag = (tagIndex: number) => {
    const tags = methods.getValues('tags');
    methods.setValue(
      'tags',
      tags.filter((_, idx) => idx != tagIndex),
    );
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
                <FlexBox
                  sx={{
                    alignItems: 'center',
                    height: '100%',
                    columnGap: 2,
                  }}
                >
                  <Paper
                    sx={{
                      width: '100%',
                      height: '100%',
                      paddingLeft: 2,
                      paddingY: 1,
                      display: 'flex',
                    }}
                  >
                    <FlexBox sx={{ height: '100%', aspectRatio: '16/9' }}>
                      {carSelected?.image.first ? (
                        <Image src={carSelected.image.first} />
                      ) : (
                        <FlexBox></FlexBox>
                      )}
                    </FlexBox>
                    <FlexBox
                      sx={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingX: 1,
                      }}
                    >
                      {/* 선택한 차 제조사, 이름 */}
                      <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingLeft: 1 }}>
                        <FlexBox sx={{ columnGap: 2 }}>
                          <FlexBox sx={{ height: 20, alignItems: 'center' }}>
                            <Image src={carSelected?.manufacturer.imageURL} />
                          </FlexBox>
                          <Typography>{carSelected?.manufacturer.name_en}</Typography>
                        </FlexBox>
                        <Typography variant="h5">{carSelected && carSelected.name_en}</Typography>
                      </FlexBox>

                      <FlexBox
                        sx={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          width: '100%',
                          alignItems: 'end',
                        }}
                      >
                        <Button variant="outlined" onClick={openCarSelectDialog}>
                          select car
                        </Button>
                      </FlexBox>
                    </FlexBox>
                  </Paper>
                </FlexBox>
                <CarSearchAndSelectDialog
                  onClose={closeCarSelectDialog}
                  opened={carSelectDialogOpened}
                  setCar={setCarForTuningWrite}
                  selectScope={selectScope}
                />
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
                  gridTemplateColumns: '175px auto',
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
                  gridTemplateColumns: '175px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox sx={{ alignItems: 'center', height: 60 }}>
                  <Typography>Tuning Tags</Typography>
                </FlexBox>
                {/* 태그 자동완성 검색 -> 엔터누르면 완성되는 형식으로 */}
                <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
                  <TagSearchCreateTextFeild />
                  <Paper
                    sx={{ backgroundColor: 'EEEEEE', paddingX: 1, paddingY: 1, minHeight: 64 }}
                  >
                    {tagsAdded.length > 0 ? (
                      <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
                        {tagsAdded.map((tagID, idx) => (
                          <TagItemCell
                            tag={tagID}
                            key={`tuning-write-tag-input-${tagID}-${idx}`}
                            onClickDelete={() => deleteAddedTag(idx)}
                          />
                        ))}
                      </FlexBox>
                    ) : (
                      <FlexBox sx={{ alignItems: 'center', height: '100%' }}>
                        <Typography fontWeight={300}>
                          Add tags that could describe this tuning
                        </Typography>
                      </FlexBox>
                    )}
                  </Paper>
                </FlexBox>
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
              {/* 5. 세부 튜닝 입력 */}
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
