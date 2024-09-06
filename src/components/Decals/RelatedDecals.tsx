import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { useQuery } from '@tanstack/react-query';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import useCarAndTagFilter from '@/store/carAndTagFilter';

function RelatedDecal({ decalData }: { decalData: DecalData }) {
  const creator = decalData.club ? `[${decalData.club}] ${decalData.creater}` : decalData.creater;
  const share_code = decalData.share_code;

  // TODO: decalData.fav.count -> 1000 넘어가면 줄이기
  const share_code3 = [
    share_code.substring(0, 3),
    share_code.substring(3, 6),
    share_code.substring(6, 9),
  ];
  // 16 9 -> 8 9
  return (
    <Grid
      xs={6}
      sx={{ display: 'flex', flexDirection: 'column', aspectRatio: '32/9', padding: 0.5 }}
    >
      <Paper sx={{ display: 'flex', width: '100%', height: '100%' }} elevation={4}>
        <Grid container sx={{ width: '100%' }} columnSpacing={1}>
          {/* 데칼 대표 사진 */}
          <Grid xs={6} sx={{ height: '100%' }}>
            <Image
              src={decalData.frontImage}
              sx={{
                objectFit: 'contain',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          </Grid>
          {/* 차 이름/튜닝 태그, 공유 코드 */}
          <Grid
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingBottom: 1,
            }}
          >
            {/* 제작자 */}
            <FlexBox sx={{ width: '100%' }}>
              <Typography variant="h6">{creator}</Typography>
            </FlexBox>
            {/* 태그 */}
            <FlexBox
              sx={{
                flexWrap: 'wrap',
                width: '100%',
                height: '100%',
                paddingTop: 1,
                columnGap: 0.5,
                rowGap: 0.5,
                alignContent: 'flex-start',
              }}
            >
              {decalData.tags.map((tag) => (
                <Chip key={`decal-tag-${tag}`} size="small" label={tag} />
              ))}
            </FlexBox>
            {/* 좋아요, 댓글 */}
            <Box
              sx={{
                display: 'grid',
                width: '100%',
                height: 25,
                gridTemplateColumns: 'auto 55px 55px',
              }}
            >
              <FlexBox></FlexBox>
              {/* 댓글 */}
              <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <IconButton sx={{ borderRadius: 1, paddingY: `2px`, paddingX: `4px` }}>
                  <ModeCommentOutlinedIcon sx={{ fontSize: 15 }} />
                  <FlexBox
                    sx={{
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 0.5,
                    }}
                  >
                    <Typography fontSize={15}>{decalData.fav.count}</Typography>
                  </FlexBox>
                </IconButton>
              </FlexBox>
              {/* 하트 */}
              <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <IconButton sx={{ borderRadius: 1, padding: `2px` }}>
                  {decalData.fav.checked ? (
                    <FavoriteOutlinedIcon sx={{ fontSize: 15 }} />
                  ) : (
                    <FavoriteBorderOutlinedIcon sx={{ fontSize: 15 }} />
                  )}
                  <FlexBox
                    sx={{
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 0.5,
                    }}
                  >
                    <Typography fontSize={15}>{decalData.fav.count}</Typography>
                  </FlexBox>
                </IconButton>
              </FlexBox>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

function DecalsShowMore({ carID }: { carID: string }) {
  const {
    actions: {
      car: { setCar: searchCarDecal },
    },
  } = useCarAndTagFilter('decal');

  const navigate = useNavigate();

  const goto = (relativePath: string) => navigate(relativePath);
  const goSearchDecals = async () => {
    searchCarDecal(carID);
    goto('/FH5/decal');
  };

  const onClick = async () => {
    await goSearchDecals();
  };

  return (
    <FlexBox sx={{ justifyContent: 'end', paddingX: 1, paddingTop: 1 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', marginX: 1 }}>
        <Button onClick={onClick}>show more decals</Button>
      </FlexBox>
    </FlexBox>
  );
}

export default function RelatedDecals({ carID }: { carID: string }) {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // useQuery()

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <FlexBox>
        <Typography variant="h5">Decals</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
        {/* 선택된 클래스에 있는 튜닝들 */}
        <Grid container>
          {decalsWithImage.map((decal) => (
            <RelatedDecal decalData={decal} key={`decal-cell-${decal.share_code}`} />
          ))}
        </Grid>
      </FlexBox>
      <DecalsShowMore carID={carID} />
    </FlexBox>
  );
}
