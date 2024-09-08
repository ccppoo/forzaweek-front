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
import { getCarFH5, getCarFH5FullType, getCarFH5Image, searchCarByName } from '@/db/query/fh5/car';
import { getManufacturerById } from '@/db/query/real/manufacturer';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import useCarAndTagFilter from '@/store/carAndTagFilter';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';
import type { CarInfo2 } from '@/types/car';

interface FinalSelectInterface {
  scope: string;
  // setFilter?: (car: CarInfo2) => void;
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

function SelectGroupManufacturer({ manufacturererID }: { manufacturererID: string }) {
  const manufacturer = useLiveQuery(
    async () => getManufacturerById(manufacturererID),
    [manufacturererID],
  );

  if (manufacturer) {
    return (
      <MenuItem key={`car-final-select-${manufacturer.name.en}`} value={manufacturererID}>
        {manufacturer.name.en}
      </MenuItem>
    );
  }
}

function SelectedCar({ carID }: { carID: string | undefined }) {
  if (!carID) return;
  const carFH5 = useLiveQuery(async () => getCarFH5FullType(carID), [carID]);

  if (carFH5) {
    return (
      <FlexBox sx={{ flexDirection: 'row', columnGap: 1 }}>
        <Typography>{carFH5?.baseCar.name.en[0]}</Typography>
      </FlexBox>
    );
  }
}

export default function FinalSelect(props: FinalSelectInterface) {
  const { scope } = props;
  // NOTE: useCarAndTagFilter는 차, 튜닝, 데칼 검색할 때 어떤 차를 볼 지 선택하는 것
  const {
    actions: {
      car: { setCar, removeCar },
    },
  } = useCarAndTagFilter(scope);
  const [_, carSearchResults, __, { clearAllOptions }] = useCarSearchFilters(scope);
  const [carID, setCarID] = useState<string>(
    carSearchResults.length > 0 ? carSearchResults[0].baseCar.name.en[0] : '',
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
    setCar(carID);
  };

  const selectCarMenuItem = (event: SelectChangeEvent) => {
    setCarID(event.target.value);
  };

  const manufactureIDList = Array.from(
    new Set(
      carSearchResults.map(({ baseCar: { manufacturer } }) => manufacturer.id).filter((x) => !!x),
    ),
  );

  function renderSelectGroup(manufacturererID: string) {
    const manufacturer = useLiveQuery(
      async () => getManufacturerById(manufacturererID),
      [manufacturererID],
    );

    {
      /* <SelectGroupManufacturer manufacturererID={manufacturererID} key={`final-select-${manufacturererID}`}/> */
    }
    const items = carSearchResults
      .filter(({ baseCar: { manufacturer } }) => manufacturer.id == manufacturererID)
      .map((c: CarFH5FullType) => {
        return (
          <MenuItem key={`car-final-select-${c.baseCar.name.en}`} value={c.id}>
            {c.baseCar.name.en}
          </MenuItem>
        );
      });
    // FIXME: 제조사 ID에 따라 이름 가져오기
    if (manufacturer) {
      return [<ListSubheader>{manufacturer.name.en}</ListSubheader>, items];
    }
  }

  // const selectValueCar = useLiveQuery(async () => getCarFH5(carID), [carID]);

  function renderSelectedValue(carID: string | undefined) {
    return <SelectedCar carID={carID} />;
    // return (
    //   <FlexBox sx={{ flexDirection: 'row', columnGap: 1 }}>
    //     <Typography>{selectValueCar?.baseCar.name.en[0]}</Typography>
    //   </FlexBox>
    // );
  }

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
            {manufactureIDList &&
              manufactureIDList.map((manufacturerID) => renderSelectGroup(manufacturerID!))}
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
