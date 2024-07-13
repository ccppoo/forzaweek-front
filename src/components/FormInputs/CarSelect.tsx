import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';

import type { CarDependentCreation } from '@/FormData/post/sharingCreation';
import CarSearchAndSelectDialog from '@/components/Search/CarSearchAndSelectDialog';
import { FlexBox, Image } from '@/components/styled';
import type { CarInfoEssential } from '@/types/car';

type SelectCarFormInput = {
  selectScope: string;
};

export default function SelectCar<T extends CarDependentCreation>(props: SelectCarFormInput) {
  const { selectScope } = props;

  const { setValue } = useFormContext<T>();

  type FormDataType = PathValue<T, FieldPath<T>>;
  const formPath = 'car' as FieldPath<T>;
  const [carSelected, setCarSelected] = useState<CarInfoEssential | undefined>(undefined);

  const setCarForDecalWrite = (car: CarInfoEssential) => {
    setCarSelected(car);
    setValue(formPath, car.id as FormDataType);
  };

  const [carSelectDialogOpened, setCarSelectDialogOpened] = useState<boolean>(false);

  const closeCarSelectDialog = () => setCarSelectDialogOpened(false);
  const openCarSelectDialog = () => setCarSelectDialogOpened(true);

  return (
    <>
      <FlexBox
        sx={{
          alignItems: 'center',
          height: '100%',
          columnGap: 2,
        }}
      >
        <Paper
          sx={{
            width: '100%',
            height: '100%',
            paddingLeft: 2,
            paddingY: 1,
            display: 'flex',
          }}
        >
          <FlexBox sx={{ height: '100%', aspectRatio: '16/9' }}>
            {carSelected?.image.first ? (
              <Image src={carSelected.image.first} />
            ) : (
              <FlexBox></FlexBox>
            )}
          </FlexBox>
          <FlexBox
            sx={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingX: 1,
            }}
          >
            {/* 선택한 차 제조사, 이름 */}
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingLeft: 1 }}>
              <FlexBox sx={{ columnGap: 2 }}>
                <FlexBox sx={{ height: 20, alignItems: 'center' }}>
                  <Image src={carSelected?.manufacturer.imageURL} />
                </FlexBox>
                <Typography>{carSelected?.manufacturer.name_en}</Typography>
              </FlexBox>
              <Typography variant="h5">{carSelected && carSelected.name_en}</Typography>
            </FlexBox>

            <FlexBox
              sx={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                alignItems: 'end',
              }}
            >
              <Button variant="outlined" onClick={openCarSelectDialog}>
                select car
              </Button>
            </FlexBox>
          </FlexBox>
        </Paper>
      </FlexBox>
      <CarSearchAndSelectDialog
        onClose={closeCarSelectDialog}
        opened={carSelectDialogOpened}
        setCar={setCarForDecalWrite}
        selectScope={selectScope}
      />
    </>
  );
}
