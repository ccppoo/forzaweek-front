import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { getCarInfo } from '@/db/index';
import useCarAndTagFilter from '@/store/carAndTagFilter';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';
import type { CarImages, CarInfo, FH5_info } from '@/types';

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

// setFilter? : (car : CarInfo) => void;

interface FinalSelectInterface {
  scope: string;
  setFilter?: (car: CarInfo) => void;
}

export default function FinalSelect(props: FinalSelectInterface) {
  const { scope, setFilter } = props;
  const {
    actions: {
      car: { setCar, removeCar },
    },
  } = useCarAndTagFilter(scope);
  const [_, carSearchResults, __, { clearAllOptions }] = useCarSearchFilters(scope);
  const [carName, setCarName] = useState<string>(
    carSearchResults.length > 0 ? carSearchResults[0].name : '',
  );
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

  const removeCarSelected = () => {
    removeCar();
  };

  const submitToCarTagFilter = async () => {
    if (carName == '') return;
    const car = await getCarInfo(carName);
    setCar(car);
  };

  const selectCarMenuItem = (event: SelectChangeEvent) => {
    setCarName(event.target.value);
  };

  const manufactureList = Array.from(
    new Set(carSearchResults.map(({ manufacture }) => manufacture)),
  );

  const renderSelectGroup = (manufacturer: string) => {
    const items = carSearchResults
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

  const availableCarLists = carSearchResults.length > 0 ? carSearchResults[0].name : 'No cars!';

  return (
    <FlexBox sx={{ width: '40%', flexDirection: 'column' }}>
      <FlexBox sx={{}}>
        <FormControl sx={{ p: 1, width: '100%' }} size="small">
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            inputProps={{}}
            value={carName}
            onChange={selectCarMenuItem}
            input={<OutlinedInput id="select-multiple-chip" />}
            renderValue={(selected: string) => (
              <FlexBox>
                <Typography>{selected}</Typography>
              </FlexBox>
            )}
            MenuProps={MenuProps}
          >
            {manufactureList.map((manufacture) => renderSelectGroup(manufacture))}
          </Select>
        </FormControl>
      </FlexBox>
      <Image
        src={image.car.hyundaiElantra}
        sx={{
          width: '100%',
          height: 240,
          objectFit: 'contain',
        }}
      />
      <FlexBox sx={{ justifyContent: 'end', paddingX: 0.5, paddingY: 0.5, columnGap: 0.5 }}>
        <Button variant="outlined" size="small" onClick={submitToCarTagFilter}>
          Select
        </Button>
        {/* <Button color="error" variant="outlined" size="small" onClick={removeCarSelected}>
          clear
        </Button> */}
      </FlexBox>
    </FlexBox>
  );
}
