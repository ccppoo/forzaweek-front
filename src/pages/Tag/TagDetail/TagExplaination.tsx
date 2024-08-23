import { useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { SxProps, Theme } from '@mui/material/styles';

import { useQuery } from '@tanstack/react-query';

import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import useAuthState from '@/store/auth';

type Lang = 'English' | '한국어' | '日本語'; //  '简体字', '正體字'
type LangItem = {
  label: Lang;
  code: string;
};

const langs: LangItem[] = [
  {
    label: 'English',
    code: 'en',
  },
  {
    label: '한국어',
    code: 'ko',
  },
  {
    label: '日本語',
    code: 'jp',
  },
];
interface TagExplainationIntf {
  langCode: string;
  tagID: string;
}

const temp = async () => {
  return { data: {} };
};
function TagExplaination({ langCode, tagID }: TagExplainationIntf) {
  // 설명란 API로 불러오기

  const { data } = useQuery({ queryKey: ['tag', 'explanation', tagID, langCode], queryFn: temp });

  return <FlexBox sx={{ paddingX: 2, paddingY: 3 }}>{langCode}</FlexBox>;
}

interface TagExplainationsIntf {
  tagID: string;
}

export default function TagExplainations(props: TagExplainationsIntf) {
  const { tagID } = props;
  const [langSelect, setLangSelect] = useState<string>('en');

  const handleChange = (event: React.SyntheticEvent, lang: string) => {
    setLangSelect(lang);
  };

  return (
    <FlexBox sx={{ width: '100%', typography: 'body1', flexDirection: 'column' }}>
      <Tabs value={langSelect} onChange={handleChange} sx={{ backgroundColor: 'wheat' }}>
        {langs.map((val, idx) => (
          <Tab label={val.label} value={val.code} key={`tag-explanation-lang-${val.code}`} />
        ))}
      </Tabs>
      <TagExplaination langCode={langSelect} tagID={tagID} />
    </FlexBox>
  );
}
