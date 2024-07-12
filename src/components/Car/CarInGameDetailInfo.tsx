import { SyntheticEvent, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import type { GAME } from '@/types';
import type { CarInfo2 } from '@/types/car';

import * as InGameDetail from './CarInGameDetail';

export default function CarInGameDetailInfo({ carInfo }: { carInfo: CarInfo2 }) {
  const [inGameDetailTab, setInGameDetailTab] = useState<GAME>('FH5');

  const changeTuningTabIndex = (event: SyntheticEvent, index: GAME) => {
    setInGameDetailTab(index);
  };

  const FH5 = 'FH5' as GAME;
  const FH4 = 'FH4' as GAME;

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        rowGap: 3,
      }}
    >
      <TabContext value={inGameDetailTab}>
        <TabList onChange={changeTuningTabIndex} orientation="vertical" sx={{ minWidth: 160 }}>
          <Tab label="Forza Horizon 5" value={FH5} />
          <Tab label="Forza Horizon 4" value={FH4} disabled={true} />
        </TabList>
        <TabPanel value={FH5} sx={{ paddingY: 0, height: '100%', width: '100%' }}>
          <InGameDetail.CarInGameDetail_FH5
            meta={carInfo.fh5_meta}
            performance={carInfo.fh5_perf}
          />
        </TabPanel>
        {/* FUTURE: Forza Horizon 4 */}
        {/* <TabPanel value={FH4} sx={{ paddingY: 0, height: '100%' }}>
          <InGameDetail.CarInGameDetail_FH4
            meta={carInfo.fh5_meta}
            performance={carInfo.fh5_perf}
          />
        </TabPanel> */}
      </TabContext>
    </FlexBox>
  );
}
