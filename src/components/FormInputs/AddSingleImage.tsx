import { ChangeEvent, useState } from 'react';
import { Controller } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Button, Typography } from '@mui/material';

import type { SingleImageDependentCreation } from '@/FormData/post/image';
import { FlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

type SingleImagesDepenednt = 'tag upload';

type AddSingleImageFormInput = {
  postType: SingleImagesDepenednt;
};

export default function AddSingleImage<T extends SingleImageDependentCreation>(
  props: AddSingleImageFormInput,
) {
  const { postType } = props;

  const { setValue, getValues, control, trigger, formState } = useFormContext<T>();

  // TODO: 받을 수 있는 확장자

  const allowed_formats = ['.svg', '.png', '.jpg', '.jpeg'];
  const INPUT_ACCEPT_EXT = allowed_formats.join(', ');

  const formPathImageURL = 'imageURL' as FieldPath<T>;
  const helperText = formState.errors.imageURL?.message ? 'you sould provide image' : undefined;
  type FormDataType = PathValue<T, FieldPath<T>>;
  const [imagePreview, setImagePreview] = useState<string | null>(
    getValues(formPathImageURL) || null,
  ); // Blob URL

  const removeImage = () => {
    setImagePreview(null);
    setValue(formPathImageURL, undefined as FormDataType);
  };

  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.persist();

    //선택한 파일
    if (!e.target.files) return;
    const selectedFile = e.target.files[0];
    const fileBlobURL = URL.createObjectURL(selectedFile);
    setImagePreview(fileBlobURL || null);
    setValue(formPathImageURL, fileBlobURL as FormDataType);
  };

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 2 }}>
      <FlexBox
        sx={{
          width: '100%',
          minWidth: 600,
          minHeight: 200,
          height: '100%',
          backgroundColor: 'rgba(244,244,244, 0.4)',
          borderRadius: 2,
          border: !!formState.errors?.imageURL ? '2px solid #d32f2f' : '1px solid black',
        }}
      >
        {imagePreview && <Image src={imagePreview} sx={{ objectFit: 'contain' }} />}
      </FlexBox>
      <FlexBox sx={{ justifyContent: 'space-between', columnGap: 1, alignItems: 'center' }}>
        <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
          <Typography sx={{}} style={{ color: '#d32f2f', fontWeight: 400, fontSize: '0.75rem' }}>
            {helperText}
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
            name={formPathImageURL}
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
                  accept={INPUT_ACCEPT_EXT}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(e.target.files?.[0]);
                    handleUploadClick(e);
                    trigger(formPathImageURL);
                  }}
                />
              </Button>
            )}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
