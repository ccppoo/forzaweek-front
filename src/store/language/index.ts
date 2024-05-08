import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';

enum LanguageOption {
  Korean = 'Korean',
  English = 'English',
}

export const langLocale = {
  Korean: '한국어',
  English: 'English',
};

const languageOptionState = atom<LanguageOption>({
  key: 'language-option-state',
  default: 'Korean' as LanguageOption,
});

function useLangaugeOption(): [LanguageOption, Actions] {
  const [languageOption, setLanguageOption] = useRecoilState(languageOptionState);

  const setLanguageTo = (lang: string) => setLanguageOption(lang as LanguageOption);
  const setKorean = () => setLanguageOption(LanguageOption.Korean);
  const setEnglish = () => setLanguageOption(LanguageOption.English);

  return [languageOption, { setLanguageTo, setKorean, setEnglish }];
}

export default useLangaugeOption;
