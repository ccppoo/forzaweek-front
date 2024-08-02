import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { useQuery } from '@tanstack/react-query';

import { profile } from '@/api/user';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useAuthState from '@/store/auth';

function ProfileHeader({ gamerTag, profileImage }: { gamerTag: string; profileImage: string }) {
  const _avatarSize = 108;
  const avatarSize = { width: _avatarSize, height: _avatarSize };

  return (
    <FlexBox sx={{ columnGap: 2, width: '100%' }}>
      <Avatar alt={`${gamerTag} profile image`} src={profileImage} sx={{ ...avatarSize }} />

      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>{gamerTag}</Typography>
      </FlexBox>
    </FlexBox>
  );
}
export default function Profile() {
  const { userID } = useParams();
  const [auth, state, action] = useAuthState();

  const { data } = useQuery({
    queryKey: ['get user profile', userID!, auth?.id_token],
    queryFn: profile.getUserProfile,
    staleTime: 60 * 1000,
  });

  // me -> 내 Auth
  // auth 없을 경우 로그인 페이지로
  // user ID의 경우 다른 사람 Profile

  if (data) {
    console.log(`data : ${JSON.stringify(data)}`);
    return (
      <Container sx={{}}>
        <FlexBox sx={{ flexDirection: 'column', justifyContent: 'center', paddingY: 3, rowGap: 2 }}>
          <Typography>userID : {userID}</Typography>
        </FlexBox>
        <ProfileHeader gamerTag={data.gamerTag} profileImage={data.profileImage} />
      </Container>
    );
  }
}
