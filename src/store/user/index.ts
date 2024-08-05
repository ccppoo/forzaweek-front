import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { atom, useRecoilState } from 'recoil';

import { useQuery } from '@tanstack/react-query';

import { getProfile, getUserProfile } from '@/api/user/profile';

// 사용자 닉네임,
type UserProfile = {
  gamerTag: string;
  profileImage: string;
  userID: string;
};

const UserProfileState = atom<UserProfile | undefined>({
  key: 'user-profile-token-state',
  default: undefined,
});

function useUserProfile() {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);

  const [cookies, setCookie, removeCookie] = useCookies([
    'id_token',
    'expires_in',
    'issued',
    'access_token',
    'refresh_token',
  ]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['get user info', 'me', cookies.id_token],
    queryFn: getUserProfile,
    staleTime: cookies.expires_in * 1000,
    enabled: cookies && !!cookies.id_token,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUserProfile(data);
    }
  }, [isSuccess, data, setUserProfile]);

  useEffect(() => {
    if (!cookies) {
      setUserProfile(undefined);
    }
  }, [cookies, cookies.id_token]);

  return userProfile;
}

export default useUserProfile;
