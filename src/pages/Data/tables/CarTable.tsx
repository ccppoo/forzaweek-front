import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useQuery } from '@tanstack/react-query';

import { DeleteCar, GetAllCar } from '@/api/data/car';
import { DeleteManufacturer, GetAllManufacturer } from '@/api/data/manufacturer';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function CarItemCell() {
  const carData = {
    id: '6673ea25965dedfb913e0beb',
    manufacturer: {
      id: '666c0a0af4a9e37d504df328',
      i18n: [
        { value: 'Hyundai', lang: 'en' },
        { value: '현대자동차', lang: 'ko' },
      ],
      name_en: 'Hyundai',
      origin: {
        id: '6669657d5e6b6310989810e2',
        i18n: [
          { value: 'Korea', lang: 'en' },
          { value: '한국', lang: 'ko' },
        ],
        name_en: 'Korea',
        imageURL: 'https://fzwcdn.forzaweek.com/nation/Korea_flag.svg',
      },
      founded: 1967,
      imageURL: 'https://fzwcdn.forzaweek.com/manufacturer/Hyundai_logo.svg',
    },
    name_en: '#98 Bryan Herta Autosport Elantra N',
    name: [
      { value: '#98 Bryan Herta Autosport Elantra N', lang: 'en' },
      { value: '브라이언 헤르타 오토스포츠 98번', lang: 'ko' },
    ],
    short_name_en: 'Elantra N',
    short_name: [
      { value: '#98 Bryan Herta Autosport Elantra N', lang: 'en' },
      { value: '브라이언 헤르타 오토스포츠 98번', lang: 'ko' },
    ],
    imageURLs: [
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/5cdf57506dde4cad831ef86ed3c73cc5.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/a9d9eaafe1844da1bae3d3a58793ff8c.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/34a656d32ad34f56a995357e2bb2f87a.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/2267f428949b4ffc811c77563732891e.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/b43d05b9b9dc4c40824e9f7831ecb794.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/0c2a48e34d4644d994ee552c8b408920.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/03b0abe18db6403190bc2b2683419cd9.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/b3215222738b4b3b9aee6aadccb15c89.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/b86db65c38a74a0d81e0530871bb793f.jpg',
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/4a3fee91bbc94a9e84dc189d2c4bbbb3.webp',
    ],
    firstImage:
      'https://fzwcdn.forzaweek.com/car/Elantra%20N/4a3fee91bbc94a9e84dc189d2c4bbbb3.webp',
    production_year: 2021,
    engineType: 'ICE',
    bodyStyle: 'Sedan',
    door: 4,
    fh5_meta: { division: 'Track Toys', rarity: 'Rare', boost: '', value: 250000 },
  };
  return (
    <Box sx={{ display: 'grid', gridTemplateRows: '50px 175px', border: '1px solid black' }}>
      <FlexBox>차 이름 제조사</FlexBox>
      <FlexBox sx={{ width: '100%', height: '100%' }}>
        <FlexBox sx={{ height: '100%', flex: 2 }}>사진</FlexBox>
        <FlexBox sx={{ height: '100%', flex: 5 }}>정보들</FlexBox>
      </FlexBox>
    </Box>
  );
}

export default function CarTable() {
  const dataType = 'car';

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['get car'],
    queryFn: GetAllCar,
    staleTime: 900,
  });

  const deleteItem = async (itemID: string) => {
    // TODO: alert

    await DeleteCar({ documentID: itemID });
  };

  const addItem = () => {
    navigate(`/data/${dataType}/write`);
  };

  const editItem = (itemID: string) => {
    // TODO:
    // /data/car/edit/666851ce98f3742acfec3f67',
    navigate(`/data/${dataType}/edit/${itemID}`);
  };

  console.log(`data :  ${JSON.stringify(data)}`);

  if (data) {
    return (
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 2 }}>
        {/* 데이터 추가 버튼 */}
        <FlexBox sx={{ justifyContent: 'end' }}>
          <Button variant="outlined" onClick={addItem}>
            add data
          </Button>
        </FlexBox>
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'repeat(10, 225px)',
            gridTemplateColumns: 'repeat(1, minmax(500px, 1fr))',
            rowGap: 1,
            columnGap: 2,
          }}
        >
          <CarItemCell />
          {/* <FlexBox sx={{ border: '1px solid black' }}>car</FlexBox>
          <FlexBox sx={{ border: '1px solid black' }}>car</FlexBox>
          <FlexBox sx={{ border: '1px solid black' }}>car</FlexBox>
          <FlexBox sx={{ border: '1px solid black' }}>car</FlexBox>
          <FlexBox sx={{ border: '1px solid black' }}>car</FlexBox> */}
        </Box>
      </FlexBox>
    );
  }
}
