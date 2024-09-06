import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import useCarAndTagFilter from '@/store/carAndTagFilter';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  position: relative;
  padding: 2px 6px 2px 6px;
  border-radius: 4px;
  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;
  }
`;

function setFontSize(target: string): number {
  if (target.length < 21) return 21;
  if (target.length < 24) return 18;
  if (target.length < 30) return 16;
  return 15;
}

export default function CarPreviewCard({ carInfo }: { carInfo: CarFH5FullType }) {
  const FULL_NAME = carInfo.baseCar.name.en[0];
  const NAME_FONT_SIZE = setFontSize(FULL_NAME);
  const YEAR = carInfo.baseCar.productionYear;
  const PI = carInfo.PI;
  const DIVISION = carInfo.meta.division;
  const EngineType = carInfo.baseCar.engineType;

  const {
    actions: {
      car: { setCar: searchCarDecal },
    },
  } = useCarAndTagFilter('decal');
  const {
    actions: {
      car: { setCar: searchCarTuning },
    },
  } = useCarAndTagFilter('tunings');
  const navigate = useNavigate();

  const goto = (relativePath: string) => navigate(relativePath);
  const goSearchDecals = async () => {
    searchCarDecal(carInfo.id);
    goto('/FH5/decal');
  };
  const goSearchTunings = async () => {
    searchCarTuning(carInfo.id);
    goto('/FH5/tuning');
  };

  return (
    <FlexBox sx={{ minWidth: 400, width: 'calc( 50% - 20px )', maxWidth: 560 }}>
      <Paper
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '150px 5px auto',
          gridTemplateRows: '120px',
          paddingTop: 0.5,
        }}
      >
        {/* 차 사진 */}
        <FlexBox
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={carInfo.imageURLs[0]}
            sx={{
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </FlexBox>
        {/* 여백  */}
        <Divider orientation="vertical" sx={{ margin: 0 }} />
        {/* 이름 기타 정보 */}
        <FlexBox
          sx={{
            paddingX: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'start',
            rowGap: 0.3,
          }}
        >
          {/* 차 이름 + 연식 */}
          <FlexBox sx={{ width: '100%', paddingY: 0.2, alignItems: 'baseline', columnGap: 1 }}>
            <StyledLink to={`/car/${carInfo.id}`}>
              <Typography fontSize={NAME_FONT_SIZE}>{FULL_NAME}</Typography>
            </StyledLink>
            <Typography variant="body2" sx={{ fontWeight: 200 }}>
              {YEAR}
            </Typography>
          </FlexBox>
          {/* 디비전 + 바로가기 버튼(데칼, 튜닝) */}
          <FlexBox
            sx={{
              columnGap: 1,
              justifyContent: 'start',
              height: '100%',
              paddingTop: 0.3,
              paddingX: 0.5,
              flexDirection: 'column',
            }}
          >
            <FlexBox>
              {/* 디비전 */}
              <FlexBox
                sx={{
                  border: '1px black solid',
                  borderRadius: 0.8,
                  paddingX: 0.5,
                  justifyContent: 'start',
                }}
              >
                <Typography variant="body2">{DIVISION}</Typography>
              </FlexBox>
            </FlexBox>

            {/* 데칼, 튜닝, 댓글  */}
            <FlexBox
              sx={{
                justifyContent: 'end',
                width: '100%',
                height: '100%',
                columnGap: 0.8,
                alignItems: 'end',
              }}
            >
              {/* TODO: click -> goto decal selected car */}
              <IconButton
                sx={{ padding: 0.4, borderRadius: 1, columnGap: 0.2 }}
                onClick={goSearchDecals}
              >
                <ColorLensOutlinedIcon fontSize="small" />
                <Typography sx={{ fontSize: '15px' }}>Decal</Typography>
              </IconButton>
              <IconButton
                sx={{ padding: 0.4, borderRadius: 1, columnGap: 0.2 }}
                onClick={goSearchTunings}
              >
                <BuildOutlinedIcon fontSize="small" />
                <Typography sx={{ fontSize: '15px' }}>Tuning</Typography>
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Paper>
    </FlexBox>
  );
}
