import { ChangeEvent, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  List,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import type { TagEditSchema, TagSchemaType, TagWrite } from '@/FormData/tag';
import type { TuningEditSchema } from '@/FormData/tuning';
import { tuningEditSchemaDefault } from '@/FormData/tuning';
import { GetAllCar } from '@/api/data/car';
import { AddNewDecal, EditDecal } from '@/api/data/decal';
import CarSearchAndSelectDialog from '@/components/Search/CarSearchAndSelectDialog';
import { FlexBox, FullSizeCenteredFlexBox, Image, VisuallyHiddenInput } from '@/components/styled';
import { TAGS } from '@/data/tags';
import type { TagSchemaTypeExtended } from '@/data/tags';

import DetailedTuningTabs from './DetailedTuningTabs';
import TuningPI from './TuningPI';
import TuningPerformance from './TuningPerformance';

interface dataTextInputIntf {
  tuningEditSchema?: TuningEditSchema;
}

function TagSearchTextFeild() {
  const { control, watch } = useFormContext();

  const { append, fields } = useFieldArray({ control, name: 'tags' });

  const filter = createFilterOptions<TagSchemaTypeExtended>({});

  const addCompletedTag = (tag: TagWrite) => {
    append(tag);
  };

  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const selectedTags: string[] = watch('tags').map((tag: TagWrite) => tag.name_en);
  // console.log(`selectedTags :${selectedTags.map((tag) => tag.name_en)}`);
  // 태그를 TextField에서는 직접 거르지 않고 입력만 해서 외부에서 필터링 해야함
  const TAG_OPTIONS = TAGS.filter(({ name_en }) => !selectedTags.includes(name_en));

  const createNewTag = (value: string, kind: string = 'general') => {
    const newTag = {
      name: {
        value: value,
        lang: 'en',
      },
      name_en: value,
      description: [],
      kind: kind,
    };
    return newTag;
  };

  return (
    <Paper
      sx={{
        height: 60,
        width: '100%',
        padding: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FlexBox sx={{ paddingLeft: 1, paddingRight: 2 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      <Autocomplete
        options={TAG_OPTIONS}
        value={value}
        onChange={(event, newValue) => {
          if (newValue === null) {
            setInputValue('');
            return;
          }
          if (typeof newValue === 'string') {
            // 메뉴에서 선택한게 아니고, 바로 엔터 칠 경우
            // 원래 있던 옵션 + 새로 만들어졌을 가능성 둘 다 있는 거임
            const tg = TAGS.filter(({ name_en }) => name_en == newValue)[0];
            if (tg) {
              // 원래 있던 옵션 엔터쳐서 바로 등록할 경우
              append(tg);
            }
            // 새로 만든 옵션 바로 Enter한 경우
            // -> 동적으로 생성하고 append하기
            const newTag = createNewTag(newValue);

            append(newTag);
          } else if (newValue && newValue.inputValue) {
            // 새로운 태그 동적으로 추가하면서 메뉴에서 선택할 경우
            const newTag = createNewTag(newValue.inputValue);
            append(newTag);
          } else {
            // 기존에 있는 옵션 선택할 경우
            append(newValue);
          }
          setInputValue('');
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // 보기 옵션에서 새로 추가하는 옵션 동적으로 만드는 경우
          const isExisting = options.some((option) => inputValue === option.name_en);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              name_en: `Add "${inputValue}"`,
              name: [],
              kind: 'general',
            });
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="Search for tag"
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name_en;
        }}
        renderOption={(props, option) => <li {...props}>{option.name_en}</li>}
        sx={{}}
        fullWidth
        freeSolo
        renderInput={(params) => <TextField {...params} size="small" label="Search for tag" />}
      />
    </Paper>
  );
}

export default function TuningWrite(props: dataTextInputIntf) {
  const searchScope = 'tuning-write';
  const selectScope = 'tuning-post-create';

  const { tuningEditSchema } = props;
  const methods = useForm<TuningEditSchema>({
    defaultValues: tuningEditSchema || tuningEditSchemaDefault,
    mode: 'onChange',
  });
  // const { append, fields } = useFieldArray({ control, name: 'tags' });

  const { remove, fields: tagFields } = useFieldArray({ control: methods.control, name: 'tags' });

  const isEditMode = !!methods.getValues('id');

  const selectedCar = methods.getValues('car');
  const tagsAdded = methods.watch('tags');

  console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: TuningEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);
    // const values = getValues();
    // const queryKey = ['add_nation', data.i18n[0].value];
    return;
  };

  const [imagePreviewIdx, setImagePreviewIdx] = useState<number>(0);
  const handleOnError = (errors: SubmitErrorHandler<TuningEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  const [carSelectDialogOpened, setCarSelectDialogOpened] = useState<boolean>(false);

  const closeCarSelectDialog = () => setCarSelectDialogOpened(false);
  const openCarSelectDialog = () => setCarSelectDialogOpened(true);

  const deleteAddedTag = (tagIndex: number) => {
    remove(tagIndex);
  };

  // console.log(`tags :  ${methods.watch('tags').map((t) => JSON.stringify(t))}`);
  // console.log(`car :  ${methods.watch('car')}`);

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
                    {selectedCar && selectedCar}
                    <FlexBox sx={{ height: '100%', aspectRatio: '16/9' }}>
                      <Image />
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
                      <FlexBox>
                        <Typography>name</Typography>
                        <Typography>{selectedCar && selectedCar}</Typography>
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
                  <Typography>Decal Tags</Typography>
                </FlexBox>
                {/* 태그 자동완성 검색 -> 엔터누르면 완성되는 형식으로 */}
                <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
                  <TagSearchTextFeild />
                  <Paper
                    sx={{ backgroundColor: 'EEEEEE', paddingX: 1, paddingY: 1, minHeight: 96 }}
                  >
                    {tagsAdded.length > 0 ? (
                      <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
                        {tagsAdded.map((tagValue, idx) => (
                          <Chip
                            label={tagValue.name_en}
                            onDelete={() => deleteAddedTag(idx)}
                            key={`decal-write-tag-input-${tagValue}-${idx}`}
                          />
                        ))}
                      </FlexBox>
                    ) : (
                      <FlexBox sx={{ alignItems: 'center', height: '100%', paddingLeft: 1 }}>
                        <Typography fontWeight={300}>
                          Add tags that could describe this decal
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
