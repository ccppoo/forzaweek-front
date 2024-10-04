import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';
import type { FieldValues, Path, UseFormSetValue } from 'react-hook-form';

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

  // console.log(`carSelected?.imageURLs[0] : ${carSelected?.imageURLs[0]}`);

  const carSelectedImage = carSelected?.imageURLs[0];

  return (
    <FlexBox
      sx={{
        height: '100%',
        maxHeight: 150,
        aspectRatio: '16/9',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image src={carSelectedImage} sx={{ objectFit: 'contain', maxWidth: '100%' }} />
    </FlexBox>
  );
}

export default function SelectCar<T extends CarDependentCreation>(props: SelectCarFormInput) {
  const { selectScope } = props;

  const { setValue, getValues, watch } = useFormContext<T>();

  type FormDataType = PathValue<T, FieldPath<T>>;
  const formPath = 'car' as FieldPath<T>;
  const selectedCarID = watch(formPath);

  // console.log(`selectedCarID : ${selectedCarID}`);

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        columnGap: 2,
        flexDirection: 'column',
      }}
    >
      <AutocompleteCarSearchBarSelect
        carID={selectedCarID}
        setCarID={(carID: string | undefined) => setValue(formPath, carID as FormDataType)}
      />
      {!!selectedCarID && <SelectedCarPreview carID={selectedCarID} />}
    </FlexBox>
  );
}

export function FieldArraySelectCar<T extends FieldValues>({
  setValue,
  formPath,
}: {
  setValue: UseFormSetValue<T>;
  formPath: FieldPath<T>;
}) {
  // const { selectScope } = props;

  // const { setValue, getValues, watch } = useFormContext<T>();

  type FormDataType = PathValue<T, FieldPath<T>>;
  // const formPath = 'car' as FieldPath<T>;
  // const selectedCarID = watch(formPath);

  // console.log(`selectedCarID : ${selectedCarID}`);
  // const {onChange} = register(formPath)
  const [carID, _setCarID] = useState<string | undefined>();

  const setCarID = (carID: string | undefined) => {
    _setCarID(carID);
    console.log(`carID : ${carID}`);
    setValue(formPath, carID as PathValue<T, Path<T>>);
  };
  return (
    <FlexBox
      sx={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        columnGap: 2,
        flexDirection: 'column',
      }}
    >
      <AutocompleteCarSearchBarSelect
        carID={carID}
        setCarID={(carID: string | undefined) => {
          setCarID(carID);
        }}
      />
      {!!carID && <SelectedCarPreview carID={carID} />}
    </FlexBox>
  );
}
