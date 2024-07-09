import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import * as image from '@/image';
import { GetDataStatus } from '@/api/data/status';
import type { DataStatus, DataType } from '@/api/data/types';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

// import useAddDataDialog from '@/store/addDataDialog';

// const menu: DataType[] = ['nation' as DataType];

interface DataItemProps {
  name: string;
  number: number | undefined;
}

function DataItemCell(props: DataItemProps) {
  const { name, number } = props;
  const navigate = useNavigate();

  const navigateTo = (dataName: string) => navigate(`/data/${dataName}`);

  const title = name[0].toUpperCase().concat(name.substring(1));

  return (
    <Paper sx={{ display: 'grid', gridTemplateRows: '150px', gridTemplateColumns: '150px 300px' }}>
      <FlexBox sx={{}}>사진</FlexBox>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 1, rowGap: 2 }}>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlagOutlinedIcon style={{ fontSize: 30 }} />
          <Typography variant="h5">{title}</Typography>
        </FlexBox>
        <FlexBox>
          <Typography variant="body1">
            {name.toLowerCase()} saved : {number}
          </Typography>
        </FlexBox>
        <FlexBox sx={{ justifyContent: 'end', alignItems: 'end', height: '100%' }}>
          <Button sx={{ padding: 1 }} size="small" onClick={() => navigateTo(name)}>
            more
          </Button>
        </FlexBox>
      </FlexBox>
    </Paper>
  );
}

function Data() {
  const menu: DataType[] = ['nation', 'manufacturer', 'car', 'decal', 'tag', 'tagkind'];

  const { data } = useQuery({
    queryKey: ['data_status'],
    queryFn: GetDataStatus,
    staleTime: 30,
    placeholderData: {
      nation: undefined,
      manufacturer: undefined,
      car: undefined,
      decal: undefined,
      tag: undefined,
      tagkind: undefined,
    },
  });

  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 3 }}>
        <FlexBox sx={{ flexWrap: 'wrap', columnGap: 1, rowGap: 2 }}>
          {menu.map((dataName) => {
            return (
              <DataItemCell
                key={`data-menu-${dataName}`}
                name={dataName}
                number={data![dataName]}
              />
            );
          })}
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default Data;
