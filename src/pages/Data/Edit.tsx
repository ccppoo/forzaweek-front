import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import { Box, Button, Checkbox, IconButton, List, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import { GetSchemaForEdit } from '@/api/data/edit';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

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

function EditData() {
  const { dataType, itemID } = useParams();
  const { data } = useQuery({
    queryKey: [dataType!, { dataType: dataType!, itemID: itemID! }],
    queryFn: GetSchemaForEdit,
    staleTime: 1,
  });

  const EditForms: Record<string, (data: any) => ReactElement> = {
    nation: (data) => <Forms.NationForm nationEditSchema={data} />,
    manufacturer: (data) => <Forms.ManufacturerForm manufacturerEditSchema={data} />,
    car: (data) => <Forms.CarForm carEditSchema={data} />,
    // tag: (data) => <Forms.TagForm tagEditSchema={data} />,
    // tagkind: (data) => <Forms.TagKindForm tagKindEditSchema={data} />,
  };

  console.log(`resp : ${JSON.stringify(data)}`);

  if (data) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 2 }}>
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
            {EditForms[dataType!](data)}
          </Paper>
        </FullSizeCenteredFlexBox>
      </Container>
    );
  }
}

export default EditData;
