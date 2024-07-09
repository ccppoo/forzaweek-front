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

import type { TagType } from '@/FormData/tag';
import { Tag } from '@/FormData/tag';
import { AddNewTag, EditTag, GetAllTag } from '@/api/data/tag';
import { GetAllTagKind } from '@/api/data/tagKind';
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

  const {
    control,
    handleSubmit,
    register,
    getValues,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<TagType.TagEditSchema>({
    defaultValues: tagEditSchema || Tag.tagEditSchemaDefault,
    mode: 'onChange',
  });

  const { data: tagKindList } = useQuery({
    queryKey: ['all tag kind'],
    queryFn: GetAllTagKind,
  });

  const goBackToListPage = () => navigate(`/data/${DATA_TYPE}`);
  const [imagePreview, setImagePreview] = useState<string | null>(getValues('imageURL') || null); // Blob URL

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

  const submit = async (data: Tag.TagEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);

    if (isEditMode) {
      await EditTag({ tag: data });
      return;
    }
    if (!isEditMode) {
      await AddNewTag({ tag: data });
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('imageURL', undefined);
  };

  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();

    //선택한 파일
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    const fileBlobURL = URL.createObjectURL(selectedFile);
    setImagePreview(fileBlobURL || null);
    setValue('imageURL', fileBlobURL);
  };
  const handleOnError = (errors: SubmitErrorHandler<Tag.TagEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  if (tagKindList) {
    const sortedTagKindList = tagKindList.toSorted((t1, t2) => (t1.name_en > t2.name_en ? 1 : -1));
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
                  <TextField
                    select
                    fullWidth
                    label="Select"
                    defaultValue={getValues('kind') || ''}
                    inputProps={register('kind', {
                      required: 'Please select tag kind',
                    })}
                    error={!!errors.kind}
                    helperText={errors.kind?.message}
                    SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                    size="small"
                  >
                    {sortedTagKindList.map((tagKind) => (
                      <MenuItem key={`${tagKind.name_en}-${tagKind.id}`} value={tagKind.id}>
                        <TagKindItemCell tag={tagKind} />
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
                  gridTemplateRows: '200px 50px',
                }}
              >
                <FlexBox sx={{ width: 200, minWidth: 200 }}>
                  <Typography variant="h5" sx={{ fontWeight: 300 }}>
                    태그 대표 사진
                  </Typography>
                </FlexBox>
                {/* 업로드한 사진 올라오는 곳 */}
                <FlexBox
                  sx={{
                    width: '100%',
                    minWidth: 600,
                    height: '100%',
                    backgroundColor: 'rgba(244,244,244, 0.4)',
                    borderRadius: 2,
                    border: !!errors?.imageURL ? '2px solid #d32f2f' : '1px solid black',
                  }}
                >
                  {imagePreview && <Image src={imagePreview} sx={{ objectFit: 'contain' }} />}
                </FlexBox>
                <FlexBox></FlexBox>
                <FlexBox
                  sx={{ justifyContent: 'space-between', columnGap: 1, alignItems: 'center' }}
                >
                  <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
                    <Typography
                      sx={{}}
                      style={{ color: '#d32f2f', fontWeight: 400, fontSize: '0.75rem' }}
                    >
                      {errors.imageURL?.message}
                    </Typography>
                  </FlexBox>
                  <FlexBox sx={{ columnGap: 1, height: '90%', alignItems: 'center' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      disabled={!!!imagePreview}
                      startIcon={<DeleteOutlinedIcon />}
                      onClick={removeImage}
                      size="small"
                    >
                      Remove
                    </Button>
                    <Controller
                      name="imageURL"
                      control={control}
                      rules={{
                        required: {
                          value: false,
                          message: 'you sould provide image',
                        },
                      }}
                      render={({ field: { ref, name, onBlur, onChange } }) => (
                        <Button
                          variant="outlined"
                          disabled={!!imagePreview}
                          startIcon={<FileUploadOutlined />}
                          component={'label'}
                          size="small"
                        >
                          Upload Image
                          <VisuallyHiddenInput
                            ref={ref}
                            name={name}
                            onBlur={onBlur}
                            type="file"
                            accept=".svg, .png, .jpg, .jpeg"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              onChange(e.target.files?.[0]);
                              handleUploadClick(e);
                              trigger('imageURL');
                            }}
                          />
                        </Button>
                      )}
                    />
                  </FlexBox>
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
                          alignItems: 'start',
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
                          rows={4}
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
      </FlexBox>
    );
  }
}
