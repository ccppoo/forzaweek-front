import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import type { TagKindType } from '@/FormData/tag';
import { TagKind } from '@/FormData/tag';
import { AddNewTagKind, EditTagKind } from '@/api/tag/category';
import { FlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

interface dataTextInputIntf {
  tagKindEditSchema?: TagKindType.TagKindEditSchema;
}

const tagKinds = ['general', 'car', 'track', 'tuning', 'decal'];

export default function TagKindForm(props: dataTextInputIntf) {
  const navigate = useNavigate();
  const DATA_TYPE = 'tag';
  const { tagKindEditSchema } = props;

  const {
    control,
    handleSubmit,
    register,
    getValues,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<TagKindType.TagKindEditSchema>({
    defaultValues: tagKindEditSchema || TagKind.tagKindEditSchemaDefault,
    mode: 'onChange',
  });
  const goBackToListPage = () => navigate(`/data/${DATA_TYPE}`);
  const [imagePreview, setImagePreview] = useState<string | null>(getValues('imageURL') || null); // Blob URL

  const isEditMode = !!getValues('id');
  console.log(`isEditMode :${isEditMode}`);

  // console.log(`data : ${JSON.stringify(mergeTagCandidate)}`);

  const { fields: nameFields } = useFieldArray({
    control,
    name: 'name',
  });

  const { fields: descriptionFields } = useFieldArray({
    control,
    name: 'description',
  });

  const submit = async (data: TagKind.TagKindEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);

    if (isEditMode) {
      await EditTagKind({ tagKind: data });
      return;
    }
    if (!isEditMode) {
      await AddNewTagKind({ tagKind: data });
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
  const handleOnError = (errors: SubmitErrorHandler<TagKind.TagKindEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  // useEffect(() => {
  //   return () => {
  //     if (imagePreview) URL.revokeObjectURL(imagePreview);
  //   };
  // }, [imagePreview]);

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
                gridTemplateRows: '200px 50px',
              }}
            >
              <FlexBox sx={{ width: 200, minWidth: 200 }}>
                <Typography variant="h6" sx={{ fontWeight: 300 }}>
                  태그 종류 대표 사진
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
              <FlexBox sx={{ justifyContent: 'space-between', columnGap: 1, alignItems: 'center' }}>
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
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              태그 종류 이름
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
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              태그 종류 설명
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

                    <FlexBox sx={{ width: '100%', minWidth: 300, minHeight: 80 }}>
                      <TextField
                        rows={4}
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
