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
import MainFullBanner from '@/components/MainFullBanner';
import PostCard from '@/components/PostCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

import CardPreviews from './CardPreviews';
import Cars from './Cars';
import ShortCutMenu from './ShortCutMenu';

const sections = ['NEWS', 'Week Festa', 'Tunings'];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <MainFullBanner />
      <Container sx={{ height: '120vh' }}>
        <ShortCutMenu />
        <FlexBox sx={{ flexDirection: 'column', justifyContent: 'center', paddingY: 3, rowGap: 2 }}>
          {/*  뉴스/공지  */}
          <CardPreviews sectionTitle="NEWS / Announcements" />
          <CardPreviews sectionTitle="Week Festa" />
          {/* 자동차 */}
        </FlexBox>
      </Container>
    </>
  );
}
