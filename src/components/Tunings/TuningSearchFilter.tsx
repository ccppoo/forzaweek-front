import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { PI_Short } from '@/components/PI';
import { FlexBox } from '@/components/styled';
import useCarAndTagFilter from '@/store/carAndTagFilter';
import useTuningSearchFilters from '@/store/tuningSearchFilters';
import type {
  DrivingSystemOption,
  PIClassOption,
  SuspensionOption,
  TireOption,
} from '@/store/tuningSearchFilters/types';
import type { PIClass } from '@/types';
import { sortPIClass } from '@/utils';

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

  const TUNING_CLASSES: PIClass[] = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.PI;
  const toggleOption_ = (val: PIClass) => toggleOption(val, 'PI');
  return (
    <FlexBox sx={{ width: '100%', paddingLeft: 1 }}>
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
                      checked={options[val as PIClass]}
                      onChange={() => {
                        toggleOption_(val as PIClass);
                      }}
                      sx={{
                        color: PI_COLOR[val as PIClass],
                        '&.Mui-checked': {
                          color: PI_COLOR[val as PIClass],
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

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.suspension;
  const toggleOption_ = (val: SuspensionType) => toggleOption(val, 'suspension');
  return (
    <FlexBox sx={{ width: '100%', paddingLeft: 1 }}>
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

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.drivingSystem;
  const toggleOption_ = (val: DrivingSystemType) => toggleOption(val, 'drivingSystem');
  return (
    <FlexBox sx={{ width: '100%', paddingLeft: 1 }}>
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

function TuningOptionTire() {
  type TireType = 'normal' | 'snow' | 'rally' | 'offroad' | 'slick' | 'race' | 'drag';

  const tireTypes: TireType[] = ['normal', 'snow', 'rally', 'offroad', 'slick', 'race', 'drag'];

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
  const options = tuningOption.tire;
  const toggleOption_ = (val: TireType) => toggleOption(val, 'tire');
  return (
    <FlexBox sx={{ width: '100%', paddingLeft: 1 }}>
      <FlexBox sx={{ alignItems: 'center' }}>
        <FlexBox sx={{ width: 160 }}>
          <Button
            sx={{ color: 'black', minWidth: 0 }}
            onClick={() => toggleAllSingleOption('tire')}
          >
            <Typography variant="body1">Tire</Typography>
          </Button>
        </FlexBox>
        <FlexBox>
          <FormGroup sx={{ flexDirection: 'row' }}>
            {tireTypes.map((val: string) => {
              return (
                <FormControlLabel
                  key={`formcontrol-tuning-tire-check-${val}`}
                  control={
                    <Checkbox
                      checked={options[val as TireType]}
                      onChange={() => {
                        toggleOption_(val as TireType);
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

type TuningOptionSummaryProps = { value: string };

function TuningOptionSummaryDisplay({
  name,
  option,
  sort,
  Component,
}: {
  name: string;
  option: PIClassOption | SuspensionOption | TireOption | DrivingSystemOption;
  sort?: (val1: [string, boolean], val2: [string, boolean]) => number;
  Component: FC<TuningOptionSummaryProps>;
}) {
  const tuningKeyName = (option: string, value: string) => `tuning-filter-${option}-${value}`;
  const defaultSort = (opt1: [string, boolean], opt2: [string, boolean]) =>
    opt1[0] > opt2[0] ? 1 : -1;
  const sortMethod = sort || defaultSort;
  return (
    <FlexBox sx={{ flexDirection: 'column', alignItems: 'center' }}>
      <FlexBox sx={{ justifyContent: 'start', width: '100%' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 200 }}>
          {name}
        </Typography>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1 }}>
        {Object.entries(option)
          .filter(([_, selected]) => selected)
          .toSorted(sortMethod)
          .map(([opt]) => {
            return <Component key={tuningKeyName(name.replace(' ', '-'), opt)} value={opt} />;
          })}
      </FlexBox>
    </FlexBox>
  );
}

function TuningOptionSummarySmall(props: TuningOptionSummaryProps) {
  // TODO: string -> icon
  return (
    <FlexBox sx={{ border: '1px black solid', borderRadius: 1, paddingX: 0.2 }}>
      <Typography>{props.value}</Typography>
    </FlexBox>
  );
}

function TuningOptionPIClassSummarySmall(props: TuningOptionSummaryProps) {
  return <PI_Short PIClass={props.value as PIClass} height={28} />;
}

export default function TuningOptionFilter() {
  // 차 선택하고 나서 필터링하는 옵션
  const searchScope = 'tunings';
  const {
    filter: { carID, tagIDs },
  } = useCarAndTagFilter(searchScope);
  const [tuningOption, _] = useTuningSearchFilters();

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded((isExpanded) => !isExpanded);
  };

  // TODO: 서스펜션, 타이어, 구동방식 그림 아이콘
  const isSearchOptionApplied = !!carID;
  const noSearchOptionTooltipMSG = 'you could filter tunings after applying search options';

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', paddingY: 3 }}>
      <FlexBox>
        <Typography variant="h6">Tuning Options</Typography>
      </FlexBox>
      <Paper sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
        <Tooltip title={isSearchOptionApplied ? null : noSearchOptionTooltipMSG} placement="top">
          <Accordion disabled={!carID} expanded={!!carID && expanded} onChange={handleChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <TuningOptionSummaryDisplay
                name="PI Class"
                option={tuningOption.PI}
                sort={([piclass1, _], [piclass2, __]) => sortPIClass(piclass1, piclass2)}
                Component={TuningOptionPIClassSummarySmall}
              />
              <Divider orientation="vertical" flexItem />
              <TuningOptionSummaryDisplay
                name="Suspension"
                option={tuningOption.suspension}
                Component={TuningOptionSummarySmall}
              />
              <Divider orientation="vertical" flexItem />
              <TuningOptionSummaryDisplay
                name="Tire"
                option={tuningOption.tire}
                Component={TuningOptionSummarySmall}
              />
              <Divider orientation="vertical" flexItem />
              <TuningOptionSummaryDisplay
                name="Driving System"
                option={tuningOption.drivingSystem}
                Component={TuningOptionSummarySmall}
              />
            </AccordionSummary>
            <AccordionDetails>
              <TuningOptionPIClass />
              {/* 클래스 */}
              {/* 서스펜션 */}
              <TuningOptionSuspension />
              {/* 타이어 */}
              <TuningOptionTire />
              {/* 구동 방식 */}
              <TuningOptionDrivingSystem />
            </AccordionDetails>
          </Accordion>
        </Tooltip>
      </Paper>
    </FlexBox>
  );
}
