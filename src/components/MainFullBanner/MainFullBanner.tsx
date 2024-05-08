import * as image from '@/image';
import { FlexBox, Image } from '@/components/styled';

function MainFullBanner() {
  return (
    <FlexBox sx={{ width: '100%', height: '15rem' }}>
      <FlexBox>
        <Image src={image.poster.series33} height={'100%'} sx={{ objectFit: 'contain' }} />
      </FlexBox>
    </FlexBox>
  );
}

export default MainFullBanner;
