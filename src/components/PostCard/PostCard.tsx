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
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import { PI_Card } from '@/components/PI';
import { YearCard } from '@/components/YearCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function PostCard() {
  const navigate = useNavigate();
  const YEAR = 2020;
  const BRAND = 'Chevrolet';
  const MODEL_NAME = 'Corvette Stingray Coupe';
  const PI_NUMER = 999;

  const LITERAL_Share = 'Share';
  const CREATED_AT = '2024-05-07';
  const TIME_PASSED_SINCE_UPLOAD = '3h';
  const CREATOR_NAME = 'Kent Dodds';
  const TITLE = 'Tunging for full grip and stable for street tracks';
  const UP_VOTE = 109;
  const DOWN_VOTE = 23;
  const COMMENT_COUNT = 5;

  return (
    <Container sx={{ height: '120vh' }}>
      <FullSizeCenteredFlexBox sx={{}}>
        <FlexBox
          sx={{
            flexDirection: 'column',
            minWidth: 320,
            maxWidth: 600,
            width: 400,
            backgroundColor: '#ECE3CE',
            paddingY: 1,
          }}
        >
          {/* body */}
          <FlexBox sx={{ flexDirection: 'row', columnGap: 2 }}>
            <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
              {/* creator */}
              <FlexBox
                sx={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  paddingX: 0.5,
                  paddingBottom: 0.5,
                  paddingTop: 0.5,
                  flexDirection: 'row',
                  columnGap: 1,
                }}
              >
                <Avatar
                  {...stringAvatar(CREATOR_NAME)}
                  sx={{ width: 27, height: 27, fontSize: 15 }}
                />
                <FlexBox>
                  <Typography>{CREATOR_NAME}</Typography>
                </FlexBox>
                <FlexBox>
                  <Typography
                    sx={{
                      opacity: 0.5,
                    }}
                  >
                    {TIME_PASSED_SINCE_UPLOAD}
                  </Typography>
                </FlexBox>
              </FlexBox>
              {/* Title */}
              <FlexBox sx={{ columnGap: 0.5, rowGap: 1, paddingX: 1 }}>
                <Typography variant="h6">{TITLE}</Typography>
              </FlexBox>
              {/* Image */}
              <FlexBox sx={{}}>
                <Image src={image.chevrolet_corvette_2020} />
              </FlexBox>
              <FlexBox
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ECE3CE',
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  flexDirection: 'column',
                  rowGap: 1,
                }}
              >
                {/* Car name, Class */}
                <FlexBox sx={{ flexDirection: 'column', paddingX: 0.5, paddingBottom: 1.2 }}>
                  <FlexBox sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <FlexBox sx={{ flexDirection: 'column' }}>
                      <Typography fontSize={21}>{MODEL_NAME}</Typography>
                      <FlexBox
                        sx={{ rowGap: 1, columnGap: 1, paddingLeft: 0.3, alignItems: 'center' }}
                      >
                        <Typography fontSize={15}>{BRAND}</Typography>
                        <YearCard year={YEAR} />
                      </FlexBox>
                    </FlexBox>
                    <PI_Card height={35} pi_number={PI_NUMER} />
                  </FlexBox>
                </FlexBox>

                {/* Tags */}
                <FlexBox sx={{ columnGap: 0.5, rowGap: 1, paddingX: 1.2 }}>
                  <Chip label="Full grip" />
                  <Chip label="all around" />
                  <Chip label="street" />
                </FlexBox>
                {/* Score, comments */}
                <FlexBox
                  sx={{
                    justifyContent: 'start',
                    alignItems: 'center',
                    columnGap: 1,
                    paddingX: 0.5,
                    paddingTop: 1.5,
                  }}
                >
                  {/* if clicked, change to ForwardIcon */}
                  <FlexBox
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '.5px solid #131313',
                      borderRadius: 6,
                      height: 36,
                    }}
                  >
                    <IconButton sx={{ borderRadius: 6 }} size="small">
                      <ForwardOutlinedIcon sx={{ transform: 'rotate(270deg)' }} />
                    </IconButton>
                    <Typography>{UP_VOTE - DOWN_VOTE}</Typography>
                    <IconButton sx={{ borderRadius: 6 }} size="small">
                      <ForwardOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />
                    </IconButton>
                  </FlexBox>

                  {/* comments count */}
                  <FlexBox
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '.5px solid #131313',
                      borderRadius: 6,
                      paddingLeft: 1,
                      paddingRight: 1,
                      height: 36,
                      '&:hover, &.Mui-focusVisible': {
                        backgroundColor: '#F0F0F0',
                      },
                    }}
                    component={ButtonBase}
                  >
                    <ChatBubbleOutlineOutlinedIcon sx={{ width: 24, height: 24, marginX: 0.5 }} />
                    <FlexBox sx={{ minWidth: 12, width: '100%', paddingX: 0.5 }}>
                      <Typography>{COMMENT_COUNT}</Typography>
                    </FlexBox>
                  </FlexBox>
                  {/* share button */}
                  <FlexBox
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '.5px solid #131313',
                      borderRadius: 6,
                      paddingLeft: 1,
                      paddingRight: 1,
                      height: 36,
                      '&:hover, &.Mui-focusVisible': {
                        backgroundColor: '#F0F0F0',
                      },
                    }}
                    component={ButtonBase}
                  >
                    <IosShareOutlinedIcon sx={{ width: 24, height: 24, marginX: 0.5 }} />
                    <FlexBox
                      sx={{ minWidth: 12, width: '100%', paddingLeft: 0.2, paddingRight: 0.5 }}
                    >
                      <Typography>{LITERAL_Share}</Typography>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
