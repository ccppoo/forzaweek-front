import { useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
import { getCars } from '@/api/car';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';
import { CarData, CarInfo } from '@/data/types';
import { db } from '@/db';
import type { Car, CarImage, FH5_STAT } from '@/db/schema';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  MANUFACTURER,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from './values';

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
  const [options, _, __, { setOption }] = useCarSearchFilters();
  const setSearchOption = (name: string[]) => setOption(name, optionName);
  const selectedOptions = options[optionName];

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

async function getCarData(): Promise<Car[]> {
  return await db.car.toArray();
}

function AutocompleteCarSearchBar() {
  // 직접 검색해서 찾을 수 있는 검색 바
  // TODO: Selection -> DB에서 자동차 ID로 저장 + 하나 선택했으면 Search Filter 업데이트하기

  // const [options, _, __, { setOption }] = useCarSearchFilters();
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
      {/* <FlexBox>
        <Typography variant="h4">Choose car</Typography>
      </FlexBox> */}
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
        <AutocompleteCarSearchBar />
      </FlexBox>
      {/* 차 선택 */}
      <FlexBox sx={{ border: '1px black solid', flexDirection: 'column' }}>
        <FlexBox>
          <Typography>Search by filter</Typography>
        </FlexBox>
        <FlexBox
          sx={{
            width: '100%',
            flexDirection: 'column',
            border: '1px black solid',
            paddingTop: 1,
          }}
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
        </FlexBox>
        {/* <TuningCarFinalSelect /> */}
      </FlexBox>
    </FlexBox>
  );
}
