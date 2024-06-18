import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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

import type { CarEditSchema } from '@/FormData/car';
import { carEditSchemaDefault } from '@/FormData/car';
import { UploadTempImage } from '@/api/data/image';
import { AddNewManufacturer, EditManufacturer, GetAllManufacturer } from '@/api/data/manufacturer';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

interface dataTextInputIntf {
  carEditSchema?: CarEditSchema;
}

export default function CarForm(props: dataTextInputIntf) {
  const { carEditSchema } = props;
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    trigger,
    setValue,

    formState: { errors },
  } = useForm<CarEditSchema>({
    defaultValues: carEditSchema || carEditSchemaDefault,
    mode: 'onChange',
  });

  const { data: manufacturerList } = useQuery({
    queryKey: ['car manufacturer select'],
    queryFn: GetAllManufacturer,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>(getValues('imageURLs')); // Blob URL
  const isEditMode = !!getValues('id');
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'i18n',
  });

  // console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: CarEditSchema) => {
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

  const handleOnError = (errors: SubmitErrorHandler<CarEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  const removeImage = () => {
    setImagePreviews([]);
    setValue('imageURLs', []);
    // setImagePreview(null);
  };

  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();

    if (!e.target.files) return;
    let uploadingImages: string[] = [];
    for (let idx: number = 0; idx < e.target.files.length; idx++) {
      // console.log(`e.target.files   :${JSON.stringify(e.target.files[idx])}`);
      const selectedFile = e.target.files[0];
      const fileBlobURL = URL.createObjectURL(selectedFile);
      console.log(`fileBlobURL :${fileBlobURL}`);
      uploadingImages = [...uploadingImages, fileBlobURL];
      // const serverSideImageName = await UploadTempImage({
      //   folder: 'manufacturer',
      //   fileBlobURL: fileBlobURL,
      // });
    }
    // console.log(`uploadingImages : ${uploadingImages}`);
    const uploaded_images = [...imagePreviews, ...uploadingImages];
    // console.log(`uploaded_images : ${uploaded_images}`);
    setImagePreviews(uploaded_images);
    setValue('imageURLs', uploaded_images);
  };

  useEffect(() => {
    return () => {
      if (imagePreviews) {
        imagePreviews.map((imgPreview) => URL.revokeObjectURL(imgPreview));
      }
      // URL.revokeObjectURL(imagePreviews[0]);
    };
  }, [imagePreviews]);

  // fh5_meta

  const bodyStyles = ['Sedan', 'SUV'];
  const engineTypes = ['ICE', 'EV', 'HV'];

  if (manufacturerList) {
    // console.log(`manufacturerList : ${JSON.stringify(manufacturerList)}`);
    // console.log(`imagePreviews  :${imagePreviews}`);
    const sortedManufacturerList = manufacturerList.toSorted((n1, n2) =>
      n1.name_en > n2.name_en ? 1 : -1,
    );

    return (
      <FlexBox sx={{ flexDirection: 'column', paddingX: 2 }}>
        <form noValidate onSubmit={handleSubmit(submit)}>
          {/* 이미지 사진 */}
          <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
            <Box
              sx={{
                display: 'grid',
                width: '100%',
                gridTemplateColumns: '160px auto',
                gridTemplateRows: 'minmax( 200px, auto ) 50px',
              }}
            >
              <FlexBox sx={{ width: 160, minWidth: 160 }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  자동차 사진
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
                  border: !!errors?.imageURLs ? '2px solid #d32f2f' : '1px solid black',
                  flexWrap: 'wrap',
                }}
              >
                {imagePreviews.map((imgBlob) => {
                  return (
                    <FlexBox
                      key={`uploaded-image-${imgBlob}`}
                      sx={{ flexDirection: 'column', width: 240 }}
                    >
                      <Image
                        src={imgBlob}
                        sx={{ objectFit: 'contain', width: '100%', height: 135 }}
                      />
                      <FlexBox
                        sx={{
                          height: 35,
                          columnGap: 1,
                          justifyContent: 'space-around',
                          alignItems: 'center',
                        }}
                      >
                        <Button variant="contained" size="small">
                          대표이미지
                        </Button>
                        <FlexBox
                          sx={{ alignItems: 'center', justifyContent: 'end', columnGap: 0.5 }}
                        >
                          <Button
                            color="error"
                            variant="contained"
                            size="small"
                            sx={{ paddingY: '2px', paddingX: '2px' }}
                            startIcon={<DeleteOutlineOutlinedIcon />}
                          >
                            삭제
                          </Button>
                        </FlexBox>
                      </FlexBox>
                    </FlexBox>
                  );
                })}
                {/* {imagePreviews && <Image src={imagePreviews[0]} sx={{ objectFit: 'contain' }} />} */}
              </FlexBox>
              <FlexBox></FlexBox>
              <FlexBox sx={{ justifyContent: 'space-between', columnGap: 1, alignItems: 'center' }}>
                <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
                  <Typography
                    sx={{}}
                    style={{ color: '#d32f2f', fontWeight: 400, fontSize: '0.75rem' }}
                  >
                    {errors.imageURLs?.message}
                  </Typography>
                </FlexBox>
                <FlexBox sx={{ columnGap: 1, height: '90%', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    // disabled={!!!imagePreviews}
                    startIcon={<DeleteOutlinedIcon />}
                    onClick={removeImage}
                    size="small"
                  >
                    Remove All
                  </Button>
                  <Controller
                    name="imageURLs"
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
                        // disabled={!!imagePreviews}
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
                          multiple
                          accept=".png, .webp, .svg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(e.target.files?.[0]);
                            handleUploadClick(e);
                            trigger('imageURLs');
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
          <Box
            sx={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: '160px auto',
              gridTemplateRows: '80px',
            }}
          >
            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                제조사
              </Typography>
            </FlexBox>
            <FlexBox sx={{ alignItems: 'center' }}>
              <TextField
                select
                fullWidth
                label="Select"
                defaultValue={getValues('manufacturer') || ''}
                inputProps={register('manufacturer', {
                  required: 'Please select manufacturer',
                })}
                error={!!errors.manufacturer}
                helperText={errors.manufacturer?.message}
                SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                size="small"
              >
                {sortedManufacturerList.map((manufacturer) => (
                  <MenuItem
                    key={`${manufacturer.name_en}-${manufacturer.id}`}
                    value={manufacturer.id}
                  >
                    <FlexBox>
                      <Box sx={{ height: 40, width: 60 }}>
                        <Image src={manufacturer.imageURL} sx={{ objectFit: 'contain' }} />
                      </Box>
                      <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                        <Typography>{manufacturer.name_en}</Typography>
                      </FlexBox>
                    </FlexBox>
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>
          </Box>
          <Box
            sx={{
              display: 'grid',
              width: '100%',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: 'repeat(auto-fill, 80px)',
              columnGap: 6,
              rowGap: 0,
            }}
          >
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '160px auto', gridTemplateRows: '80px' }}
            >
              <FlexBox sx={{ alignItems: 'center', minWidth: 'fit-content', maxWidth: 150 }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  Body Style
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center', width: '100%', justifyContent: 'left' }}>
                <TextField
                  select
                  fullWidth
                  label="Select"
                  defaultValue={getValues('bodyStyle') || ''}
                  inputProps={register('bodyStyle', {
                    required: 'Please select bodyStyle',
                  })}
                  error={!!errors.bodyStyle}
                  helperText={errors.bodyStyle?.message}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                  size="small"
                >
                  {bodyStyles.map((bodyStyle) => (
                    <MenuItem key={`body-style-${bodyStyle}`} value={bodyStyle}>
                      <FlexBox>
                        {/* <Box sx={{ height: 40, width: 60 }}>
                        <Image src={manufacturer.imageURL} sx={{ objectFit: 'contain' }} />
                      </Box> */}
                        <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                          <Typography>{bodyStyle}</Typography>
                        </FlexBox>
                      </FlexBox>
                    </MenuItem>
                  ))}
                </TextField>
              </FlexBox>
            </Box>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '160px auto', gridTemplateRows: '80px' }}
            >
              <FlexBox sx={{ alignItems: 'center', minWidth: 'fit-content', maxWidth: 150 }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  Engine Type
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center', width: '100%', justifyContent: 'left' }}>
                <TextField
                  select
                  fullWidth
                  label="Select"
                  defaultValue={getValues('bodyStyle') || ''}
                  inputProps={register('bodyStyle', {
                    required: 'Please select bodyStyle',
                  })}
                  error={!!errors.bodyStyle}
                  helperText={errors.bodyStyle?.message}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                  size="small"
                >
                  {engineTypes.map((engineType) => (
                    <MenuItem key={`engine-type-${engineType}`} value={engineType}>
                      <FlexBox>
                        {/* <Box sx={{ height: 40, width: 60 }}>
                        <Image src={manufacturer.imageURL} sx={{ objectFit: 'contain' }} />
                      </Box> */}
                        <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                          <Typography>{engineType}</Typography>
                        </FlexBox>
                      </FlexBox>
                    </MenuItem>
                  ))}
                </TextField>
              </FlexBox>
            </Box>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '160px auto', gridTemplateRows: '80px' }}
            >
              <FlexBox sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  Doors
                </Typography>
              </FlexBox>
              <FlexBox sx={{ width: '100%', alignItems: 'center' }}>
                <FlexBox sx={{ minWidth: 120 }}>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name="door"
                    render={({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel value={2} control={<Radio />} label="2" />
                        <FormControlLabel value={4} control={<Radio />} label="4" />
                      </RadioGroup>
                    )}
                  />
                </FlexBox>
                <FlexBox
                  sx={{ justifyContent: 'end', width: '100%', alignItems: 'center', columnGap: 1 }}
                >
                  <Typography>기타</Typography>
                  <TextField
                    {...register(`door`, { required: true })}
                    defaultValue={''}
                    size="small"
                    sx={{ width: 80 }}
                    error={errors.door && !!errors.door}
                    helperText={errors.door && 'you must provide value'}
                  />
                </FlexBox>
              </FlexBox>
            </Box>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '160px auto', gridTemplateRows: '80px' }}
            >
              <FlexBox sx={{ alignItems: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  출시 연도
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center' }}>
                <TextField
                  {...register(`production_year`, { required: true })}
                  defaultValue={''}
                  size="small"
                  fullWidth
                  placeholder=""
                  // sx={{ maxWidth: 150 }}
                  error={errors.production_year && !!errors.production_year}
                  helperText={errors.production_year && 'you must provide value'}
                />
              </FlexBox>
            </Box>
          </Box>

          {/* 번역 이름 */}
          <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingY: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 300 }}>
              이름
            </Typography>

            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              {fields.map((field, index) => {
                const langType = `${field.lang}`;
                return (
                  <FlexBox key={`nation-input-value-${index}`} sx={{ width: '100%' }}>
                    <FlexBox
                      sx={{
                        minWidth: 160,
                        width: 160,
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
          <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingY: 1 }}>
            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                짧은 이름
              </Typography>
            </FlexBox>

            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              {fields.map((field, index) => {
                const langType = `${field.lang}`;
                return (
                  <FlexBox key={`nation-input-value-${index}`} sx={{ width: '100%' }}>
                    <FlexBox
                      sx={{
                        minWidth: 160,
                        width: 160,
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
                        {...register(`short_i18n.${index}.value`, { required: true })}
                        defaultValue={''}
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
