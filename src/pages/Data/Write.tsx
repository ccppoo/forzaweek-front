import { useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import * as image from '@/image';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
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

function createData(flagImage: string, ko: string, en: string) {
  return { flagImage, ko, en };
}

const rows = [
  createData(image.flags.korea, '한국', 'Korea'),
  createData(image.flags.japan, '일본', 'Japan'),
  createData(image.flags.usa, '미국', 'USA'),
  createData(image.flags.uk, '영국', 'UK'),
];

function DataInput() {
  const dataName = 'nation flag';
  return (
    <FlexBox>
      {/* 항목 이름 */}
      <FlexBox>
        <Typography>{dataName}</Typography>
      </FlexBox>
      {/* 채울 값 */}
      <FlexBox></FlexBox>
    </FlexBox>
  );
}

function WriteData() {
  const [msg, setMSG] = useState<string>('');

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
                <FlexBox sx={{}}>
                  <Button>{val.name}</Button>
                </FlexBox>
              );
            })}
          </FlexBox>
          <Paper
            sx={{
              display: 'flex',
              width: '100%',
              paddingX: 2,
              paddingY: 1,
              flexDirection: 'column',
            }}
          >
            {/* 제목 */}
            <FlexBox sx={{ paddingBottom: 3 }}>
              <Typography variant="h6">{DataName}</Typography>
            </FlexBox>

            {/* 데이터 채워야할 본문 */}
            <FlexBox sx={{ flexDirection: 'column' }}>
              <DataInput />
            </FlexBox>
          </Paper>
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default WriteData;
