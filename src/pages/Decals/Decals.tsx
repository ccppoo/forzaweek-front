import { useNavigate } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { decals as decalImages } from '@/image/decal';

import { Image } from './styled';

const carinfo = {
  manufacture: 'Hyundai',
  year: 2021,
  country: 'Korea',
  name: '#98 Bryan Herta Autosport Elantra N',
  drive_train: 'FWD',
  body_style: 'sedan',
  door: 4,
  engine: 'ICE',
  FH5: {
    PI: 800,
    division: 'track toys',
  },
};

function DecalItemRow({ decal }: { decal: DecalData }) {
  const WIDTH = '100%';
  const HEIGHT = 200;
  const share_code3 = [
    decal.share_code.substring(0, 3),
    decal.share_code.substring(3, 6),
    decal.share_code.substring(6, 9),
  ];

  return (
    <Paper sx={{ width: WIDTH, maxWidth: 1200, height: HEIGHT, display: 'flex' }}>
      <FlexBox sx={{ aspectRatio: '16/9', height: '100%' }}>
        <Image
          src={decal.frontImage}
          sx={{
            objectFit: 'contain',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
      </FlexBox>
      <FlexBox
        sx={{ flexDirection: 'column', width: '100%', paddingX: 1, paddingY: 0.5, rowGap: 1 }}
      >
        <FlexBox sx={{ height: '20%' }}>
          <Typography variant="h4">hyundai elantra deco!!</Typography>
        </FlexBox>
        <FlexBox sx={{ height: '60%', columnGap: 1, rowGap: 1, flexWrap: 'wrap' }}>
          {decal.tags.map((tag) => (
            <Chip label={tag} key={`decal-tag-${decal.share_code}-${tag}`} />
          ))}
        </FlexBox>
        <FlexBox sx={{ height: '20%', width: '100%', justifyContent: 'space-between' }}>
          <FlexBox>
            <FlexBox
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 1,
                paddingX: 1,
                borderRadius: 4,
                backgroundColor: '#d1d1d1',
              }}
            >
              {share_code3.map((code_peice) => {
                return (
                  <Typography variant="h6" key={`decal-row-share-code-piece-${code_peice}`}>
                    {code_peice}
                  </Typography>
                );
              })}
            </FlexBox>
          </FlexBox>
          <FlexBox>
            <IconButton sx={{ borderRadius: 4 }}>
              <ModeCommentOutlinedIcon fontSize="small" />
              <FlexBox
                sx={{
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 0.5,
                }}
              >
                <Typography>{decal.fav.count}</Typography>
              </FlexBox>
            </IconButton>
            <IconButton sx={{ borderRadius: 4 }}>
              {decal.fav.checked ? (
                <FavoriteOutlinedIcon fontSize="small" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
              <FlexBox
                sx={{
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 0.5,
                }}
              >
                <Typography>{decal.fav.count}</Typography>
              </FlexBox>
            </IconButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Paper>
  );
}

function DecalItemCell({ decal }: { decal: DecalData }) {
  const carName = '#98 Bryan Herta Autosport Elantra N';

  const WIDTH = '33%';
  const HEIGHT = 400;
  const share_code3 = [
    decal.share_code.substring(0, 3),
    decal.share_code.substring(3, 6),
    decal.share_code.substring(6, 9),
  ];

  return (
    <Grid xs={4}>
      <Paper
        sx={{
          // width: '100%',
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
      >
        {/* 자동차 제조사/이름 */}
        <FlexBox sx={{ paddingX: 1, paddingY: 0.2, alignItems: 'center', columnGap: 1 }}>
          <Image src={image.manufacturer.hyundai} sx={{ width: 25, height: 25 }} />
          <Typography>{carName}</Typography>
        </FlexBox>
        {/* 사진 */}
        <FlexBox sx={{ aspectRatio: '16/9' }}>
          <Image
            src={decal.frontImage}
            sx={{
              objectFit: 'contain',
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          />
        </FlexBox>
        {/* 본문 */}
        <FlexBox
          sx={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            paddingX: 1,
            paddingY: 0.5,
            rowGap: 2,
            justifyContent: 'space-between',
          }}
        >
          <FlexBox sx={{ flexDirection: 'column' }}>
            {/* 차 이름 */}

            <FlexBox
              sx={{
                height: '100%',
                flexWrap: 'wrap',
                columnGap: 0.2,
                rowGap: 0.5,
                justifyContent: 'start',
                alignItems: 'flex-start',
              }}
            >
              {decal.tags.map((tag) => (
                <Chip label={tag} key={`decal-tag-${decal.share_code}-${tag}`} />
              ))}
            </FlexBox>
          </FlexBox>
          {/* 공유코드 + 댓글 + 좋아요 */}
          <FlexBox sx={{ height: '20%', width: '100%', justifyContent: 'space-between' }}>
            <FlexBox
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FlexBox
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                  paddingX: 1,
                  borderRadius: 4,
                  backgroundColor: '#d1d1d1',
                }}
              >
                {share_code3.map((code_peice) => {
                  return (
                    <Typography variant="h6" key={`decal-row-share-code-piece-${code_peice}`}>
                      {code_peice}
                    </Typography>
                  );
                })}
              </FlexBox>
            </FlexBox>
            <FlexBox>
              <IconButton sx={{ borderRadius: 4 }}>
                <ModeCommentOutlinedIcon fontSize="small" />
                <FlexBox
                  sx={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 0.5,
                  }}
                >
                  <Typography>{decal.fav.count}</Typography>
                </FlexBox>
              </IconButton>
              <IconButton sx={{ borderRadius: 4 }}>
                {decal.fav.checked ? (
                  <FavoriteOutlinedIcon fontSize="small" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                )}
                <FlexBox
                  sx={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 0.5,
                  }}
                >
                  <Typography>{decal.fav.count}</Typography>
                </FlexBox>
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Paper>
    </Grid>
  );
}

function DecalCellListing() {
  return (
    <Grid container sx={{ width: '100%' }} spacing={2}>
      {decalsWithImage.map((decal) => (
        <DecalItemCell decal={decal} />
      ))}
    </Grid>
  );
}

function DecalRowListing() {
  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      {decalsWithImage.map((decal) => (
        <DecalItemRow decal={decal} />
      ))}
    </FlexBox>
  );
}

export default function Decals() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = 200;
  const name = carinfo.name;
  const manufacturer = carinfo.manufacture;
  const year = carinfo.year;
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';

  return (
    <Container sx={{ height: '120vh' }}>
      <FullSizeCenteredFlexBox sx={{}}>
        <DecalCellListing />
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
