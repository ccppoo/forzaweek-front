import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import type { CarFH5Image } from '@/db/model/fh5';
// import { getCar2, getCarImage } from '@/db/index';
import { getCarFH5, getCarFH5Image, searchCarByName } from '@/db/query/fh5/car';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import useCarAndTagFilter from '@/store/carAndTagFilter';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';
import type { CarInfo2 } from '@/types/car';

interface FinalSelectInterface {
  scope: string;
  setFilter?: (car: CarInfo2) => void;
}

function RenderCarImage({ carID }: { carID: string }) {
  const carImage = useLiveQuery(async () => getCarFH5Image(carID), [carID]);

  const carImageUrl = carImage?.imageURLs[0];

  if (carImageUrl) {
    return (
      <Image
        src={carImageUrl}
        sx={{
          width: '100%',
          height: 240,
          objectFit: 'contain',
        }}
      />
    );
  }
  return;
}

export default function FinalSelect(props: FinalSelectInterface) {
  const { scope, setFilter } = props;
  // NOTE: useCarAndTagFilter는 차, 튜닝, 데칼 검색할 때 어떤 차를 볼 지 선택하는 것
  const {
    actions: {
      car: { setCar, removeCar },
    },
  } = useCarAndTagFilter(scope);
  const [_, carSearchResults, __, { clearAllOptions }] = useCarSearchFilters(scope);
  const [carID, setCarID] = useState<string>(
    carSearchResults.length > 0 ? carSearchResults[0].name_en : '',
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
    if (carID == '') return;
    // const car = await getCar2(carID);
    setCar(carID);
  };

  const selectCarMenuItem = (event: SelectChangeEvent) => {
    setCarID(event.target.value);
  };

  const manufactureIDList = Array.from(
    new Set(carSearchResults.map(({ manufacturer }) => manufacturer.id)),
  );

  const renderSelectGroup = (manufacturererID: string) => {
    const items = carSearchResults
      .filter(({ manufacturer: man }) => man.id == manufacturererID)
      .map((c: CarInfo2) => {
        return (
          <MenuItem key={`car-final-select-${c.name_en}`} value={c.id}>
            {c.name_en}
          </MenuItem>
        );
      });
    // FIXME: 제조사 ID에 따라 이름 가져오기
    // return [<ListSubheader>{manufacturer name}</ListSubheader>, items];
    return items;
  };

  const selectValueCar = useLiveQuery(async () => getCarFH5(carID), [carID]);

  const renderSelectedValue = (carID: string | undefined) => {
    return (
      <FlexBox sx={{ flexDirection: 'row', columnGap: 1 }}>
        <Typography>{selectValueCar?.baseCar.name.en[0]}</Typography>
      </FlexBox>
    );
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
            onChange={selectCarMenuItem}
            input={<OutlinedInput id="select-multiple-chip" />}
            value={carID}
            renderValue={renderSelectedValue}
            MenuProps={MenuProps}
          >
            {manufactureIDList.map((manufacturerID) => renderSelectGroup(manufacturerID))}
          </Select>
        </FormControl>
      </FlexBox>
      {carID && <RenderCarImage carID={carID} />}
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
