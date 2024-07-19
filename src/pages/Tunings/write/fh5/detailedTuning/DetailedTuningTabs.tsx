import { SyntheticEvent, useContext, useState } from 'react';

import { TabContext, TabList } from '@mui/lab';
import { Box, Paper, Tab } from '@mui/material';

import { DetailedTuningActivateSwitch } from '@/components/FormInputs/Tunings';
import { FlexBox } from '@/components/styled';
import DetailedTuningChoiceContext from '@/context/DetailedTuningChoiceContext';
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
import TiresOption from './Tire';

export default function DetailedTuningTabs({}: {}) {
  const [tuningTab, setTuningTab] = useState<TuningOption>('Tires');

  const changeTuningTabIndex = (event: SyntheticEvent, index: TuningOption) => {
    setTuningTab(index);
  };

  const {
    detailedTuningChoices: { nothing: activated },
  } = useContext(DetailedTuningChoiceContext);

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
      <DetailedTuningActivateSwitch tuningName={'nothing'} />

      <Box
        sx={{
          width: '100%',
          height: '100%',
          typography: 'body1',
          opacity: activated ? 0.4 : 1,
          pointerEvents: activated ? 'none' : 'auto',
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
