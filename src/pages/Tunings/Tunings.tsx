import { SetStateAction, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';

import { ApexOptions } from 'apexcharts';

import * as image from '@/image';
import { PI_Card } from '@/components/PI';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';
import { CarData, CarInfo } from '@/data/types';
import { decals as decalImages } from '@/image/decal';
import useTuningSearchFilters from '@/store/tuningSearchFilters';
import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  MANUFACTURER,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from '@/store/tuningSearchFilters/values';

import { Image } from './styled';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0].toUpperCase()}`,
  };
}
const carinfo = {
  manufacture: 'Hyundai',
  year: 2021,
  country: 'Korea',
  name: '#98 Bryan Herta Autosport Elantra N',
  drive_train: 'FWD',
  body_style: 'sedan',
  door: 4,
  engine: 'ICE',
  FH5: {
    PI: 800,
    division: 'track toys',
  },
};

function DecalItemRow({ decal }: { decal: DecalData }) {
  const WIDTH = '100%';
  const HEIGHT = 200;
  const share_code3 = [
    decal.share_code.substring(0, 3),
    decal.share_code.substring(3, 6),
    decal.share_code.substring(6, 9),
  ];

  return (
    <Paper sx={{ width: WIDTH, maxWidth: 1200, height: HEIGHT, display: 'flex' }}>
      <FlexBox sx={{ aspectRatio: '16/9', height: '100%' }}>
        <Image
          src={decal.frontImage}
          sx={{
            objectFit: 'contain',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
      </FlexBox>
      <FlexBox
        sx={{ flexDirection: 'column', width: '100%', paddingX: 1, paddingY: 0.5, rowGap: 1 }}
      >
        <FlexBox sx={{ height: '20%' }}>
          <Typography variant="h4">hyundai elantra deco!!</Typography>
        </FlexBox>
        <FlexBox sx={{ height: '60%', columnGap: 1, rowGap: 1, flexWrap: 'wrap' }}>
          {decal.tags.map((tag) => (
            <Chip label={tag} key={`decal-tag-${decal.share_code}-${tag}`} />
          ))}
        </FlexBox>
        <FlexBox sx={{ height: '20%', width: '100%', justifyContent: 'space-between' }}>
          <FlexBox>
            <FlexBox
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 1,
                paddingX: 1,
                borderRadius: 4,
                backgroundColor: '#d1d1d1',
              }}
            >
              {share_code3.map((code_peice) => {
                return (
                  <Typography variant="h6" key={`decal-row-share-code-piece-${code_peice}`}>
                    {code_peice}
                  </Typography>
                );
              })}
            </FlexBox>
          </FlexBox>
          <FlexBox>
            <IconButton sx={{ borderRadius: 4 }}>
              <ModeCommentOutlinedIcon fontSize="small" />
              <FlexBox
                sx={{
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 0.5,
                }}
              >
                <Typography>{decal.fav.count}</Typography>
              </FlexBox>
            </IconButton>
            <IconButton sx={{ borderRadius: 4 }}>
              {decal.fav.checked ? (
                <FavoriteOutlinedIcon fontSize="small" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
              <FlexBox
                sx={{
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 0.5,
                }}
              >
                <Typography>{decal.fav.count}</Typography>
              </FlexBox>
            </IconButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Paper>
  );
}

function TuningItemCell({ tuning }: { tuning: Tuning }) {
  const carName = '#98 Bryan Herta Autosport Elantra N';
  const manufacturer = 'Hyundai';
  const year = 2021;
  const WIDTH = '33%';
  const HEIGHT = 400;
  const series = [
    {
      name: 'performance',
      data: [
        tuning.performance.acceleration,
        tuning.performance.speed,
        tuning.performance.braking,
        tuning.performance.offroad,
        tuning.performance.launch,
        tuning.performance.handling,
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
      redrawOnParentResize: true,
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      min: 0,
      max: 10,
      stepSize: 2,
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false,
        formatter: (value) => {
          return '';
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ['acceleration', 'speed', 'braking', 'offroad', 'launch', 'handling'],
      labels: {
        style: {
          colors: '#050505',
          fontWeight: 500,
        },
        // show: false,
      },
    },

    fill: {
      opacity: 0.5,
    },
  };

  const creator = tuning.creater.club
    ? `[${tuning.creater.club}] ${tuning.creater.id}`
    : tuning.creater.id;

  const share_code3 = [
    tuning.share_code.substring(0, 3),
    tuning.share_code.substring(3, 6),
    tuning.share_code.substring(6, 9),
  ];

  return (
    <Grid xs={4}>
      <Paper
        sx={{
          // width: '100%',
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          paddingX: 0.5,
        }}
      >
        <FlexBox
          sx={{ paddingTop: 0.5, alignItems: 'center', justifyContent: 'end', columnGap: 0.5 }}
        >
          <PI_Card height={30} pi_number={tuning.PI} />
        </FlexBox>
        {/* 만든사람 */}
        <FlexBox>
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Avatar {...stringAvatar(tuning.creater.id)} sx={{ width: 25, height: 25 }} />
            <Typography variant="h6">{creator}</Typography>
          </FlexBox>
        </FlexBox>

        {/* 본문 */}
        <FlexBox
          sx={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            paddingX: 1,
            paddingY: 0.5,
            rowGap: 2,
            justifyContent: 'space-between',
          }}
        >
          {/* 태그 */}
          <FlexBox sx={{ flexDirection: 'column' }}>
            <FlexBox
              sx={{
                height: '100%',
                flexWrap: 'wrap',
                columnGap: 0.2,
                rowGap: 0.5,
                justifyContent: 'start',
                alignItems: 'flex-start',
              }}
            >
              {tuning.tags.map((tag) => (
                <Chip label={tag} key={`decal-tag-${tuning.share_code}-${tag}`} />
              ))}
            </FlexBox>
          </FlexBox>
          {/* 서스펜션, 타이어, 동작 방식 */}
          <FlexBox>
            <FlexBox sx={{ flexDirection: 'column', width: '33%', border: '1px black solid' }}>
              <FlexBox
                sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography>Suspension</Typography>
                <Typography>{tuning.suspension}</Typography>
              </FlexBox>
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', width: '33%', border: '1px black solid' }}>
              <FlexBox
                sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography>Tier</Typography>
                <Typography>{tuning.tier}</Typography>
              </FlexBox>
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', width: '33%', border: '1px black solid' }}>
              <FlexBox
                sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography>Drive System</Typography>
                <Typography>{tuning.driving_system}</Typography>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          {/* 공유코드 + 댓글 + 좋아요 */}
          <FlexBox sx={{ height: '20%', width: '100%', justifyContent: 'space-between' }}>
            <FlexBox
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FlexBox
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                  paddingX: 1,
                  borderRadius: 4,
                  backgroundColor: '#d1d1d1',
                }}
              >
                {share_code3.map((code_peice) => {
                  return (
                    <Typography variant="h6" key={`decal-row-share-code-piece-${code_peice}`}>
                      {code_peice}
                    </Typography>
                  );
                })}
              </FlexBox>
            </FlexBox>
            <FlexBox>
              <IconButton sx={{ borderRadius: 4 }}>
                <ModeCommentOutlinedIcon fontSize="small" />
                <FlexBox
                  sx={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 0.5,
                  }}
                >
                  <Typography>{tuning.fav.count}</Typography>
                </FlexBox>
              </IconButton>
              <IconButton sx={{ borderRadius: 4 }}>
                {tuning.fav.checked ? (
                  <FavoriteOutlinedIcon fontSize="small" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                )}
                <FlexBox
                  sx={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 0.5,
                  }}
                >
                  <Typography>{tuning.fav.count}</Typography>
                </FlexBox>
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Paper>
    </Grid>
  );
}

function TuningCellListing() {
  return (
    <Grid container sx={{ width: '100%' }} spacing={2}>
      {[...tunings.slice(0, 9)].map((tuning) => (
        <TuningItemCell tuning={tuning} key={`tuning-cell-${tuning.share_code}`} />
      ))}
    </Grid>
  );
}

function DecalRowListing() {
  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      {decalsWithImage.map((decal) => (
        <DecalItemRow decal={decal} />
      ))}
    </FlexBox>
  );
}

function TuningCarSelectionCountryOption2({
  optionName,
  values,
}: {
  optionName: string;
  values: string[];
}) {
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FlexBox sx={{ width: '100%', paddingX: 1 }}>
      <FlexBox sx={{ width: 180, alignItems: 'center' }}>
        <Typography variant="subtitle1">{optionName}</Typography>
      </FlexBox>
      <FormControl sx={{ m: 1, width: '100%' }} size="small">
        {/* <InputLabel id="demo-multiple-chip-label">{optionName}</InputLabel> */}
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          inputProps={{ 'aria-label': 'Without label' }}
          multiple
          // displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {values.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FlexBox sx={{ aspectRatio: '1/1', alignItems: 'center', justifyContent: 'center' }}>
        <IconButton size="small" sx={{ borderRadius: 2, width: 45, height: 45 }}>
          <RefreshOutlinedIcon />
        </IconButton>
      </FlexBox>
    </FlexBox>
  );
}

function TuningCarSelectionCountryOption({
  optionName,
  values,
  groupOptions,
  limitTags,
}: {
  optionName: string;
  values: string[];
  groupOptions?: boolean;
  limitTags?: number;
}) {
  const [selections, setSelections] = useState<string[]>([]);

  const handleChange = (event: any, newInputValue: string) => {
    console.log(JSON.stringify(newInputValue));
    // setSelections(newInputValue);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FlexBox sx={{ width: '100%', paddingX: 1, paddingY: 0.3 }}>
      <FlexBox sx={{ width: 180, alignItems: 'center' }}>
        <Typography variant="subtitle1">{optionName}</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%' }}>
        <Autocomplete
          multiple
          limitTags={limitTags ? limitTags : undefined}
          id="tags-outlined"
          size="small"
          options={values}
          groupBy={groupOptions ? (option) => option[0] : undefined}
          getOptionLabel={(option) => option}
          defaultValue={[]}
          filterSelectedOptions
          onChange={(event: any, newValue: string[]) => {
            setSelections(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={selections.length == 0 ? optionName : undefined}
              sx={{ 'aria-label': 'Without label' }}
            />
          )}
          sx={{ width: '100%' }}
        />
      </FlexBox>
    </FlexBox>
  );
}

function TuningCarFinalSelect() {
  const [carName, setCarName] = useState<string>(carinfo.name);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCarName(event.target.value);
  };

  const manufactureList = Array.from(new Set(carInfoWithImage.map(({ info }) => info.manufacture)));

  const renderSelectGroup = (manufacturer: string) => {
    const items = carInfoWithImage
      .filter(({ info }) => info.manufacture == manufacturer)
      .map((c: CarData) => {
        return (
          <MenuItem key={`car-final-select-${c.info.name}`} value={c.info.name}>
            {c.info.name}
          </MenuItem>
        );
      });
    return [<ListSubheader>{manufacturer}</ListSubheader>, items];
  };

  // console.log(JSON.stringify(carName));

  return (
    <FlexBox sx={{ width: '40%', flexDirection: 'column' }}>
      <FlexBox>
        <FormControl sx={{ m: 1, width: '100%' }} size="small">
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            inputProps={{ 'aria-label': 'Without label' }}
            value={carName}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" />}
            renderValue={(selected) => (
              <FlexBox>
                <Typography>{selected}</Typography>
              </FlexBox>
            )}
            MenuProps={MenuProps}
          >
            {manufactureList.map((p: string) => renderSelectGroup(p))}
          </Select>
        </FormControl>
      </FlexBox>

      <Image
        src={image.car.hyundaiElantra}
        sx={{
          width: '100%',
          objectFit: 'contain',
        }}
      />
    </FlexBox>
  );
}

function TuningCarSearchBar() {
  // 직접 검색해서 찾을 수 있는 검색 바
  const [selection, setSelection] = useState<CarData | null>(null);

  return (
    <FlexBox sx={{ width: '100%', paddingY: 0.4 }}>
      <Autocomplete
        id="tags-outlined"
        size="small"
        // options={carInfoWithImage.map(({ info }) => info.name)}
        options={carInfoWithImage}
        filterOptions={(options, state) => {
          const displayOptions = options.filter((option) =>
            option.info.name.toLowerCase().trim().includes(state.inputValue.toLowerCase().trim()),
          );

          return displayOptions;
        }}
        groupBy={(option: CarData) => option.info.manufacture}
        getOptionLabel={(option: CarData) => option.info.name}
        defaultValue={null}
        filterSelectedOptions
        onChange={(event: any, newValue: CarData | null) => {
          setSelection(newValue || null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={'search for car'}
            sx={{ 'aria-label': 'Without label' }}
          />
        )}
        sx={{ width: '100%' }}
      />
    </FlexBox>
  );
}

function TuningCarRecentSearch() {
  return (
    <Paper
      sx={{ display: 'flex', flexDirection: 'column', width: 160, height: '100%', paddingX: 0.5 }}
    >
      <FlexBox sx={{ width: '100%' }}>
        <Image
          src={image.car.hyundaiElantra}
          sx={{
            width: '100%',
            objectFit: 'contain',
          }}
        />
      </FlexBox>
      <FlexBox>
        <Typography variant="body1">{carinfo.name}</Typography>
      </FlexBox>
    </Paper>
  );
}

function TuningCarSelection() {
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
      <FlexBox>
        <Typography variant="h4">Choose car</Typography>
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', paddingY: 1 }}>
        <FlexBox>
          <Typography variant="h5">Recent</Typography>
        </FlexBox>
        <FlexBox sx={{ width: '100%', columnGap: 0.5 }}>
          <TuningCarRecentSearch />
          <TuningCarRecentSearch />
          <TuningCarRecentSearch />
          <TuningCarRecentSearch />
        </FlexBox>
      </FlexBox>
      {/* 검색 창 */}
      <FlexBox sx={{}}>
        <TuningCarSearchBar />
      </FlexBox>
      {/* 차 선택 */}
      <FlexBox sx={{ border: '1px black solid' }}>
        <FlexBox
          sx={{ width: '60%', flexDirection: 'column', border: '1px black solid', paddingTop: 1 }}
        >
          <TuningCarSelectionCountryOption optionName="Country" values={COUNTRY} groupOptions />
          <TuningCarSelectionCountryOption
            optionName="Manufacturer"
            values={MANUFACTURER}
            groupOptions
            limitTags={3}
          />
          <TuningCarSelectionCountryOption
            optionName="Division"
            values={DIVISIONS}
            groupOptions
            limitTags={4}
          />
          <TuningCarSelectionCountryOption
            optionName="Production Year"
            values={PRODUCTION_YEARs}
            limitTags={4}
          />
          <TuningCarSelectionCountryOption optionName="Rarity" values={RARITY} limitTags={4} />
          <TuningCarSelectionCountryOption optionName="Boost" values={BOOST} limitTags={3} />
        </FlexBox>
        <TuningCarFinalSelect />
      </FlexBox>
    </FlexBox>
  );
}

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

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
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

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
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

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
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

  const [tuningOption, { toggleOption, toggleAllSingleOption }] = useTuningSearchFilters();
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

function TuningOptionFilter() {
  // 차 선택하고 나서 필터링하는 옵션

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', paddingY: 3 }}>
      <FlexBox>
        <Typography variant="h5">Choose Tuning Options</Typography>
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

export default function Tunings() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = 200;
  const name = carinfo.name;
  const manufacturer = carinfo.manufacture;
  const year = carinfo.year;
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';

  return (
    <Container sx={{ height: '140vh', paddingTop: 90 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        <TuningCarSelection />
        <TuningOptionFilter />
        <TuningCellListing />
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
