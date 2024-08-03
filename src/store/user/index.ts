import { useEffect, useState } from 'react';
import { atom, useRecoilState } from 'recoil';

import { useQuery } from '@tanstack/react-query';

import { getUserProfile } from '@/api/user/profile';
import type { AuthTokenType } from '@/store/auth/types';

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

const useLocalStorageValue = <T>(key: string) => {
  const [data, setData] = useState<T | null>(() => {
    let item = localStorage.getItem(key);
    if (item === null) return null;
    return JSON.parse(item) as T;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      let item = localStorage.getItem(key);
      if (item === null) {
        setData(null);
        return;
      }
      setData(JSON.parse(item) as T);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return data;
};

function useUserProfile() {
  const authInfo = useLocalStorageValue<AuthTokenType>('user_auth');
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  // FIXME: localstorage change listen -> hook

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['get user info', 'me', !!authInfo ? authInfo.id_token : ''],
    queryFn: getUserProfile,
    staleTime: Infinity,
    enabled: !!authInfo,
  });

  console.log(`userProfile : ${JSON.stringify(userProfile)}`);

  useEffect(() => {
    if (isSuccess && data) {
      // console.log(`data : ${JSON.stringify(data)}`);
      setUserProfile(data);
    }
  }, [data]);

  return userProfile;
}

export default useUserProfile;
