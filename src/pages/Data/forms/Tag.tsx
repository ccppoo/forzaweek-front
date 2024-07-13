import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import type { TagType } from '@/FormData/tag';
import { Tag } from '@/FormData/tag';
import { AddNewTag, EditTag, GetAllTag } from '@/api/data/tag';
import { GetAllTagKind } from '@/api/data/tagKind';
import AddSingleImage from '@/components/FormInputs/AddSingleImage';
import { TagKindItemCell } from '@/components/Tag';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

interface dataTextInputIntf {
  tagEditSchema?: TagType.TagEditSchema;
}

export default function TagForm(props: dataTextInputIntf) {
  const navigate = useNavigate();
  const DATA_TYPE = 'tag';
  const { tagEditSchema } = props;

  const methods = useForm<TagType.TagEditSchema>({
    defaultValues: tagEditSchema || Tag.tagEditSchemaDefault,
    mode: 'onChange',
  });

  const { data: tagKindList } = useQuery({
    queryKey: ['all tag kind'],
    queryFn: GetAllTagKind,
  });

  const goBackToListPage = () => navigate(`/data/${DATA_TYPE}`);

  const isEditMode = !!methods.getValues('id');
  const { data: mergeTagCandidate } = useQuery({
    queryKey: [DATA_TYPE, tagEditSchema?.kind],
    queryFn: GetAllTag,
    enabled: isEditMode,
  });

  // console.log(`data : ${JSON.stringify(mergeTagCandidate)}`);

  const { fields: nameFields } = useFieldArray({
    control: methods.control,
    name: 'name',
  });

  const { fields: descriptionFields } = useFieldArray({
    control: methods.control,
    name: 'description',
  });

  const submit = async (data: Tag.TagEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);

    // if (isEditMode) {
    //   await EditTag({ tag: data });
    //   return;
    // }
    // if (!isEditMode) {
    //   await AddNewTag({ tag: data });
    // }
  };

  const handleOnError = (errors: SubmitErrorHandler<Tag.TagEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  if (tagKindList) {
    const sortedTagKindList = tagKindList.toSorted((t1, t2) => (t1.name_en > t2.name_en ? 1 : -1));
    console.log(`sortedTagKindList ; ${JSON.stringify(sortedTagKindList)}`);
    return (
      <FlexBox sx={{ flexDirection: 'column', paddingX: 2 }}>
        <FormProvider {...methods}>
          <form noValidate onSubmit={methods.handleSubmit(submit)}>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 3 }}>
              {/* 태그 */}
              <FlexBox sx={{ flexDirection: 'row', rowGap: 2 }}>
                <Box
                  sx={{
                    display: 'grid',
                    width: '100%',
                    gridTemplateColumns: '200px auto',
                    gridTemplateRows: '80px',
                  }}
                >
                  <FlexBox sx={{ alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 300 }}>
                      태그 종류
                    </Typography>
                  </FlexBox>
                  <FlexBox sx={{ alignItems: 'center' }}>
                    <TextField
                      select
                      fullWidth
                      label="Select"
                      defaultValue={methods.getValues('kind') || ''}
                      inputProps={methods.register('kind', {
                        required: 'Please select tag kind',
                      })}
                      error={!!methods.formState.errors.kind}
                      helperText={methods.formState.errors.kind?.message}
                      SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                      size="small"
                    >
                      {sortedTagKindList.map((tagKind) => (
                        <MenuItem key={`${tagKind.name_en}-${tagKind.id}`} value={tagKind.id}>
                          <TagKindItemCell tagKind={tagKind} />
                        </MenuItem>
                      ))}
                    </TextField>
                  </FlexBox>
                </Box>
              </FlexBox>
              <FlexBox sx={{ flexDirection: 'row', rowGap: 2 }}>
                <Box
                  sx={{
                    display: 'grid',
                    width: '100%',
                    gridTemplateColumns: '200px auto',
                    // gridTemplateRows: '200px 50px',
                  }}
                >
                  <FlexBox sx={{ width: 200, minWidth: 200 }}>
                    <Typography variant="h5" sx={{ fontWeight: 300 }}>
                      태그 대표 사진
                    </Typography>
                  </FlexBox>
                  {/* 업로드한 사진 올라오는 곳 */}
                  <AddSingleImage postType="tag upload" />
                </Box>
              </FlexBox>
              {/* 번역 이름 */}
              <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  태그 이름
                </Typography>

                <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
                  {nameFields.map((field, index) => {
                    const langType = `${field.lang}`;
                    return (
                      <FlexBox
                        key={`nation-input-value-${field.lang}-${index}`}
                        sx={{ width: '100%' }}
                      >
                        <FlexBox
                          sx={{
                            width: 200,
                            minWidth: 200,
                            justifyContent: 'start',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 300 }}>
                            {langType}
                          </Typography>
                        </FlexBox>

                        <FlexBox sx={{ width: '100%', minWidth: 300 }}>
                          <TextField
                            {...methods.register(`name.${index}.value`, { required: true })}
                            defaultValue={''}
                            multiline
                            // placeholder={!isDefaultLang ? 'optional' : undefined}
                            size="small"
                            fullWidth
                            error={
                              methods.formState.errors.name &&
                              !!methods.formState.errors.name[index]?.value
                            }
                            helperText={
                              methods.formState.errors.name &&
                              methods.formState.errors.name[index] &&
                              'you must provide value'
                            }
                          />
                        </FlexBox>
                      </FlexBox>
                    );
                  })}
                </FlexBox>
              </FlexBox>
              {/* 태그 설명 */}
              <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  태그 설명
                </Typography>

                <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
                  {descriptionFields.map((field, index) => {
                    const langType = `${field.lang}`;
                    return (
                      <FlexBox key={`nation-input-value-${index}`} sx={{ width: '100%' }}>
                        <FlexBox
                          sx={{
                            width: 200,
                            minWidth: 200,
                            justifyContent: 'start',
                            alignItems: 'start',
                          }}
                        >
                          <Typography variant="h6" sx={{ fontWeight: 300 }}>
                            {langType}
                          </Typography>
                        </FlexBox>

                        <FlexBox sx={{ width: '100%', minWidth: 300 }}>
                          <TextField
                            {...methods.register(`description.${index}.value`, { required: false })}
                            defaultValue={''}
                            multiline
                            placeholder={'optional'}
                            size="small"
                            fullWidth
                            rows={4}
                            error={
                              methods.formState.errors.name &&
                              !!methods.formState.errors.name[index]?.value
                            }
                            helperText={
                              methods.formState.errors.name &&
                              methods.formState.errors.name[index] &&
                              'you must provide value'
                            }
                          />
                        </FlexBox>
                      </FlexBox>
                    );
                  })}
                </FlexBox>
              </FlexBox>
              {/* 태그 병합 */}
              {isEditMode && mergeTagCandidate && (
                <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 300 }}>
                    태그 병합
                  </Typography>

                  <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
                    <TextField
                      select
                      fullWidth
                      label="Select"
                      defaultValue={methods.getValues('mergedTo') || ''}
                      inputProps={methods.register('mergedTo', {})}
                      error={!!methods.formState.errors.mergedTo}
                      helperText={methods.formState.errors.mergedTo?.message}
                      SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                      size="small"
                    >
                      {mergeTagCandidate.map((tag) => (
                        <MenuItem key={`${tag.name_en}-${tag.id}`} value={tag.id}>
                          <FlexBox>
                            {/* <Box sx={{ height: 40, width: 60 }}>
                        <Image src={tag.imageURL} sx={{ objectFit: 'contain' }} />
                      </Box> */}
                            <Paper
                              sx={{
                                height: 40,
                                width: 'fit-content',
                                paddingX: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography>{tag.kind.name_en}</Typography>
                            </Paper>
                            <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                              <Typography>{tag.name_en}</Typography>
                            </FlexBox>
                          </FlexBox>
                        </MenuItem>
                      ))}
                    </TextField>
                  </FlexBox>
                </FlexBox>
              )}
            </FlexBox>

            <FlexBox sx={{ justifyContent: 'end', paddingTop: 2, paddingBottom: 1, columnGap: 2 }}>
              <Button onClick={goBackToListPage} variant="outlined" color="warning">
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </FlexBox>
          </form>
        </FormProvider>
      </FlexBox>
    );
  }
}
