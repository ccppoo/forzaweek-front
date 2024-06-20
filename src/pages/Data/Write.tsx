import { ReactElement, useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { Box, Button, Checkbox, IconButton, List, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';

import * as Forms from './forms';

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

function WriteData() {
  const { dataType } = useParams();

  const WriteForms: Record<string, ReactElement> = {
    nation: <Forms.NationForm />,
    manufacturer: <Forms.ManufacturerForm />,
    car: <Forms.CarForm />,
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FullSizeCenteredFlexBox
        sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 2, paddingBottom: 15 }}
      >
        {/* 데이터 값 */}
        <FlexBox sx={{ border: '1px black solid', borderRadius: 1 }}>
          {menus.map((val) => {
            return (
              <FlexBox sx={{}} key={`data-input-menu-${val.name}`}>
                <Button>{val.name}</Button>
              </FlexBox>
            );
          })}
        </FlexBox>
        <Paper
          sx={{
            display: 'flex',
            width: '100%',
            paddingX: 5,
            paddingY: 1,
            flexDirection: 'column',
          }}
        >
          {/* 제목 */}
          <FlexBox sx={{ paddingBottom: 3 }}>
            <Typography variant="h6">{dataType}</Typography>
          </FlexBox>
          {/* 데이터 채워야할 본문 */}
          {WriteForms[dataType!]}
        </Paper>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default WriteData;
