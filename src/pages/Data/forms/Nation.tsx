import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Checkbox, IconButton, List, Paper, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

import type { NationEditSchema } from '@/FormData/nation';
import { nationEditSchemaDefault } from '@/FormData/nation';
import { AddNewNation, EditNation, UploadNationFlag } from '@/api/data/nation';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

interface dataTextInputIntf {
  nationEditSchema?: NationEditSchema;
}

export default function NationForm(props: dataTextInputIntf) {
  const { nationEditSchema } = props;
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
    defaultValues: nationEditSchema || nationEditSchemaDefault,
    mode: 'onChange',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(getValues('imageURL') || null); // Blob URL
  const isEditMode = !!getValues('id');
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'i18n',
  });

  console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: NationEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);
    // const values = getValues();
    // const queryKey = ['add_nation', data.i18n[0].value];

    if (isEditMode) {
      await EditNation({ nation: data });
      return;
    }
    if (!isEditMode) {
      await AddNewNation({ nation: data });
    }
  };

  const handleOnError = (errors: SubmitErrorHandler<NationEditSchema>) => {
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
    //선택한 파일
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];

    const fileBlobURL = URL.createObjectURL(selectedFile);
    const serverSideImageName = await UploadNationFlag({ fileBlobURL: fileBlobURL });
    setImagePreview(fileBlobURL || null);
    setValue('imageURL', serverSideImageName);

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
                        accept="image/*"
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
