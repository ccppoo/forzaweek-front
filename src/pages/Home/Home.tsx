import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import MainFullBanner from '@/components/MainFullBanner';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { usePublisher } from '@/socket/publisher';
import { useSubscriber } from '@/socket/subscriber';

import CardPreviews from './CardPreviews';
import ShortCutMenu from './ShortCutMenu';

const sections = ['NEWS', 'Week Festa', 'Tunings'];

export default function Home() {
  const navigate = useNavigate();

  const { publish } = usePublisher({ url: mainSocketConfig.url, topic: 'dbStateCheck' });
  const { latestMessage } = useSubscriber({ url: mainSocketConfig.url, topic: 'ping' });

  // 임시
  useEffect(() => {
    const intervalID = setInterval(() => {
      publish({ table: 'nation' });
    }, 5000);

    return () => clearInterval(intervalID);
  }, []);

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
