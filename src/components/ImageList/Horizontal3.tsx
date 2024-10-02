import { useEffect, useRef, useState } from 'react';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { SvgIconComponent } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function ImageIndexShiftButton({
  onClick,
  Icon,
  disabled,
}: {
  onClick: () => void;
  Icon: SvgIconComponent;
  disabled: boolean;
}) {
  return (
    <FlexBox
      sx={{
        display: 'flex',
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={onClick}
        disabled={disabled}
        sx={{
          borderRadius: 2,
        }}
      >
        <Icon />
      </IconButton>
    </FlexBox>
  );
}

function LargeImageShow({ imageURL, onFocus }: { imageURL: string; onFocus: boolean }) {
  return (
    <Collapse in={onFocus}>
      <FlexBox
        sx={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
        }}
      >
        <FlexBox
          sx={{
            maxWidth: '100%',
            height: '100%',
          }}
        >
          <Image src={imageURL} sx={{ objectFit: 'contain' }} />
        </FlexBox>
      </FlexBox>
    </Collapse>
  );
}

export function ImageShowHorizontal({ images }: { images: string[] }) {
  const imagesLen = images.length;
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [onFocus, setOnFocus] = useState<boolean>(false);

  const gridRef = useRef<HTMLDivElement>(null);

  const smallImgWidth = onFocus ? 160 : 224;
  const smallImgHeight = Math.ceil((smallImgWidth / 16) * 9);

  const handleClickAway = () => {
    setOnFocus(false);
  };

  const onClickImageBox = (imageIndex: number) => {
    setOnFocus(true);
    setImageIndex(imageIndex);
  };

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

  const toFrontButtonDisabled = imageIndex == 0;
  const toBackButtonDisabled = imageIndex == images.length - 1;

  // TODO: when Click, scroll to center of selected images
  useEffect(() => {
    gridRef.current?.scroll({ behavior: 'smooth', left: smallImgWidth * (imageIndex - 1) });
  }, [imageIndex]);

  /**
   * 클릭하기 전에는 작은 이미지 가로 목록
   * 클릭하면 이미 크게 보여줌
   */
  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        paddingY: 0.5,
      }}
    >
      {/* 클릭 하기 전까지는 작은 이미지 */}
      <ClickAwayListener onClickAway={handleClickAway}>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <LargeImageShow imageURL={images[imageIndex]} onFocus={onFocus} />
          <Paper
            sx={{
              display: 'flex',
              width: '100%',
              paddingY: 1,
              paddingX: 0.5,
              backgroundColor: '#EAEAEA',
              flexDirection: 'row',
              height: smallImgHeight + 18,
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 1,
            }}
          >
            <Collapse in={onFocus} orientation="horizontal">
              <ImageIndexShiftButton
                disabled={toFrontButtonDisabled}
                onClick={() => shiftIndex(-1)}
                Icon={ArrowBackIosIcon}
              />
            </Collapse>
            <Box
              sx={{
                display: 'grid',
                width: '100%',
                height: '100%',
                gridAutoRows: smallImgHeight,
                gridAutoColumns: smallImgWidth,
                gridAutoFlow: 'column',
                overflowX: 'scroll',
                columnGap: 0,
                scrollBehavior: 'smooth',
                overscrollBehavior: 'contain',
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
                      border:
                        onFocus && idx == imageIndex ? '4px solid white' : '4px solid transparent',
                    }}
                    key={`track-preview-${image}`}
                    onClick={() => onClickImageBox(idx)}
                  >
                    <Image src={image} sx={{ objectFit: 'contain' }} />
                  </ButtonBase>
                );
              })}
            </Box>
            <Collapse in={onFocus} orientation="horizontal">
              <ImageIndexShiftButton
                disabled={toBackButtonDisabled}
                onClick={() => shiftIndex(1)}
                Icon={ArrowForwardIosIcon}
              />
            </Collapse>
          </Paper>
        </FlexBox>
      </ClickAwayListener>
    </FlexBox>
  );
}
