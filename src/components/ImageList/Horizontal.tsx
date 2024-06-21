import { useEffect, useRef, useState } from 'react';

import { SvgIconComponent } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function ImageIndexShiftButton({ onClick, Icon }: { onClick: () => void; Icon: SvgIconComponent }) {
  return (
    <ButtonBase
      sx={{
        display: 'flex',
        width: '5%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <Icon />
    </ButtonBase>
  );
}

export default function ImageShowHorizontal({ images }: { images: string[] }) {
  const imagesLen = images.length;
  const [imageIndex, setImageIndex] = useState<number>(0);

  const Title = 'Pictures';
  const gridRef = useRef<HTMLDivElement>(null);

  const smallImgWidth = 160;
  const smallImgHeight = Math.ceil((smallImgWidth / 16) * 9);

  // if (gridRef.current) {
  //   console.log(`gridRef.current.scrollLeft : ${gridRef.current.scrollLeft}`);
  // }
  // TODO: 이미지 이동 시 스크롤 같이 따라가기
  const shiftIndex = (value: number) => {
    setImageIndex((idx) => {
      if (idx + value < 0) {
        gridRef.current?.scroll({ behavior: 'smooth', left: smallImgWidth * 0 });
        return 0;
      }
      if (idx + value >= imagesLen - 1) {
        gridRef.current?.scroll({ behavior: 'smooth', left: smallImgWidth * (imagesLen - 1) });
        return imagesLen - 1;
      }
      gridRef.current?.scroll({ behavior: 'smooth', left: smallImgWidth * (idx + value) });
      return idx + value;
    });
  };

  // TODO: when Click, scroll to center of selected images
  // useEffect(()=> {
  //   gridRef.current?.scroll({ behavior: 'smooth', left: smallImgWidth * (imageIndex - 1) });
  // }, [imageIndex])

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        border: '1px black solid',
        flexDirection: 'column',
      }}
    >
      {/* <FlexBox>
        <Typography variant="h3">{Title}</Typography>
      </FlexBox> */}

      <FlexBox sx={{ width: '100%', flexDirection: 'column' }}>
        <FlexBox
          sx={{
            width: '100%',
            height: '100%',
            maxHeight: 450,
          }}
        >
          {/* 큰 사진(1개) */}
          <FlexBox
            sx={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FlexBox
              sx={{
                maxWidth: '100%',
                height: '100%',
              }}
            >
              <Image src={images[imageIndex]} sx={{ objectFit: 'contain' }} />
            </FlexBox>
          </FlexBox>
        </FlexBox>
        {/* 작은 사진 목록 */}
        <FlexBox
          sx={{
            height: '100%',
            paddingX: 1,
            paddingTop: 1,
            backgroundColor: '#cfcccc',
            flexDirection: 'row',
            // justifyContent: 'stretch',
          }}
        >
          <FlexBox
            sx={{
              width: '100%',
              height: smallImgHeight + 9,
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 1,
            }}
          >
            <ImageIndexShiftButton onClick={() => shiftIndex(-1)} Icon={ArrowBackIosIcon} />
            <Box
              sx={{
                display: 'grid',
                width: '90%',
                height: '100%',
                gridAutoRows: smallImgHeight,
                gridAutoColumns: smallImgWidth,
                gridAutoFlow: 'column',
                overflowX: 'scroll',
                paddingBottom: 1,
                columnGap: 0.5,
                scrollBehavior: 'smooth',
              }}
              ref={gridRef}
            >
              {images.map((image, idx) => {
                return (
                  <ButtonBase
                    sx={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      border: idx == imageIndex ? '4px solid white' : '2px solid transparent',
                    }}
                    key={`track-preview-${image}`}
                    onClick={() => setImageIndex(idx)}
                  >
                    <Image src={image} sx={{ objectFit: 'contain' }} />
                  </ButtonBase>
                );
              })}
            </Box>
            <ImageIndexShiftButton onClick={() => shiftIndex(1)} Icon={ArrowForwardIosIcon} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
