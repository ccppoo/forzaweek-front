import { Box, Typography } from '@mui/material';

import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { useSubscriber } from '@/socket/subscriber';

import { Image } from './styled';

function Test() {
  const DEV_backend = 'wss://localhost:8443/dev';

  const { latestMessage: pongMsg111, all } = useSubscriber({
    url: `${DEV_backend}/111`,
    topic: 'pong',
  });

  const { latestMessage: pongMsg555 } = useSubscriber({ url: `${DEV_backend}/555`, topic: 'pong' });

  return (
    <>
      <Meta title="Test" />
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4 }}>
        <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', rowGap: 2 }}>
          <FlexBox>
            <Typography>id : 111</Typography>
          </FlexBox>
          <FlexBox>
            <Typography>recentMessage pong : {JSON.stringify(pongMsg111?.message)}</Typography>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            {all.map((msg) => {
              return <Typography key={msg.GQM_ID}>message : {msg?.message}</Typography>;
            })}
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ flexDirection: 'column', alignItems: 'center', rowGap: 2 }}>
          <FlexBox>
            <Typography>id : 555</Typography>
          </FlexBox>
          <FlexBox>
            <Typography>recentMessage pong : {JSON.stringify(pongMsg555?.message)}</Typography>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Test;
