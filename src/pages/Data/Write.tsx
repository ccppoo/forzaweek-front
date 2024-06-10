import { ChangeEvent, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { Route, Routes, useParams } from 'react-router-dom';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Checkbox, IconButton, List, Paper, Typography } from '@mui/material';
import { TextFieldProps } from '@mui/material';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import * as image from '@/image';
import type { NationEditSchema } from '@/FormData/nation';
import { nationEditSchemaDefault } from '@/FormData/nation';
import { methods } from '@/FormData/provider';
import { AddNewNation, UploadNationFlag } from '@/api/data/nation';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';
import { supportLangs } from '@/config/i18n';
import { imageMatch } from '@/data/cars';
import carData from '@/data/cars.json';
import trackData from '@/data/track.json';
import { db } from '@/db';
import { Track } from '@/db/schema';
import useAddDataDialog from '@/store/addDataDialog';

const menus = [
  {
    name: 'nation',
  },
  {
    name: 'manufacturer',
  },
  {
    name: 'drive train',
  },
  {
    name: 'engine',
  },
  {
    name: 'car',
  },
  {
    name: 'body style',
  },
  {
    name: 'stat',
  },
  {
    name: 'tuning',
  },
];

const langs = [
  {
    lang: 'ko',
    country: [],
  },
  {
    lang: 'en',
    country: ['us', 'uk'],
  },
];

function DataTextInput() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    getValues,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<NationEditSchema>({
    defaultValues: nationEditSchemaDefault,
    mode: 'onTouched',
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'i18n',
  });

  // const queryClient = useQueryClient()

  const submit = async (data: NationEditSchema) => {
    // const values = getValues();
    const queryKey = ['add_nation', data.i18n[0].value];

    await AddNewNation({ nation: data });
    // const result = useQuery({
    //   queryKey: ['add_nation', data.i18n[0].value],
    //   queryFn: AddNewNation,
    // });
    // await AddNewNation({queryKey : queryKey, data})
    // console.log(`values :${JSON.stringify(data)}`);
  };

  const handleOnError = (errors: SubmitErrorHandler<NationEditSchema>) => {
    console.log(errors);
    // console.log(`errors : ${JSON.stringify(errors)}`);
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null); // Blob URL

  const removeImage = () => {
    setImagePreview(null);
    setValue('flagImageURL', undefined);
  };

  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();
    //선택한 파일
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    const fileBlobURL = URL.createObjectURL(selectedFile);
    // console.log(`fileBlobURL :${JSON.stringify(fileBlobURL)} type : ${typeof fileBlobURL}`);
    await UploadNationFlag({ fileBlobURL: fileBlobURL });
    setImagePreview(fileBlobURL || null);
    setValue('flagImageURL', fileBlobURL);

    // 업로드되는 파일에는 url이 있어야 한다. filePath로 보내줄 url이다.
    //획득한 Blob URL Address를 브라우져에서 그대로 호출 시에 이미지는 표시가 되고 ,
    //일반 파일의 경우 다운로드를 할 수 있다.
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <FlexBox sx={{ flexDirection: 'column', paddingX: 2 }}>
      <form noValidate onSubmit={handleSubmit(submit)}>
        {/* 이미지 사진 */}
        <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
          {/* <FlexBox sx={{ height: 200, width: '100%' }}> */}
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
                국기 사진
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
                border: !!errors?.flagImageURL ? '2px solid #d32f2f' : '1px solid black',
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
                  {errors.flagImageURL?.message}
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
                  name="flagImageURL"
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
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(e.target.files?.[0]);
                          handleUploadClick(e);

                          trigger('flagImageURL');
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
        <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 300 }}>
            번역
          </Typography>

          <FlexBox sx={{ flexDirection: 'column', rowGap: 1 }}>
            {fields.map((field, index) => {
              const isDefaultLang = !field.lang.country;
              const langType = `${field.lang.code}${
                isDefaultLang ? ' (default)' : `-${field.lang.country}`
              }`;
              return (
                <FlexBox key={`nation-input-value-${index}`} sx={{ width: '100%' }}>
                  {isDefaultLang ? (
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
                  ) : (
                    <FlexBox
                      sx={{
                        width: 180,
                        minWidth: 200,
                        paddingLeft: 2,
                        justifyContent: 'start',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 300 }}>
                        {langType}
                      </Typography>
                    </FlexBox>
                  )}

                  <FlexBox sx={{ width: '100%', minWidth: 300 }}>
                    <TextField
                      {...register(`i18n.${index}.value`, { required: isDefaultLang })}
                      defaultValue={''}
                      placeholder={!isDefaultLang ? 'optional' : undefined}
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
          <FlexBox sx={{ justifyContent: 'end', paddingTop: 2, paddingBottom: 1 }}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </FlexBox>
        </FlexBox>
      </form>
    </FlexBox>
  );
}

function WriteData() {
  const DataName = 'nation';

  return (
    <>
      <Meta title="Test" />
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 20 }}>
          {/* 데이터 값 */}
          <FlexBox sx={{ border: '1px black solid', borderRadius: 1 }}>
            {menus.map((val) => {
              return (
                <FlexBox sx={{}} key={`data-input-menu-${val.name}`}>
                  <Button>{val.name}</Button>
                </FlexBox>
              );
            })}
          </FlexBox>
          <Paper
            sx={{
              display: 'flex',
              width: '100%',
              paddingX: 5,
              paddingY: 1,
              flexDirection: 'column',
            }}
          >
            {/* 제목 */}
            <FlexBox sx={{ paddingBottom: 3 }}>
              <Typography variant="h6">{DataName}</Typography>
            </FlexBox>
            {/* 데이터 채워야할 본문 */}
            <DataTextInput />
          </Paper>
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default WriteData;
