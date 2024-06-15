import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

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
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import type { ManufacturerEditSchema } from '@/FormData/manufacturer';
import { manufacturerEditSchemaDefault } from '@/FormData/manufacturer';
import { UploadTempImage } from '@/api/data/image';
import { AddNewManufacturer, EditManufacturer } from '@/api/data/manufacturer';
import { GetAllNation } from '@/api/data/nation';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

interface dataTextInputIntf {
  manufacturerEditSchema?: ManufacturerEditSchema;
}

export default function ManufacturerForm(props: dataTextInputIntf) {
  const { manufacturerEditSchema } = props;
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    trigger,
    setValue,

    formState: { errors },
  } = useForm<ManufacturerEditSchema>({
    defaultValues: manufacturerEditSchema || manufacturerEditSchemaDefault,
    mode: 'onChange',
  });

  const { data: nationList } = useQuery({
    queryKey: ['manufacturer nation select'],
    queryFn: GetAllNation,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(getValues('imageURL') || null); // Blob URL
  const isEditMode = !!getValues('id');
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'i18n',
  });

  console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: ManufacturerEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);
    // const values = getValues();
    // const queryKey = ['add_nation', data.i18n[0].value];

    if (isEditMode) {
      await EditManufacturer({ manufacturer: data });
      return;
    }
    if (!isEditMode) {
      await AddNewManufacturer({ manufacturer: data });
    }
  };

  const handleOnError = (errors: SubmitErrorHandler<ManufacturerEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue('imageURL', undefined);
  };

  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    const fileBlobURL = URL.createObjectURL(selectedFile);
    const serverSideImageName = await UploadTempImage({
      folder: 'manufacturer',
      fileBlobURL: fileBlobURL,
    });
    setImagePreview(fileBlobURL || null);
    setValue('imageURL', serverSideImageName);
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  if (nationList) {
    const sortedNationList = nationList.toSorted((n1, n2) => (n1.name_en > n2.name_en ? 1 : -1));

    return (
      <FlexBox sx={{ flexDirection: 'column', paddingX: 2 }}>
        <form noValidate onSubmit={handleSubmit(submit)}>
          {/* 이미지 사진 */}
          <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
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
                  제조사 로고 사진
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
                        value: true,
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
                          accept=".png, .webp, .svg"
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
          {/* 제조사 소속 국가 */}
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
                  소속 국가
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center' }}>
                <TextField
                  select
                  fullWidth
                  label="Select"
                  defaultValue={getValues('origin') || ''}
                  inputProps={register('origin', {
                    required: 'Please select origin country',
                  })}
                  error={!!errors.origin}
                  helperText={errors.origin?.message}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 350 } } }}
                  size="small"
                >
                  {sortedNationList.map((nation) => (
                    <MenuItem key={`${nation.name_en}-${nation.id}`} value={nation.id}>
                      <FlexBox>
                        <Box sx={{ height: 40, width: 60 }}>
                          <Image src={nation.imageURL} sx={{ objectFit: 'contain' }} />
                        </Box>
                        <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                          <Typography>{nation.name_en}</Typography>
                        </FlexBox>
                      </FlexBox>
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
                gridTemplateRows: '80px',
              }}
            >
              <FlexBox sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  창립 연도
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center' }}>
                <TextField
                  {...register(`founded`, { required: true })}
                  defaultValue={''}
                  // placeholder={!isDefaultLang ? 'optional' : undefined}
                  size="small"
                  fullWidth
                  error={errors.founded && !!errors.founded}
                  helperText={errors.founded && errors.founded && 'you must provide value'}
                />
              </FlexBox>
            </Box>
          </FlexBox>
          {/* 번역 이름 */}
          <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 300 }}>
              번역
            </Typography>

            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              {fields.map((field, index) => {
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
                        {...register(`i18n.${index}.value`, { required: true })}
                        defaultValue={''}
                        // placeholder={!isDefaultLang ? 'optional' : undefined}
                        size="small"
                        fullWidth
                        error={errors.i18n && !!errors.i18n[index]?.value}
                        helperText={errors.i18n && errors.i18n[index] && 'you must provide value'}
                      />
                    </FlexBox>
                  </FlexBox>
                );
              })}
            </FlexBox>
          </FlexBox>
          <FlexBox sx={{ justifyContent: 'end', paddingTop: 2, paddingBottom: 1 }}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </FlexBox>
        </form>
      </FlexBox>
    );
  }
}
