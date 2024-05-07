import { useNavigate } from 'react-router-dom';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';

import * as image from '@/image';
import PostCard from '@/components/PostCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import { Image } from './styled';

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container sx={{ height: '120vh' }}>
      <FlexBox sx={{ flexDirection: 'column', justifyContent: 'center', paddingY: 5, rowGap: 2 }}>
        {/*  뉴스/공지  */}
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>
            <Typography variant="h4">NEWS, Announcments</Typography>
          </FlexBox>
          <FlexBox sx={{ maxHeight: 300, height: 200, width: '100%', border: '1px black solid' }}>
            <Image
              src={image.series_33}
              sx={{
                width: 'auto',
                height: '100%',
              }}
            />
            <Typography>GT Racers Rush Through Mexico’s Roads in Apex AllStars.</Typography>
          </FlexBox>
        </FlexBox>

        {/* 주간 이벤트 */}
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>
            <Typography variant="h4">Week Festa</Typography>
          </FlexBox>
          <FlexBox sx={{ maxHeight: 300, height: 200, width: '100%', border: '1px black solid' }}>
            <Image
              src={image.series_33}
              sx={{
                width: 'auto',
                height: '100%',
              }}
            />
            <Typography>GT Racers Rush Through Mexico’s Roads in Apex AllStars.</Typography>
          </FlexBox>
        </FlexBox>
        {/* 튜닝, 데칼, 이벤트 맵, 사진, 기록, 가이드 */}
        <FlexBox sx={{ flexDirection: 'column' }}>
          <FlexBox>
            <Typography variant="h4">Tunings</Typography>
          </FlexBox>
          <FlexBox sx={{ maxHeight: 300, height: 200, width: '100%', border: '1px black solid' }}>
            <Image
              src={image.series_33}
              sx={{
                width: 'auto',
                height: '100%',
              }}
            />
            <Typography>GT Racers Rush Through Mexico’s Roads in Apex AllStars.</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
