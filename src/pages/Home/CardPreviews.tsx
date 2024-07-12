import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import * as image from '@/image';
import MainFullBanner from '@/components/MainFullBanner';
import PostCard from '@/components/PostCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function CardPreview() {
  const TITLE = 'GT Racers Rush Through Mexico’s Roads in Apex AllStars';
  const BODY = 'GT Racers Rush Through Mexico’s Roads in Apex AllStars';

  const W = 360;
  const H = 270;

  return (
    <FlexBox
      sx={{
        minWidth: W,
        width: W,
        minHeight: H,
        height: H,
        border: '1px black solid',
        borderRadius: 1,
      }}
    >
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ padding: 1 }}>
          <Image
            src={image.series_33}
            sx={{
              // width: '100%',
              objectFit: 'contain',
            }}
          />
        </FlexBox>

        <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingX: 1 }}>
          <Typography>{TITLE}</Typography>
          {/* <Typography>{BODY}</Typography> */}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function CardPreviews({ sectionTitle }: { sectionTitle: string }) {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      {/* Title */}
      <FlexBox sx={{ paddingBottom: 2 }}>
        <Typography variant="h4">{sectionTitle}</Typography>
      </FlexBox>
      {/* Cards */}
      <FlexBox sx={{ flexDirection: 'row', columnGap: 2, flexWrap: 'nowrap' }}>
        <CardPreview />
        <CardPreview />
        <CardPreview />
      </FlexBox>
    </FlexBox>
  );
}
