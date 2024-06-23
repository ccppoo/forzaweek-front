import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import type { TagEditSchema } from '@/FormData/tag';
import { tagEditSchemaDefault } from '@/FormData/tag';
import { AddNewTag, EditTag, GetAllTag } from '@/api/data/tag';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

interface dataTextInputIntf {
  tagEditSchema?: TagEditSchema;
}

const tagKinds = ['general', 'car', 'track', 'tuning', 'decal'];

export default function TagForm(props: dataTextInputIntf) {
  const navigate = useNavigate();
  const DATA_TYPE = 'tag';
  const { tagEditSchema } = props;

  const {
    control,
    handleSubmit,
    register,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TagEditSchema>({
    defaultValues: tagEditSchema || tagEditSchemaDefault,
    mode: 'onChange',
  });
  const goBackToListPage = () => navigate(`/data/${DATA_TYPE}`);

  const isEditMode = !!getValues('id');
  const { data: mergeTagCandidate } = useQuery({
    queryKey: [DATA_TYPE, tagEditSchema?.kind],
    queryFn: GetAllTag,
    enabled: isEditMode,
  });

  // console.log(`data : ${JSON.stringify(mergeTagCandidate)}`);

  const { fields: nameFields } = useFieldArray({
    control,
    name: 'name',
  });

  const { fields: descriptionFields } = useFieldArray({
    control,
    name: 'description',
  });

  const submit = async (data: TagEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);

    if (isEditMode) {
      await EditTag({ tag: data });
      return;
    }
    if (!isEditMode) {
      await AddNewTag({ tag: data });
    }
  };

  const handleOnError = (errors: SubmitErrorHandler<TagEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  return (
    <FlexBox sx={{ flexDirection: 'column', paddingX: 2 }}>
      <form noValidate onSubmit={handleSubmit(submit)}>
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
                <Controller
                  rules={{ required: true }}
                  control={control}
                  name="kind"
                  render={({ field: { name, onBlur, onChange, value } }) => (
                    <RadioGroup value={value} onBlur={onBlur} onChange={onChange} row>
                      {tagKinds.map((tag, idx) => (
                        <FormControlLabel
                          key={`tag-edit-radio-${tag}-${idx}`}
                          value={tag}
                          control={<Radio size="small" />}
                          label={tag}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </FlexBox>
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
                  <FlexBox key={`nation-input-value-${field.lang}-${index}`} sx={{ width: '100%' }}>
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
                        {...register(`name.${index}.value`, { required: true })}
                        defaultValue={''}
                        multiline
                        // placeholder={!isDefaultLang ? 'optional' : undefined}
                        size="small"
                        fullWidth
                        error={errors.name && !!errors.name[index]?.value}
                        helperText={errors.name && errors.name[index] && 'you must provide value'}
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
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 300 }}>
                        {langType}
                      </Typography>
                    </FlexBox>

                    <FlexBox sx={{ width: '100%', minWidth: 300 }}>
                      <TextField
                        {...register(`description.${index}.value`, { required: false })}
                        defaultValue={''}
                        multiline
                        placeholder={'optional'}
                        size="small"
                        fullWidth
                        error={errors.name && !!errors.name[index]?.value}
                        helperText={errors.name && errors.name[index] && 'you must provide value'}
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
                  defaultValue={getValues('mergedTo') || ''}
                  inputProps={register('mergedTo', {})}
                  error={!!errors.mergedTo}
                  helperText={errors.mergedTo?.message}
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
                          <Typography>{tag.kind}</Typography>
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
    </FlexBox>
  );
}
