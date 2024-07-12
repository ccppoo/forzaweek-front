import { useState } from 'react';

import { SvgIconComponent } from '@mui/icons-material';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
import { Box, Divider, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import type { CarInfo2, EngineType } from '@/types/car';

function CarDetailInfoCell({
  title,
  value,
  image,
  IconComponent,
}: {
  title: string;
  value: string | number;
  image?: string;
  IconComponent?: SvgIconComponent;
}) {
  const engineTypeToolTip: Record<EngineType, string> = {
    HV: 'Hydrogen Vehicle',
    EV: 'Electric Vehicle',
    ICE: 'Internal Combustion engine',
  };

  const _value = value == 'ICE' ? 'IC Engine' : value;

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
              width: 'auto',
              maxWidth: 100,
              backgroundColor: 'white',
            }}
          >
            <Image
              src={image}
              sx={{
                backgroundColor: 'white',
                objectFit: 'contain',
              }}
            />
          </FlexBox>
        )}
        {IconComponent && <IconComponent />}
        <FlexBox sx={{ alignItems: 'center' }}>
          {title == 'Engine Type' ? (
            <Tooltip title={engineTypeToolTip[value as EngineType]} placement="top" arrow>
              <Typography sx={{ fontSize: 21, fontWeight: 400 }}>{_value}</Typography>
            </Tooltip>
          ) : (
            <Typography sx={{ fontSize: 21, fontWeight: 400 }}>{value}</Typography>
          )}
        </FlexBox>
      </FlexBox>
    </Box>
  );
}

export default function CarDetailInfo({ carInfo }: { carInfo: CarInfo2 }) {
  const engineTypeIcon: Record<EngineType, SvgIconComponent> = {
    EV: BoltOutlinedIcon,
    HV: WaterDropOutlinedIcon,
    ICE: LocalFireDepartmentOutlinedIcon,
  };

  const detailInfo = [
    {
      title: 'Manufacturer',
      value: carInfo.manufacturer.name_en,
      image: carInfo.manufacturer.imageURL,
    },
    {
      title: 'Origin',
      value: carInfo.nation.name_en,
      image: carInfo.nation.imageURL,
    },
    {
      title: 'Production Year',
      value: carInfo.productionYear,
    },
    {
      title: 'Engine Type',
      value: carInfo.engineType,
      IconComponent: engineTypeIcon[carInfo.engineType as EngineType],
    },
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
        return <CarDetailInfoCell {...info} key={`car-detail-info-${info.value}`} />;
      })}
    </FlexBox>
  );
}
