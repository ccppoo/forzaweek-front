import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import useTuningSearchFilters from '@/store/tuningSearchFilters';

function TuningOptionPIClass() {
  const PI_COLOR = {
    D: '#03e8fc',
    C: '#ebe30e',
    B: '#f2881d',
    A: '#f03518',
    S1: '#b94fe3',
    S2: '#164ff7',
    X: '#32e60e',
  };

  const TUNING_CLASSES: PI_CLASS[] = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
  type PI_CLASS = 'D' | 'C' | 'B' | 'A' | 'S1' | 'S2' | 'X';

  const [tuningOption, _, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.PI;
  const toggleOption_ = (val: PI_CLASS) => toggleOption(val, 'PI');
  return (
    <FlexBox sx={{ width: '100%' }}>
      {/* 클래스 */}
      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ width: 160 }}>
          <Button sx={{ color: 'black' }} onClick={() => toggleAllSingleOption('PI')}>
            <Typography variant="body1">Class</Typography>
          </Button>
        </FlexBox>
        <FlexBox>
          <FormGroup sx={{ flexDirection: 'row' }}>
            {TUNING_CLASSES.map((val: string) => {
              return (
                <FormControlLabel
                  key={`formcontrol-tuning-class-check-${val}`}
                  control={
                    <Checkbox
                      checked={options[val as PI_CLASS]}
                      onChange={() => {
                        toggleOption_(val as PI_CLASS);
                      }}
                      sx={{
                        color: PI_COLOR[val as PI_CLASS],
                        '&.Mui-checked': {
                          color: PI_COLOR[val as PI_CLASS],
                        },
                      }}
                    />
                  }
                  label={val}
                />
              );
            })}
          </FormGroup>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningOptionSuspension() {
  type SuspensionType = 'drift' | 'race' | 'rally';
  const suspensionTypes: SuspensionType[] = ['drift', 'race', 'rally'];

  const [tuningOption, _, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.suspension;
  const toggleOption_ = (val: SuspensionType) => toggleOption(val, 'suspension');
  return (
    <FlexBox sx={{ width: '100%' }}>
      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ width: 160 }}>
          <Button sx={{ color: 'black' }} onClick={() => toggleAllSingleOption('suspension')}>
            <Typography variant="body1">Suspension</Typography>
          </Button>
        </FlexBox>
        <FlexBox>
          <FormGroup sx={{ flexDirection: 'row' }}>
            {suspensionTypes.map((val: string) => {
              return (
                <FormControlLabel
                  key={`formcontrol-tuning-class-check-${val}`}
                  control={
                    <Checkbox
                      checked={options[val as SuspensionType]}
                      onChange={() => {
                        toggleOption_(val as SuspensionType);
                      }}
                      // sx={{
                      //   color: PI_COLOR[val as SuspensionType],
                      //   '&.Mui-checked': {
                      //     color: PI_COLOR[val as SuspensionType],
                      //   },
                      // }}
                    />
                  }
                  label={val}
                />
              );
            })}
          </FormGroup>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningOptionDrivingSystem() {
  type DrivingSystemType = 'FWD' | 'AWD' | 'RWD';

  const drivingSystemTypes: DrivingSystemType[] = ['FWD', 'AWD', 'RWD'];

  const [tuningOption, _, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.drivingSystem;
  const toggleOption_ = (val: DrivingSystemType) => toggleOption(val, 'drivingSystem');
  return (
    <FlexBox sx={{ width: '100%' }}>
      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ width: 160 }}>
          <Button sx={{ color: 'black' }} onClick={() => toggleAllSingleOption('drivingSystem')}>
            <Typography variant="body1">Driving System</Typography>
          </Button>
        </FlexBox>
        <FlexBox>
          <FormGroup sx={{ flexDirection: 'row' }}>
            {drivingSystemTypes.map((val: string) => {
              return (
                <FormControlLabel
                  key={`formcontrol-tuning-driving-system-check-${val}`}
                  control={
                    <Checkbox
                      checked={options[val as DrivingSystemType]}
                      onChange={() => {
                        toggleOption_(val as DrivingSystemType);
                      }}
                      // sx={{
                      //   color: PI_COLOR[val as SuspensionType],
                      //   '&.Mui-checked': {
                      //     color: PI_COLOR[val as SuspensionType],
                      //   },
                      // }}
                    />
                  }
                  label={val}
                />
              );
            })}
          </FormGroup>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningOptionTier() {
  type TierType = 'normal' | 'snow' | 'rally' | 'offroad' | 'slick' | 'race' | 'drag';

  const tierTypes: TierType[] = ['normal', 'snow', 'rally', 'offroad', 'slick', 'race', 'drag'];

  const [tuningOption, _, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.tier;
  const toggleOption_ = (val: TierType) => toggleOption(val, 'tier');
  return (
    <FlexBox sx={{ width: '100%' }}>
      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ width: 160, justifyContent: 'start' }}>
          <Button sx={{ color: 'black' }} onClick={() => toggleAllSingleOption('tier')}>
            <Typography variant="body1">Tier</Typography>
          </Button>
        </FlexBox>
        <FlexBox>
          <FormGroup sx={{ flexDirection: 'row' }}>
            {tierTypes.map((val: string) => {
              return (
                <FormControlLabel
                  key={`formcontrol-tuning-tier-check-${val}`}
                  control={
                    <Checkbox
                      checked={options[val as TierType]}
                      onChange={() => {
                        toggleOption_(val as TierType);
                      }}
                      // sx={{
                      //   color: PI_COLOR[val as SuspensionType],
                      //   '&.Mui-checked': {
                      //     color: PI_COLOR[val as SuspensionType],
                      //   },
                      // }}
                    />
                  }
                  label={val}
                />
              );
            })}
          </FormGroup>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function TuningOptionFilter() {
  // 차 선택하고 나서 필터링하는 옵션

  // TODO: 튜닝 설정 태그처럼 recoil store로 바꾸기
  // TODO: 서스펜션, 타이어, 구동방식 그림 아이콘
  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', paddingY: 3 }}>
      <FlexBox>
        <Typography variant="h6">Tuning Options</Typography>
      </FlexBox>

      <FlexBox sx={{ width: '100%', flexDirection: 'column' }} component={Paper}>
        {/* 클래스 */}
        <TuningOptionPIClass />
        {/* 서스펜션 */}
        <TuningOptionSuspension />
        {/* 타이어 */}
        <TuningOptionTier />
        {/* 구동 방식 */}
        <TuningOptionDrivingSystem />
        {/* 태그 */}
        <FlexBox></FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
