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
import { AddNewCar, EditCar } from '@/api/data/car';
import { UploadTempImage } from '@/api/data/image';
import { GetAllManufacturer } from '@/api/data/manufacturer';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';
import { BODY_STYLE, BOOST, DIVISIONS, ENGINE_TYPE, RARITY } from '@/data/values';

interface dataTextInputIntf {
  carEditSchema?: CarEditSchema;
}

type ImageItem = {
  name: string;
  url: string;
};

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
    setError,

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
  const { fields: names } = useFieldArray({
    control,
    name: 'name',
  });

  const { fields: short_names } = useFieldArray({
    control,
    name: 'short_name',
  });

  // console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: CarEditSchema) => {
    if (isEditMode) {
      await EditCar({ car: data });
      return;
    }
    if (!isEditMode) {
      await AddNewCar({ car: data });
    }
  };

  const handleOnError = (errors: SubmitErrorHandler<CarEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();

    if (!e.target.files) return;
    let uploadingImages: string[] = [];
    for (let idx: number = 0; idx < e.target.files.length; idx++) {
      const selectedFile = e.target.files[idx];
      const fileBlobURL = URL.createObjectURL(selectedFile);
      uploadingImages = [...uploadingImages, fileBlobURL];
    }
    // console.log(`uploadingImages : ${uploadingImages}`);
    const uploaded_images = [...imagePreviews, ...uploadingImages];
    // console.log(`uploaded_images : ${uploaded_images}`);
    setImagePreviews(uploaded_images);
    setValue('imageURLs', uploaded_images);
  };

  // useEffect(() => {
  //   return () => {
  //     if (imagePreviews) {
  //       // imagePreviews.map((imgPreview) => URL.revokeObjectURL(imgPreview));
  //     }
  //   };
  // }, [imagePreviews]);

  const setAsRepresentiveImage = (imageUrl: string) => {
    setValue('firstImage', imageUrl);
    setImagePreviews((prev) => [imageUrl, ...prev.filter((val) => val != imageUrl)]);
  };

  const removeAllImage = () => {
    setImagePreviews([]);
    setValue('imageURLs', []);
  };

  const removeImage = (imageUrl: string) => {
    const prevImage = getValues('imageURLs');
    const removed = prevImage.filter((val) => val != imageUrl);
    setValue('imageURLs', removed);
    setImagePreviews(removed);
  };

  const BoostSelectRequired = watch('fh5_meta.rarity') == 'Forza Edition';

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
                  rowGap: 1,
                  columnGap: 2,
                  paddingX: 1,
                  paddingY: 1,
                }}
              >
                {imagePreviews.map((imgBlob) => {
                  return (
                    <FlexBox
                      key={`uploaded-image-${imgBlob}`}
                      sx={{ flexDirection: 'column', width: 240 }}
                    >
                      <Paper>
                        <Image
                          src={imgBlob}
                          sx={{ objectFit: 'contain', width: '100%', height: 135 }}
                        />
                      </Paper>
                      <FlexBox
                        sx={{
                          height: 35,
                          columnGap: 1,
                          justifyContent: 'end',
                          alignItems: 'center',
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ paddingY: '2px', paddingX: '4px' }}
                          onClick={() => setAsRepresentiveImage(imgBlob)}
                        >
                          대표이미지
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          size="small"
                          sx={{ paddingY: '2px', paddingX: '2px' }}
                          startIcon={<DeleteOutlineOutlinedIcon />}
                          onClick={() => removeImage(imgBlob)}
                        >
                          삭제
                        </Button>
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
                    onClick={removeAllImage}
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
                          accept=".jpg, .jpeg, .png, .webp, .svg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            // onChange(e.target.files?.[0]);
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
                  {BODY_STYLE.map((bodyStyle) => (
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
                  defaultValue={getValues('engineType') || ''}
                  inputProps={register('engineType', {
                    required: 'Please select engineType',
                  })}
                  error={!!errors.engineType}
                  helperText={errors.engineType?.message}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                  size="small"
                >
                  {ENGINE_TYPE.map((engineType) => (
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
                    render={({ field: { name, onBlur, onChange, value } }) => (
                      <RadioGroup value={value} onBlur={onBlur} onChange={onChange} row>
                        <FormControlLabel value={0} control={<Radio size="small" />} label="0" />
                        <FormControlLabel value={1} control={<Radio size="small" />} label="1" />
                        <FormControlLabel value={2} control={<Radio size="small" />} label="2" />
                        <FormControlLabel value={3} control={<Radio size="small" />} label="3" />
                        <FormControlLabel value={4} control={<Radio size="small" />} label="4" />
                        <FormControlLabel value={5} control={<Radio size="small" />} label="5" />
                        <FormControlLabel value={6} control={<Radio size="small" />} label="6" />
                      </RadioGroup>
                    )}
                  />
                </FlexBox>
                <Typography>{errors.door && errors.door.message}</Typography>
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
              {names.map((field, index) => {
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
                        {...register(`name.${index}.value`, { required: true })}
                        defaultValue={''}
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
          <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingY: 1 }}>
            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                짧은 이름
              </Typography>
            </FlexBox>

            <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
              {short_names.map((field, index) => {
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
                        {...register(`short_name.${index}.value`, { required: true })}
                        defaultValue={''}
                        size="small"
                        fullWidth
                        error={errors.short_name && !!errors.short_name[index]?.value}
                        helperText={
                          errors.short_name && errors.short_name[index] && 'you must provide value'
                        }
                      />
                    </FlexBox>
                  </FlexBox>
                );
              })}
            </FlexBox>
          </FlexBox>

          <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingTop: 5 }}>
            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 300 }}>
                Forza Horizon 5 traits
              </Typography>
            </FlexBox>
          </FlexBox>

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
                  Division
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center', width: '100%', justifyContent: 'left' }}>
                <TextField
                  select
                  fullWidth
                  label="Select"
                  defaultValue={getValues('fh5_meta.division') || ''}
                  inputProps={register('fh5_meta.division', {
                    required: 'Please select division',
                  })}
                  error={!!errors.manufacturer}
                  helperText={errors.manufacturer?.message}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                  size="small"
                >
                  {DIVISIONS.map((division, idx) => (
                    <MenuItem key={`select-${division}-${idx}`} value={division}>
                      <FlexBox>
                        {/* <Box sx={{ height: 40, width: 60 }}>
                        <Image src={manufacturer.imageURL} sx={{ objectFit: 'contain' }} />
                      </Box> */}
                        <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                          <Typography>{division}</Typography>
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
                  Value
                </Typography>
              </FlexBox>
              <FlexBox
                sx={{ alignItems: 'center', width: '100%', justifyContent: 'left', columnGap: 2 }}
              >
                <TextField
                  {...register(`fh5_meta.value`, { required: true })}
                  defaultValue={''}
                  size="small"
                  fullWidth
                  error={errors.fh5_meta && !!errors.fh5_meta?.value}
                  helperText={
                    errors.fh5_meta && !!errors.fh5_meta?.value && 'you must provide value'
                  }
                />
                <Typography>CR</Typography>
              </FlexBox>
            </Box>
            <Box
              sx={{ display: 'grid', gridTemplateColumns: '160px auto', gridTemplateRows: '80px' }}
            >
              <FlexBox sx={{ alignItems: 'center', minWidth: 'fit-content', maxWidth: 150 }}>
                <Typography variant="h5" sx={{ fontWeight: 300 }}>
                  Rarirty
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center', width: '100%', justifyContent: 'left' }}>
                <TextField
                  select
                  fullWidth
                  label="Select"
                  defaultValue={getValues('fh5_meta.rarity') || 'Common'}
                  inputProps={register('fh5_meta.rarity', {
                    required: 'Please select rarity',
                  })}
                  error={!!errors.fh5_meta?.rarity}
                  helperText={!!errors.fh5_meta?.rarity?.message}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                  size="small"
                >
                  {RARITY.map((division, idx) => (
                    <MenuItem key={`select-${division}-${idx}`} value={division}>
                      <FlexBox>
                        {/* <Box sx={{ height: 40, width: 60 }}>
                        <Image src={manufacturer.imageURL} sx={{ objectFit: 'contain' }} />
                      </Box> */}
                        <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                          <Typography>{division}</Typography>
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
                  Boost
                </Typography>
              </FlexBox>
              <FlexBox sx={{ alignItems: 'center', width: '100%', justifyContent: 'left' }}>
                <TextField
                  select
                  fullWidth
                  label="Select"
                  disabled={!BoostSelectRequired}
                  defaultValue={getValues('fh5_meta.boost') || ''}
                  inputProps={register('fh5_meta.boost', {
                    required: BoostSelectRequired && 'Please select boost',
                  })}
                  error={!!errors.manufacturer}
                  helperText={errors.manufacturer?.message}
                  SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                  size="small"
                >
                  {BOOST.map((division, idx) => (
                    <MenuItem key={`select-${division}-${idx}`} value={division}>
                      <FlexBox>
                        {/* <Box sx={{ height: 40, width: 60 }}>
                        <Image src={manufacturer.imageURL} sx={{ objectFit: 'contain' }} />
                      </Box> */}
                        <FlexBox sx={{ alignItems: 'center', paddingX: 2 }}>
                          <Typography>{division}</Typography>
                        </FlexBox>
                      </FlexBox>
                    </MenuItem>
                  ))}
                </TextField>
              </FlexBox>
            </Box>
          </Box>

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
