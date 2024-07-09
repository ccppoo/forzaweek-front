import { ChangeEvent, useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import type { DecalEditSchema } from '@/FormData/decal';
import { decalEditSchemaDefault } from '@/FormData/decal';
import CarSearchAndSelectDialog from '@/components/Search/CarSearchAndSelectDialog';
import { TagItemCell } from '@/components/Tag';
import { TagSearchCreateTextFeild } from '@/components/TagSearchCreate';
import { FlexBox, FullSizeCenteredFlexBox, Image, VisuallyHiddenInput } from '@/components/styled';
import type { CarInfoEssential } from '@/types/car';

interface dataTextInputIntf {
  decalEditSchema?: DecalEditSchema;
}

export default function DecalWrite(props: dataTextInputIntf) {
  const selectScope = 'decal-post-create';

  const { decalEditSchema } = props;
  const methods = useForm<DecalEditSchema>({
    defaultValues: decalEditSchema || decalEditSchemaDefault,
    mode: 'onChange',
  });

  const deleteAddedTag = (tagIndex: number) => {
    const tags = methods.getValues('tags');
    methods.setValue(
      'tags',
      tags.filter((_, idx) => idx != tagIndex),
    );
  };
  const isEditMode = !!methods.getValues('id');
  const [imagePreviews, setImagePreviews] = useState<string[]>(methods.getValues('imageURLs')); // Blob URL
  const [carSelected, setCarSelected] = useState<CarInfoEssential | undefined>(undefined);
  const tagsAdded = methods.watch('tags');
  const imageUploadMax = 20;

  const setCarForDecalWrite = (car: CarInfoEssential) => {
    setCarSelected(car);
    methods.setValue('car', car.id);
  };

  console.log(`isEditMode :${isEditMode}`);
  const submit = async (data: DecalEditSchema) => {
    console.log(`data : ${JSON.stringify(data)}`);

    // if (isEditMode) {
    //   await EditDecal({ decal: data });
    //   return;
    // }
    // if (!isEditMode) {
    //   await AddNewDecal({ decal: data });
    // }

    return;
  };

  const [imagePreviewIdx, setImagePreviewIdx] = useState<number>(0);
  const handleOnError = (errors: SubmitErrorHandler<DecalEditSchema>) => {
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
    methods.setValue('imageURLs', uploaded_images);
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
    methods.setValue('firstImage', imageUrl);
    setImagePreviews((prev) => [imageUrl, ...prev.filter((val) => val != imageUrl)]);
  };

  const changeImageOrder = (idx: number, shift: number) => {
    // shift : +1 : 더 뒤로 , -1 : 더 앞으로
    const prevImage = methods.getValues('imageURLs');
    const [imgTarget, imgSwap] = [prevImage[idx], prevImage[idx + shift]];
    prevImage[idx + shift] = imgTarget;
    prevImage[idx] = imgSwap;
    setImagePreviews([...prevImage]);
    methods.setValue('imageURLs', [...prevImage]);
  };

  const imageOrderToFront = (imgIdx: number) => {
    const imgIdxChanged = imgIdx - 1;
    changeImageOrder(imgIdx, -1);
    console.log(`image to front - before idx : ${imgIdx} -> ${imgIdx - 1}`);
    setImagePreviewIdx(imgIdxChanged);
    smoothSlideImgPreview(imgIdxChanged);
  };

  const imageOrderToBack = (imgIdx: number) => {
    const imgIdxChanged = imgIdx + 1;

    changeImageOrder(imgIdx, +1);
    console.log(`image to front - before idx : ${imgIdx} -> ${imgIdx + 1}`);
    setImagePreviewIdx(imgIdxChanged);
    smoothSlideImgPreview(imgIdxChanged);
  };

  const removeAllImage = () => {
    setImagePreviews([]);
    methods.setValue('imageURLs', []);
    setImagePreviewIdx(0);
  };

  const removeImage = (imageUrl: string) => {
    const prevImage = methods.getValues('imageURLs');
    const removed = prevImage.filter((val) => val != imageUrl);
    methods.setValue('imageURLs', removed);
    setImagePreviews(removed);
    if (imagePreviewIdx > imagePreviews.length - 1) {
      setImagePreviewIdx(imagePreviews.length - 1);
    }
  };

  const [carSelectDialogOpened, setCarSelectDialogOpened] = useState<boolean>(false);

  const closeCarSelectDialog = () => setCarSelectDialogOpened(false);
  const openCarSelectDialog = () => setCarSelectDialogOpened(true);

  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ width: '100%', paddingBottom: 10, paddingTop: 4 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 2, width: '100%' }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: '200px',
                }}
              >
                <FlexBox sx={{ alignItems: 'center', height: '100%' }}>
                  <Typography>Base Car</Typography>
                </FlexBox>
                <FlexBox
                  sx={{
                    alignItems: 'center',
                    height: '100%',
                    columnGap: 2,
                  }}
                >
                  <Paper
                    sx={{
                      width: '100%',
                      height: '100%',
                      paddingLeft: 2,
                      paddingY: 1,
                      display: 'flex',
                    }}
                  >
                    <FlexBox sx={{ height: '100%', aspectRatio: '16/9' }}>
                      {carSelected?.image.first ? (
                        <Image src={carSelected.image.first} />
                      ) : (
                        <FlexBox></FlexBox>
                      )}
                    </FlexBox>
                    <FlexBox
                      sx={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingX: 1,
                      }}
                    >
                      {/* 선택한 차 제조사, 이름 */}
                      <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingLeft: 1 }}>
                        <FlexBox sx={{ columnGap: 2 }}>
                          <FlexBox sx={{ height: 20, alignItems: 'center' }}>
                            <Image src={carSelected?.manufacturer.imageURL} />
                          </FlexBox>
                          <Typography>{carSelected?.manufacturer.name_en}</Typography>
                        </FlexBox>
                        <Typography variant="h5">{carSelected && carSelected.name_en}</Typography>
                      </FlexBox>

                      <FlexBox
                        sx={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          width: '100%',
                          alignItems: 'end',
                        }}
                      >
                        <Button variant="outlined" onClick={openCarSelectDialog}>
                          select car
                        </Button>
                      </FlexBox>
                    </FlexBox>
                  </Paper>
                </FlexBox>
                <CarSearchAndSelectDialog
                  onClose={closeCarSelectDialog}
                  opened={carSelectDialogOpened}
                  setCar={setCarForDecalWrite}
                  selectScope={selectScope}
                />
              </Box>
              {/* 1. 원본 제작자 이름 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: '50px',
                }}
              >
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Typography>Creator username</Typography>
                </FlexBox>
                <FlexBox sx={{ alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label=""
                    defaultValue={methods.getValues('creator') || ''}
                    inputProps={methods.register('creator', {
                      required: 'Please input creator of decal',
                    })}
                    error={!!methods.formState.errors.share_code}
                    helperText={methods.formState.errors.share_code?.message}
                    SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                    size="small"
                  />
                </FlexBox>
              </Box>
              {/* 2. 공유 코드 입력 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: '50px',
                }}
              >
                <FlexBox sx={{ alignItems: 'center' }}>
                  <Typography>Share code</Typography>
                </FlexBox>
                {/* 3개로 나눠서 보기 편하게 */}
                <FlexBox sx={{ alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    label="e.g) 1234567890"
                    defaultValue={methods.getValues('share_code') || ''}
                    inputProps={methods.register('share_code', {
                      required: 'Please input share code',
                    })}
                    error={!!methods.formState.errors.share_code}
                    helperText={methods.formState.errors.share_code?.message}
                    SelectProps={{ MenuProps: { sx: { maxHeight: 450 } } }}
                    size="small"
                  />
                </FlexBox>
              </Box>
              {/* 3. 태그 붙이기 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox sx={{ alignItems: 'center', height: 60 }}>
                  <Typography>Decal Tags</Typography>
                </FlexBox>
                {/* 태그 자동완성 검색 -> 엔터누르면 완성되는 형식으로 */}
                <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
                  <TagSearchCreateTextFeild />
                  <Paper
                    sx={{ backgroundColor: 'EEEEEE', paddingX: 1, paddingY: 1, minHeight: 64 }}
                  >
                    {tagsAdded.length > 0 ? (
                      <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 1 }}>
                        {tagsAdded.map((tagID, idx) => (
                          <TagItemCell
                            tag={tagID}
                            key={`decal-write-tag-input-${tagID}-${idx}`}
                            onClickDelete={() => deleteAddedTag(idx)}
                          />
                        ))}
                      </FlexBox>
                    ) : (
                      <FlexBox sx={{ alignItems: 'center', height: '100%' }}>
                        <Typography fontWeight={300}>
                          Add tags that could describe this decal
                        </Typography>
                      </FlexBox>
                    )}
                  </Paper>
                </FlexBox>
              </Box>
              {/* 4. 이미지 올리기 */}
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '150px auto',
                  gridTemplateRows: 'auto',
                }}
              >
                <FlexBox>
                  <Typography>Decal Images</Typography>
                </FlexBox>
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
                              >
                                <KeyboardArrowDownOutlinedIcon />
                              </IconButton>

                              <IconButton
                                color="error"
                                sx={{ borderRadius: 0.2 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage(imgURL);
                                }}
                                disabled={idx == imagePreviews.length - 1}
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
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={removeAllImage}
                      >
                        Remove all
                      </Button>
                      <Controller
                        name="imageURLs"
                        control={methods.control}
                        rules={{
                          required: {
                            value: true,
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
                              accept=".jpg, .jpeg, .png, .webp"
                              onChange={(e) => {
                                handleUploadClick(e);
                                methods.trigger('imageURLs');
                              }}
                            />
                          </Button>
                        )}
                      />
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </Box>
              <FlexBox sx={{ width: '100%', justifyContent: 'end' }}>
                <Button type="submit" variant="outlined">
                  Post
                </Button>
              </FlexBox>
            </FlexBox>
          </form>
        </FormProvider>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
