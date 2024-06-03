import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import * as image from '@/image';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function CarDetailInfoCell({
  title,
  value,
  image,
}: {
  title: string;
  value: string | number;
  image?: string;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '220px',
        gridTemplateRows: '35px 5px 50px',
      }}
    >
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 18, fontWeight: 200 }}>{title}</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', justifyContent: 'center', alignItems: 'start' }}>
        <Divider variant="middle" sx={{ margin: 0 }} />
      </FlexBox>
      <FlexBox sx={{ columnGap: 1, alignItems: 'center', justifyContent: 'center' }}>
        {image && (
          <FlexBox
            sx={{
              height: 50,
            }}
          >
            <Image
              src={image}
              sx={{
                width: 'auto',
                height: '100%',
                // maxHeight: '100%',
              }}
            />
          </FlexBox>
        )}
        <FlexBox sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontSize: 21, fontWeight: 400 }}>{value}</Typography>
        </FlexBox>
      </FlexBox>
    </Box>
  );
}

export default function CarDetailInfo() {
  const WIDTH = '100%';
  const HEIGHT = 100;
  const manufacturer = 'Hyundai';
  const country = 'Korea';
  const division = 'Super Hot Hatch';
  const prodYear = 2020;
  const bodyStyle = 'Sedan';
  // "engine": "ICE",
  //   "division": "super hot hatch",

  const detailInfo = [
    {
      title: 'Manufacturer',
      value: manufacturer,
      image: image.manufacturer.hyundai,
    },
    {
      title: 'Country',
      value: country,
      image: image.flags.korea,
    },
    {
      title: 'Production Year',
      value: prodYear,
      // image: image.manufacturer.hyundai,
    },
    {
      title: 'Division',
      value: division,
      // image: image.manufacturer.hyundai,
    },
    // {
    //   title: 'Body Style',
    //   value: bodyStyle,
    //   // image: image.manufacturer.hyundai,
    // },
  ];

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
        rowGap: 3,
        justifyContent: 'space-around',
      }}
    >
      {detailInfo.map((info) => {
        return <CarDetailInfoCell {...info} />;
      })}
    </FlexBox>
  );
}
