import { ChangeEvent, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FieldArrayPath, FieldPath, PathValue } from 'react-hook-form';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import type { MultipleImagesDependentCreation } from '@/FormData/post/image';
import { AuthedImageDelete } from '@/api/CDN/image/delete';
import { AuthedImageUpload } from '@/api/CDN/image/upload';
import { FlexBox, Image, VisuallyHiddenInput } from '@/components/styled';
import type {
  ImageUploadFailResponse,
  ImageUploadResponse,
  ImageUploadSuccessResponse,
} from '@/schema/CDN/image/upload';
import useAuthState from '@/store/auth';

type MultipleImagesDepenednt = 'decal upload';

interface AddMultipleImagesFormInputIntf {
  postType: MultipleImagesDepenednt;
  required?: boolean;
}

export default function AddMultipleImages<T extends MultipleImagesDependentCreation>(
  props: AddMultipleImagesFormInputIntf,
) {
  const { postType, required } = props;

  const { setValue, getValues, control, trigger } = useFormContext<T>();
  const [{ id_token }] = useAuthState();

  // TODO: 받을 수 있는 확장자
  const allowed_formats = ['.jpg', '.jpeg', '.png', '.webp'];
  const INPUT_ACCEPT_EXT = allowed_formats.join(', ');

  // TODO: 최대 업로드 이미지 개수 코드 측에서 제한
  const imageUploadMax = 20;

  const formPathImageURLs = 'imageURLs' as FieldPath<T>;
  // TODO: change to field Array
  // const formPathImageURLs = 'imageURLs' as FieldArrayPath<T>;
  // const {fields, append} = useFieldArray({control, name : formPathImageURLs})
  // const formPathFirstImage = 'firstImage' as FieldPath<T>;
  type FormDataType = PathValue<T, FieldPath<T>>;

  const [imagePreviews, setImagePreviews] = useState<string[]>(
    (getValues(formPathImageURLs) as string[]) || [],
  ); // Blob URL

  const [imagePreviewIdx, setImagePreviewIdx] = useState<number>(0);

  // WARNING: 업로드된 사진이 1개씩 빠르게 연속으로 업로드할 경우 이전의 작업이 무시됨
  const handleUploadClick = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!id_token) return; // NOTE: if not logged in, alert pop up

    e.preventDefault();
    e.persist();

    if (!e.target.files) return;
    // 기존 이미지 개수 + 업로드 이미지 개수 > 20 alert
    if (imageUploadMax < imagePreviews.length + e.target.files.length) {
      console.log(`총 올리려는 이미지 개수 : ${imagePreviews.length + e.target.files.length}`);
      return;
    }
    let uploadingImages: string[] = [];
    for (let idx: number = 0; idx < e.target.files.length; idx++) {
      const selectedFile = e.target.files[idx];
      const response: ImageUploadResponse = await AuthedImageUpload({
        file: selectedFile,
        authToken: id_token,
      });
      console.log(`response : ${JSON.stringify(response)}`);
      if (response.code < 2000 && response.code >= 3000) {
        response as ImageUploadFailResponse;
        continue;
      }
      const _response = response as ImageUploadSuccessResponse;
      uploadingImages = [...uploadingImages, _response.remoteURL];
    }
    // console.log(`BEFORE )) uploadingImages : ${uploadingImages}`);
    const uploaded_images = [...imagePreviews, ...uploadingImages];
    // console.log(`AFTER )) uploaded_images : ${uploaded_images}`);
    setImagePreviews(uploaded_images);
    setValue(formPathImageURLs, uploaded_images as FormDataType);
  };
  const gridRef = useRef<HTMLDivElement>(null);
  const imagePreviewHeight = 130;
  const smoothSlideImgPreview = (idx: number) => {
    if (idx == 0 || idx == imagePreviews.length - 1) {
      gridRef.current?.scroll({ behavior: 'smooth', top: imagePreviewHeight * idx });
      return;
    }
    gridRef.current?.scroll({ behavior: 'smooth', top: imagePreviewHeight * (idx - 1) });
  };
  const setAsRepresentiveImage = (imageUrl: string) => {
    // setValue(formPathFirstImage, imageUrl as FormDataType);
    setImagePreviews((prev) => [imageUrl, ...prev.filter((val) => val != imageUrl)]);
  };

  const changeImageOrder = (idx: number, shift: number) => {
    // shift : +1 : 더 뒤로 , -1 : 더 앞으로
    // const prevImage = getValues('imageURLs');
    const prevImage = imagePreviews;

    const [imgTarget, imgSwap] = [prevImage[idx], prevImage[idx + shift]];
    prevImage[idx + shift] = imgTarget;
    prevImage[idx] = imgSwap;
    setImagePreviews([...prevImage]);
    setValue(formPathImageURLs, [...prevImage] as FormDataType);
  };

  const imageOrderToFront = (imgIdx: number) => {
    const imgIdxChanged = imgIdx - 1;
    changeImageOrder(imgIdx, -1);
    // console.log(`image to front - before idx : ${imgIdx} -> ${imgIdx - 1}`);
    setImagePreviewIdx(imgIdxChanged);
    smoothSlideImgPreview(imgIdxChanged);
  };

  const imageOrderToBack = (imgIdx: number) => {
    const imgIdxChanged = imgIdx + 1;

    changeImageOrder(imgIdx, +1);
    // console.log(`image to front - before idx : ${imgIdx} -> ${imgIdx + 1}`);
    setImagePreviewIdx(imgIdxChanged);
    smoothSlideImgPreview(imgIdxChanged);
  };

  const removeAllImage = () => {
    setImagePreviews([]);
    setValue(formPathImageURLs, [] as FormDataType);
    setImagePreviewIdx(0);
  };

  const removeImage = async (imageURL: string) => {
    // const prevImage = getValues('imageURLs');
    const prevImage = imagePreviews;
    const removed = prevImage.filter((val) => val != imageURL);
    setValue(formPathImageURLs, removed as FormDataType);
    setImagePreviews(removed);
    await AuthedImageDelete({ imageURL, authToken: id_token! });
    if (imagePreviewIdx > imagePreviews.length - 1) {
      setImagePreviewIdx(imagePreviews.length - 1);
    }
  };

  console.log(`imagePreviews : ${imagePreviews}`);

  return (
    <FlexBox sx={{ width: '100%', height: 500, columnGap: 1 }}>
      <FlexBox sx={{ flex: 7, border: '1px solid black' }}>
        {imagePreviews && (
          <Image src={imagePreviews[imagePreviewIdx]} sx={{ objectFit: 'contain' }} />
        )}
      </FlexBox>
      <FlexBox sx={{ flex: 3, border: '1px solid black', flexDirection: 'column' }}>
        {/* 사진 업로드 개수, 제한 */}
        <FlexBox
          sx={{
            width: '100%',
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            paddingX: 1,
          }}
        >
          <Typography variant="body1" fontWeight={600}>
            {imagePreviews.length}
          </Typography>
          <Typography variant="body1">/{imageUploadMax} Images Uploaded</Typography>
        </FlexBox>
        {/* 사진 목록 */}
        <Box
          sx={{
            display: 'grid',
            width: '100%',
            height: '100%',
            overflowY: 'scroll',
            rowGap: 0.5,
            paddingRight: 1,

            overscrollBehavior: 'contain',
            gridTemplateColumns: 'auto',
            gridTemplateRows: 'repeat(auto-fill, 130px)',
          }}
          ref={gridRef}
        >
          {imagePreviews.map((imgURL, idx) => {
            return (
              <FlexBox
                key={`decal-image-upload-${imgURL}-${idx}`}
                sx={{
                  width: '100%',
                  height: 'fit-content',
                  padding: idx != imagePreviewIdx ? '4px' : undefined,
                  border: idx == imagePreviewIdx ? '4px solid green' : undefined,
                  columnGap: 1,
                }}
                onClick={() => {
                  setImagePreviewIdx(idx);
                  smoothSlideImgPreview(idx);
                }}
              >
                <Image src={imgURL} sx={{ objectFit: 'contain' }} />
                <FlexBox
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}
                >
                  <IconButton
                    color="primary"
                    sx={{ borderRadius: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      imageOrderToFront(idx);
                    }}
                    disabled={idx == 0}
                  >
                    <KeyboardArrowUpOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    sx={{ borderRadius: 0.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      imageOrderToBack(idx);
                    }}
                    disabled={idx == imagePreviews.length - 1}
                  >
                    <KeyboardArrowDownOutlinedIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    sx={{ borderRadius: 0.2 }}
                    onClick={async (e) => {
                      e.stopPropagation();
                      console.log(`delete imgURL : ${imgURL}`);
                      await removeImage(imgURL);
                    }}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                </FlexBox>
              </FlexBox>
            );
          })}
        </Box>

        {/* 사진 추가, 옵션 */}
        <FlexBox
          sx={{
            height: 50,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: 1,
            columnGap: 1,
          }}
        >
          <Button variant="outlined" size="small" color="error" onClick={removeAllImage}>
            Remove all
          </Button>
          <Controller
            name={formPathImageURLs}
            control={control}
            rules={{
              required: {
                value: !!required,
                message: 'you sould provide image',
              },
            }}
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <Button
                variant="contained"
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
                  accept={INPUT_ACCEPT_EXT}
                  onChange={(e) => {
                    handleUploadClick(e);
                    trigger(formPathImageURLs);
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
