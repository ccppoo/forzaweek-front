import { SyntheticEvent, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Paper } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';

import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';
import { TuningOptions } from '@/types/car';

import AeroOption from './Aero';
import AlignmentOption from './Alignment';
import AntirollBarsOption from './AntirollBars';
import BrakeOption from './Brake';
import DampingOption from './Damping';
import DiffrentialOption from './Diffrential';
import GearingOption from './Gearing';
import SpringsOption from './Springs';
import TiresOption from './Tier';

export default function DetailedTuningTabs({}: {}) {
  const [tuningTab, setTuningTab] = useState<TuningOption>('Tires');

  const changeTuningTabIndex = (event: SyntheticEvent, index: TuningOption) => {
    setTuningTab(index);
  };
  // TODO: 튜닝에 해당 없을 경우(~단 기어 추가 옵션) disable하기
  // disable된 튜닝 Tab 페이지는 서버로 보낼 때, 지우고 보내기

  const [createDetailedOption, setCreateDetailedOption] = useState<boolean>(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setCreateDetailedOption(event.target.checked);
  };

  // FIXME: 여기서 튜닝 데이터 입력여부 관리하기

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
      <FormControlLabel
        // @ts-ignore
        control={<Switch checked={createDetailedOption} onClick={handleChange} color="info" />}
        label="Add Detailed Tuning settings"
        sx={{ '& .MuiFormControlLabel-label': { fontWeight: 200 } }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          typography: 'body1',
          opacity: !createDetailedOption ? 0.4 : 1,
          pointerEvents: !createDetailedOption ? 'none' : 'auto',
        }}
        component={Paper}
      >
        <TabContext value={tuningTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={changeTuningTabIndex} aria-label="tabs">
              {TuningOptions.map((opt, idx) => (
                <Tab label={opt} value={opt} key={`tuning-option-tab-${opt}-${idx}`} />
              ))}
            </TabList>
          </Box>
          <TiresOption />
          <GearingOption />
          <AlignmentOption />
          <AntirollBarsOption />
          <SpringsOption />
          <DampingOption />
          <AeroOption />
          <BrakeOption />
          <DiffrentialOption />
        </TabContext>
      </Box>
    </FlexBox>
  );
}
