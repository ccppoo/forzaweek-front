import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { ApexOptions } from 'apexcharts';
import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
import { PI_Card } from '@/components/PI';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';
import { CarData } from '@/data/types';
import { db } from '@/db';
import type { Car, CarImage, FH5_STAT } from '@/db/schema';
import { decals as decalImages } from '@/image/decal';
import useTuningSearchFilters from '@/store/tuningSearchFilters';
import useCarSearchFilters, { CarSearchOption } from '@/store/tuningSearchFilters';
import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  MANUFACTURER,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from '@/store/tuningSearchFilters/values';
import type { CarImages, CarInfo, FH5_info } from '@/types/car';

import { Image } from './styled';

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

function AutocompleteCarSearchOption({
  optionName,
  values,
  groupOptions,
  limitTags,
}: {
  optionName: CarSearchOption;
  values: string[];
  groupOptions?: boolean;
  limitTags?: number;
}) {
  const [_, { tuningCarSearchOptions, tuningCarSearchResult }, { setCarSearchOption }] =
    useTuningSearchFilters();
  const setSearchOption = (name: string[]) => setCarSearchOption(name, optionName);
  const selectedOptions = tuningCarSearchOptions[optionName];

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

  // console.log(`options : ${JSON.stringify(options)}`);

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
            setSearchOption(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={selectedOptions.length == 0 ? optionName : undefined}
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
  const [_, { tuningCarSearchResult }, { setCarSearchOption }] = useTuningSearchFilters();
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

  const manufactureList = Array.from(
    new Set(tuningCarSearchResult.map(({ manufacture }) => manufacture)),
  );

  const renderSelectGroup = (manufacturer: string) => {
    const items = tuningCarSearchResult
      .filter(({ manufacture: man }) => man == manufacturer)
      .map((c: CarInfo) => {
        return (
          <MenuItem key={`car-final-select-${c.name}`} value={c.name}>
            {c.name}
          </MenuItem>
        );
      });
    return [<ListSubheader>{manufacturer}</ListSubheader>, items];
  };

  const carSearchResults =
    tuningCarSearchResult.length > 0 ? tuningCarSearchResult[0].name : 'No cars!';

  return (
    <FlexBox sx={{ width: '40%', flexDirection: 'column' }}>
      <FlexBox>
        <FormControl sx={{ m: 1, width: '100%' }} size="small">
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            inputProps={{ 'aria-label': 'Without label' }}
            value={carSearchResults}
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
async function getCarData(): Promise<Car[]> {
  return await db.car.toArray();
}
function TuningCarSearchBar() {
  // 직접 검색해서 찾을 수 있는 검색 바
  const options = useLiveQuery(getCarData) || [];

  const [selection, setSelection] = useState<Car | undefined>(undefined);

  return (
    <FlexBox sx={{ width: '100%', paddingY: 0.4 }}>
      <Autocomplete
        id="tags-outlined"
        size="small"
        // options={carInfoWithImage.map(({ info }) => info.name)}
        options={options}
        filterOptions={(options, state) => {
          const displayOptions = options.filter((option) =>
            option.name.toLowerCase().trim().includes(state.inputValue.toLowerCase().trim()),
          );

          return displayOptions;
        }}
        groupBy={(option: Car) => option.manufacture}
        getOptionLabel={(option: Car) => option.name}
        defaultValue={null}
        filterSelectedOptions
        onChange={(event: any, newValue: Car | null) => {
          setSelection(newValue || undefined);
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

export default function TuningCarSelection() {
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
          <AutocompleteCarSearchOption optionName="country" values={COUNTRY} groupOptions />
          <AutocompleteCarSearchOption
            optionName="manufacturer"
            values={MANUFACTURER}
            groupOptions
            limitTags={3}
          />
          <AutocompleteCarSearchOption
            optionName="division"
            values={DIVISIONS}
            groupOptions
            limitTags={4}
          />
          <AutocompleteCarSearchOption
            optionName="productionYear"
            values={PRODUCTION_YEARs}
            limitTags={4}
          />
          <AutocompleteCarSearchOption optionName="rarity" values={RARITY} limitTags={4} />
          <AutocompleteCarSearchOption optionName="boost" values={BOOST} limitTags={3} />

          {/* <TuningCarSelectionCountryOption optionName="Country" values={COUNTRY} groupOptions />
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
          <TuningCarSelectionCountryOption optionName="Boost" values={BOOST} limitTags={3} /> */}
        </FlexBox>
        <TuningCarFinalSelect />
      </FlexBox>
    </FlexBox>
  );
}
