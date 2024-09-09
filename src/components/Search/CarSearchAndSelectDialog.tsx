import { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

import { Button, Dialog, DialogActions, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';

import AutocompleteCarSearchBar2 from '@/components/Search/AutocompleteCarSearchBar2';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { getCarFH5FullType } from '@/db/query/fh5/car';
import useAsyncLiveQuery from '@/db/useAsyncLiveQuery';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';

interface CarSearchAndSelectDialogIntf {
  selectScope: string;
  opened: boolean;
  setCar: (car: string) => void;
  onClose: () => void;
}

export default function CarSearchAndSelectDialog(props: CarSearchAndSelectDialogIntf) {
  const { selectScope, opened, setCar, onClose: closeDialog } = props;

  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const dialogWidth = 'md';

  type CloseReason = 'backdropClick' | 'escapeKeyDown';
  const handleClose = (event: object, reason: CloseReason) => {
    if (reason && reason === 'backdropClick') return;
    closeDialog();
  };
  const [baseCarID, setBaseCarID] = useState<string | undefined>();

  const { data: carSelected, isLoading } = useAsyncLiveQuery<CarFH5FullType | undefined>({
    queryFn: async () => getCarFH5FullType(baseCarID!),
    queryKeys: [baseCarID],
    defaultIfMissing: undefined,
    enabled: !!baseCarID,
  });

  const submitCarSelected = () => {
    if (baseCarID) {
      setCar(baseCarID);
    }
    closeDialog();
  };

  console.log(`carSelected : ${carSelected}`);
  console.log(`baseCarID : ${baseCarID}`);
  return (
    <Dialog open={opened} maxWidth={dialogWidth} fullWidth onClose={handleClose}>
      <DialogTitle>Select Car</DialogTitle>
      <FlexBox sx={{ flexDirection: 'column', minHeight: 160, rowGap: 1 }}>
        <FlexBox sx={{ width: '100%', height: '100%' }}>
          <AutocompleteCarSearchBar2 searchScope={selectScope} onSelect={setBaseCarID} />
        </FlexBox>
        {/* 선택한 차 -> 사진 + 간단 정보 보여주고 ->  Select 하면 Form에 저장하기 */}
        <FlexBox
          sx={{ height: 100, width: '100%', paddingX: 4, alignItems: 'center', columnGap: 2 }}
        >
          {/* 사진 올 자리 */}
          <FlexBox sx={{ height: '100%', width: 200, border: '1px solid black' }}>
            <Image sx={{ backgroundColor: '#ffffff' }} src={carSelected?.imageURLs[0]} />
          </FlexBox>
          <FlexBox
            sx={{
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            }}
          >
            <FlexBox sx={{ height: '100%' }}>
              <Typography>{carSelected?.baseCar.name.en[0]}</Typography>
            </FlexBox>
            {/* 제조사  */}
            {/* {carSelected && JSON.stringify(carSelected)} */}
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={closeDialog}>
          Close
        </Button>
        <Button variant="contained" onClick={submitCarSelected}>
          Select Car
        </Button>
      </DialogActions>
    </Dialog>
  );
}
