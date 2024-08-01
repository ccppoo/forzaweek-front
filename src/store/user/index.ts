import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';

import { useQuery } from '@tanstack/react-query';

import { get_user_profile } from '@/api/auth/user';
import useAuthState from '@/store/auth';

// 사용자 닉네임,
type UserProfile = {
  gamerTag: string;
  profileImage: string;
};

const UserProfileState = atom<UserProfile>({
  key: 'user-profile-token-state',
  default: {
    gamerTag: '',
    profileImage: '',
  },
});

function useUserProfile() {
  const [authInfo, state] = useAuthState();
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);

  const { data, isSuccess } = useQuery({
    queryKey: ['get user info', authInfo.id_token!],
    queryFn: get_user_profile,
    staleTime: Infinity,
    enabled: !!authInfo.id_token,
  });

  if (isSuccess) {
    setUserProfile(data);
  }

  return userProfile;
}

export default useUserProfile;
