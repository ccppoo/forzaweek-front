import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Container from '@mui/material/Container';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import * as Tables from './tables';

function Data() {
  const { dataType } = useParams();

  const ListTables: Record<string, () => ReactElement> = {
    nation: () => <Tables.NationTable />,
    manufacturer: () => <Tables.ManufacturerTable />,
    car: () => <Tables.CarTable />,
    // decal: () => <Tables.DecalTable />,
    tag: () => <Tables.TagTable />,
    tagkind: () => <Tables.TagKindTable />,
  };

  // console.log(`dataType : ${dataType}`);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FullSizeCenteredFlexBox
        sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 1, paddingBottom: 2 }}
      >
        {/* 데이터 값 */}
        {ListTables[dataType!]()}
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default Data;
