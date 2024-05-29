import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormControl from '@mui/material/FormControl';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';
import type { CarImages, CarInfo, FH5_info } from '@/types/car';

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

export default function FinalSelect({ searchScope }: { searchScope: string }) {
  const [_, carSearchResults] = useCarSearchFilters(searchScope);
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
            inputProps={{ 'aria-label': 'Without label' }}
            value={availableCarLists}
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
