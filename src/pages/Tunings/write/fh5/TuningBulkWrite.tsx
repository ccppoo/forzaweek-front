import { useState } from 'react';
import { Form, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { Box, Button, ButtonBase, Container, IconButton, Paper, Typography } from '@mui/material';

import type { TuningEditSchema } from '@/FormData/tuning';
import { BulkUploadTuning } from '@/api/fh5/tuning/upload';
// import AddTags from '@/components/FormInputs/AddTags';
import { FieldArraySelectCar } from '@/components/FormInputs/CarSelect2';
// import CreatorUsernameInput from '@/components/FormInputs/CreatorUsername';
import { FieldArrayCreatorUsernameInput } from '@/components/FormInputs/CreatorUsername';
// import ShareCodeInput from '@/components/FormInputs/ShareCode';
import { FieldArrayShareCodeInput } from '@/components/FormInputs/ShareCode';
// import ShareNameInput from '@/components/FormInputs/ShareName';
import { FieldArrayShareNameInput } from '@/components/FormInputs/ShareName';
import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import DetailedTuningChoiceContext, {
  detailedTuningChoicesDefault,
} from '@/context/DetailedTuningChoiceContext';
import type { DetailedTuningChoices } from '@/context/DetailedTuningChoiceContext';
import type {
  TuningBulkWriteInput,
  TuningBulkWriteType,
  TuningInput,
  TuningSimpleWriteInput,
  TuningSimpleWriteType,
  TuningType,
  TuningWriteInput,
  TuningWriteType,
} from '@/schema/fh5/tuning/bulkWrite';
import type { TuningOptionName } from '@/types/car';

import { TuneSelectRaceType } from './TuneRaceType';
import DetailedTuningTabs from './detailedTuning';
import MajorParts from './majorPart';
// import TuningMajorPartsDrivingSystem from './majorPart/SimpleDrivingSystem';
import { FieldArrayTuningMajorPartsDrivingSystem } from './majorPart/SimpleDrivingSystem';
import { FieldArrayTuningMajorPartsSuspension } from './majorPart/Suspension';
import { FieldArrayTuningMajorPartsTire } from './majorPart/Tire';
import TuningPerformance from './performance';
import TuningPI from './pi';
import SimpleTuningPI, { FieldArraySimpleTuningPI } from './pi/SimpleTuningPI';
import TestReadingInput from './testReading';

interface dataTextInputIntf {
  tuningEditSchema?: TuningEditSchema;
}

const filterOptionalTuning = (
  data: TuningEditSchema,
  choices: DetailedTuningChoices,
): TuningEditSchema => {
  const { detailedTuning, ..._data } = data;
  if (choices.nothing) {
    return { ..._data, detailedTuning: undefined };
  }
  const { nothing, ..._choices } = choices;

  const map = {};
  for (const [key, value] of Object.entries(_choices)) {
    // @ts-ignore
    if (!value) map[key] = undefined;
  }

  return {
    ..._data,
    detailedTuning: {
      ...detailedTuning,
      ...map,
    },
  };
};

const testReadingDefault = {
  unit: undefined,
  value: undefined,
};

const tuningDefault: TuningInput = {
  // car: '66d6a64c2090a29cc017ff0f',
  car: undefined,
  name: undefined,
  shareCode: undefined,
  gamerTag: undefined,
  //
  pi: 800,
  performance: {
    acceleration: undefined,
    braking: undefined,
    handling: undefined,
    launch: undefined,
    offroad: undefined,
    speed: undefined,
  },
  testReadings: {
    maxspeed: testReadingDefault,
    output: testReadingDefault,
    skid_pad: testReadingDefault,
    torque: testReadingDefault,
    weight: testReadingDefault,
    zero100: testReadingDefault,
  },
  // drivingSystem: 'AWD',
  tuningMajorParts: {
    drivingSystem: 'AWD',
    suspension: 'normal',
    tire: 'normal',
  },
  detailedTuning: undefined,
};

interface TuningWriteIntf {
  control: Control<TuningBulkWriteType>;
  update: UseFieldArrayUpdate<TuningBulkWriteType>;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<TuningBulkWriteType>;
  setValue: UseFormSetValue<TuningBulkWriteType>;
  watch: UseFormWatch<TuningBulkWriteType>;
  index: number;
  value: TuningWriteInput;
}
function TuningWrite({
  update,
  index,
  value,
  control,
  setValue,
  register,
  watch,
  remove,
}: TuningWriteIntf) {
  const selectScope = 'tuning write';

  const methods = useForm<TuningWriteInput>({
    defaultValues: value,
  });

  const removeThisTuning = () => {
    remove(index);
  };

  return (
    <FlexBox sx={{ columnGap: 1 }}>
      <FormProvider {...methods}>
        <Paper
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}
        >
          <FlexBox sx={{ width: '100%' }}>
            <FlexBox sx={{ minWidth: 450, width: '40%' }}>
              <FieldArraySelectCar setValue={setValue} formPath={`tunings.${index}.car`} />
            </FlexBox>
            <FlexBox
              sx={{
                width: '60%',
                flexDirection: 'column',
                rowGap: 1,
                paddingY: 1,
              }}
            >
              <FlexBox
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  columnGap: 2,
                }}
              >
                <FlexBox sx={{ flexDirection: 'column', width: 180 }}>
                  <Typography>Tune Creator</Typography>
                  <FieldArrayCreatorUsernameInput
                    register={register}
                    formPath={`tunings.${index}.gamerTag`}
                  />
                </FlexBox>
                <FlexBox sx={{ flexDirection: 'column', width: 180 }}>
                  <Typography>Share Code</Typography>
                  {/* <ShareCodeInput /> */}
                  <FieldArrayShareCodeInput
                    register={register}
                    formPath={`tunings.${index}.shareCode`}
                  />
                </FlexBox>
                <FlexBox sx={{ flexDirection: 'column', width: 180 }}>
                  <Typography>Tune name</Typography>
                  {/* <ShareNameInput /> */}
                  <FieldArrayShareNameInput
                    register={register}
                    formPath={`tunings.${index}.name`}
                  />
                </FlexBox>
              </FlexBox>
              <FlexBox
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  columnGap: 2,
                }}
              >
                <FlexBox sx={{ flexDirection: 'column' }}>
                  <Typography>Tune Class</Typography>
                  <FieldArraySimpleTuningPI
                    register={register}
                    formPath={`tunings.${index}.pi`}
                    watch={watch}
                  />
                </FlexBox>
                <FlexBox sx={{ flexDirection: 'column' }}>
                  <Typography>Driving System</Typography>
                  <FieldArrayTuningMajorPartsDrivingSystem
                    register={register}
                    formPath={`tunings.${index}.tuningMajorParts.drivingSystem`}
                    watch={watch}
                  />
                </FlexBox>
                <FlexBox sx={{ flexDirection: 'column' }}>
                  <Typography>Suspension</Typography>

                  <FieldArrayTuningMajorPartsSuspension
                    register={register}
                    formPath={`tunings.${index}.tuningMajorParts.suspension`}
                    watch={watch}
                  />
                </FlexBox>
                <FlexBox sx={{ flexDirection: 'column' }}>
                  <Typography>Tire</Typography>

                  <FieldArrayTuningMajorPartsTire
                    register={register}
                    formPath={`tunings.${index}.tuningMajorParts.tire`}
                    watch={watch}
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Paper>
      </FormProvider>
      <IconButton onClick={removeThisTuning}>
        <HighlightOffOutlinedIcon />
      </IconButton>
    </FlexBox>
  );
}

export default function TuningBulkWrite() {
  const [detailedTuningChoices, setDetailedTuningChoices] = useState<DetailedTuningChoices>(
    detailedTuningChoicesDefault,
  );
  // { control, register, handleSubmit }
  const methods = useForm<TuningBulkWriteType>({
    defaultValues: { tunings: [tuningDefault] },
    mode: 'onChange',
  });

  const { fields, update, append, remove } = useFieldArray<
    TuningBulkWriteType,
    'tunings',
    'tuningBulkID'
  >({
    control: methods.control,
    keyName: 'tuningBulkID',
    name: 'tunings',
  });

  const submit = async (data: TuningBulkWriteInput) => {
    console.log(`data : ${JSON.stringify(data)}`);

    await BulkUploadTuning({ tunings: data as TuningBulkWriteType });
    // if (isEditMode) {
    //   // await EditDecal({ decal: data, authToken: id_token! });
    //   return;
    // }
    // if (!isEditMode) {
    //   // await CreateDecalPost({ decal: data as DecalSchemaType, authToken: id_token! });
    // }
    return;
  };
  const detailTuningChoiceChange = (
    tuningOptionName: TuningOptionName | 'nothing',
    value: boolean,
  ) => {
    setDetailedTuningChoices((prev) => {
      return {
        ...prev,
        [tuningOptionName]: value,
      };
    });
  };

  const addTuningBulk = () => {
    append(tuningDefault);
  };

  const removeTuningBulk = () => {
    remove();
  };

  return (
    <Container sx={{ paddingTop: 2, width: '100%' }} maxWidth={'xl'}>
      <FullSizeCenteredFlexBox sx={{ width: '100%', paddingBottom: 4, paddingTop: 4 }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} style={{ width: '100%' }}>
            <FlexBox sx={{ flexDirection: 'column', rowGap: 1.5, paddingY: 2 }}>
              {fields.map((field, idx) => {
                return (
                  <TuningWrite
                    key={`${field.id}-${idx}`}
                    control={methods.control}
                    update={update}
                    remove={remove}
                    setValue={methods.setValue}
                    watch={methods.watch}
                    register={methods.register}
                    index={idx}
                    value={field}
                  />
                );
              })}
            </FlexBox>
            <FlexBox sx={{ justifyContent: 'center', paddingBottom: 2, height: '100%' }}>
              <Paper
                sx={{
                  width: '80%',
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: 1,
                  border: '2px #5BA541 solid',
                }}
                component={ButtonBase}
                onClick={addTuningBulk}
                elevation={1}
              >
                <AddCircleOutlineOutlinedIcon />
                <Typography variant="h6">Add Tuning</Typography>
              </Paper>
            </FlexBox>
            <FlexBox sx={{ justifyContent: 'end' }}>
              <Button type="submit" variant="contained">
                upload
              </Button>
            </FlexBox>
          </form>
        </FormProvider>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
