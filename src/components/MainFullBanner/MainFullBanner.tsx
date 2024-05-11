import * as image from '@/image';
import { FlexBox, Image } from '@/components/styled';

function MainFullBanner() {
  return (
    <FlexBox sx={{ width: '100%', height: '15rem' }}>
      <FlexBox sx={{ border: '1px black solid' }}>
        <Image src={image.poster.series33} height={'100%'} sx={{ objectFit: 'contain' }} />
        weekly events
      </FlexBox>
    </FlexBox>
  );
}

export default MainFullBanner;
