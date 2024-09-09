import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Box, Button, Paper, Typography } from '@mui/material';

import { useLiveQuery } from 'dexie-react-hooks';

import type { CarDependentCreation } from '@/FormData/post/sharingCreation';
import AutocompleteCarSearchBarSelect from '@/components/Search/AutocompleteCarSearchBarSelect';
import { FlexBox, Image } from '@/components/styled';
import { getCarFH5, getCarFH5FullType } from '@/db/query/fh5/car';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';

type SelectCarFormInput = {
  selectScope: string;
};

function SelectedCarPreview({ carID }: { carID: string }) {
  const carSelected = useLiveQuery<CarFH5FullType | undefined>(
    async () => await getCarFH5FullType(carID!),
    [carID],
  );

  return (
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
        {carSelected?.imageURLs[0] ? (
          <Image src={carSelected?.imageURLs[0]} />
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
              <Image src={carSelected?.baseCar.manufacturer.imageURL} />
            </FlexBox>
            <Typography>{carSelected?.baseCar.manufacturer.name.en}</Typography>
          </FlexBox>
          <Typography variant="h5">{carSelected && carSelected.baseCar.name.en}</Typography>
        </FlexBox>
      </FlexBox>
    </Paper>
  );
}

export default function SelectCar<T extends CarDependentCreation>(props: SelectCarFormInput) {
  const { selectScope } = props;

  const { setValue, getValues, watch } = useFormContext<T>();

  type FormDataType = PathValue<T, FieldPath<T>>;
  const formPath = 'car' as FieldPath<T>;

  const selectedCarID = watch(formPath);

  console.log(`selectedCarID : ${selectedCarID}`);

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        height: '100%',
        columnGap: 2,
        flexDirection: 'column',
      }}
    >
      <AutocompleteCarSearchBarSelect
        carID={selectedCarID}
        setCarID={(carID: string | undefined) => setValue(formPath, carID as FormDataType)}
      />
      {!!selectedCarID ? <SelectedCarPreview carID={selectedCarID} /> : <Paper></Paper>}
    </FlexBox>
  );
}
