import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import * as image from '@/image';
import type { CarSimpleSchemaType } from '@/FormData/car';
import { YearCard } from '@/components/YearCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

const carInfo = {
  manufacture: 'Hyundai',
  year: 2021,
  country: 'Korea',
  name: '#98 Bryan Herta Autosport Elantra N',
  drive_train: 'FWD',
  body_style: 'sedan',
  door: 4,
  engine: 'ICE',
  FH5: {
    PI: 800,
    division: 'track toys',
  },
};

export default function BriefCarInfo() {
  // TODO: onClick => goto car detail page

  const HEIGHT = 100;

  const gotoCarDetail = () => {};

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: HEIGHT,
        justifyContent: 'center',
      }}
    >
      <ButtonBase
        sx={{
          display: 'flex',
          width: '60%',
          minWidth: 700,
          border: '1px black solid',
          borderRadius: 3,
          paddingX: 1,
        }}
        onClick={gotoCarDetail}
      >
        {/* 근본이 되는 차 */}
        <FlexBox sx={{ aspectRatio: '16/9', height: '100%' }}>
          <Image src={image.car.hyundaiElantra} sx={{ objectFit: 'contain' }} />
        </FlexBox>
        {/* 차 이름 */}
        <FlexBox
          sx={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingX: 1,
          }}
        >
          {/* 제조사 로고 + 이름 */}
          <FlexBox sx={{ columnGap: 1 }}>
            <FlexBox
              sx={{
                aspectRatio: '1/1',
                height: 40,
              }}
            >
              <Image
                src={image.manufacturer.hyundai}
                sx={{
                  objectFit: 'contain',
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                }}
              />
            </FlexBox>
            <Typography variant="h6">{carInfo.manufacture}</Typography>
          </FlexBox>

          {/* 차 이름 + 연도 */}
          <FlexBox sx={{ alignItems: 'center', flexWrap: 'wrap', columnGap: 1 }}>
            <Typography variant="h6">{carInfo.name}</Typography>
            <YearCard year={carInfo.year} />
          </FlexBox>
        </FlexBox>
      </ButtonBase>
    </FlexBox>
  );
}

export function BriefCarInfo2({ carInfo }: { carInfo: CarSimpleSchemaType }) {
  // TODO: onClick => goto car detail page

  const HEIGHT = 100;

  const gotoCarDetail = () => {};

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: HEIGHT,
        justifyContent: 'center',
      }}
    >
      <ButtonBase
        sx={{
          display: 'flex',
          width: '60%',
          minWidth: 700,
          border: '1px black solid',
          borderRadius: 3,
          paddingX: 1,
        }}
        onClick={gotoCarDetail}
      >
        {/* 근본이 되는 차 */}
        <FlexBox sx={{ aspectRatio: '16/9', height: '100%' }}>
          <Image src={carInfo.first_image} sx={{ objectFit: 'contain' }} />
        </FlexBox>
        {/* 차 이름 */}
        <FlexBox
          sx={{
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingX: 1,
          }}
        >
          {/* 제조사 로고 + 이름 */}
          <FlexBox sx={{ columnGap: 1, alignItems: 'center' }}>
            <FlexBox
              sx={{
                // aspectRatio: '1/1',
                width: 'auto',
                height: 20,
              }}
            >
              <Image
                src={carInfo.manufacturer.imageURL}
                sx={{
                  objectFit: 'contain',
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                }}
              />
            </FlexBox>
            <Typography variant="h6">{carInfo.manufacturer.name_en}</Typography>
          </FlexBox>

          {/* 차 이름 + 연도 */}
          <FlexBox sx={{ alignItems: 'center', flexWrap: 'wrap', columnGap: 1 }}>
            <Typography variant="h6">{carInfo.name_en}</Typography>
            <YearCard year={carInfo.production_year} />
          </FlexBox>
        </FlexBox>
      </ButtonBase>
    </FlexBox>
  );
}
