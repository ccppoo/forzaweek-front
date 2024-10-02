import { EventHandler, useState } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type {
  ArrayPath,
  Control,
  FieldArray,
  FieldArrayPath,
  FieldArrayWithId,
  FieldPath,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
} from 'react-hook-form';

import { Button, Paper, TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { FlexBox } from '@/components/styled';
import type { FestivalNameNumberInput } from '@/schema/fh5/season/festival';
import type { RewardInput, RewardsInput } from '@/schema/fh5/season/reward';
import { rewardDefault } from '@/schema/fh5/season/reward';

// 음력 새해 - 30 (~2/29)
// 유럽 자동차 - 31 (~3/28)
// Horizon 레이스 오프 - 32 (~4/25)
// APEX 올스타즈 - 33 (~5/23)
// Horizon 레트로 웨이브 - 34 (~6/20)
// 모던 Horizons - 35 (~7/18)
// Horizon 자동차와 커피 - 36 (~8/15)
// 고성능 데일리즈 - 37 (~9/12)
// 숨겨진 호라이즌 - 38 (~)
type RewardSelections =
  | 'Car'
  | 'Forza Link'
  | 'Clothing'
  | 'Emote'
  | 'Super Wheelspin'
  | 'Wheelspin';
interface RewardInputFieldIntf<T extends RewardsInput> {
  control: Control<T>;
  update: UseFieldArrayUpdate<T>;
  remove: UseFieldArrayRemove;
  index: number;
  value: FieldArrayWithId<T>;
  // value: RewardInput & Record<'id', string> ;
}
// car: z.optional(z.string()),
// forzaLink: z.optional(z.string()),
// clothing: z.optional(z.string()),
// emote: z.optional(z.string()),
// superWheelSpin: z.number().gte(0),
// wheelSpin: z.number().gte(0),

interface RewardValueInputIntf {
  setRewardValue: (value: string | number) => void;
  display: boolean;
}
function RewardCarInput(props: RewardValueInputIntf) {
  // TODO: car select ID
  const { setRewardValue, display } = props;
  if (!display) {
    setRewardValue(''); // 초기화
    return <></>;
  }
  const [carValue, setCarValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`event.target.value : ${event.target.value}`);
    setCarValue(event.target.value);
  };

  return (
    <TextField
      id="standard-number"
      label="Car"
      type="text"
      variant="standard"
      value={carValue}
      onChange={onChange}
      size="small"
    />
  );
}

function RewardForzaLinkInput(props: RewardValueInputIntf) {
  const { setRewardValue, display } = props;
  if (!display) {
    setRewardValue(''); // 초기화
    return <></>;
  }
  const [forzaLinkValue, setForzaLinkValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`event.target.value : ${event.target.value}`);
    setForzaLinkValue(event.target.value);
  };

  return (
    <TextField
      id="standard-number"
      label="Forza Link"
      type="text"
      variant="standard"
      value={forzaLinkValue}
      onChange={onChange}
      size="small"
    />
  );
}

function RewardClothingInput(props: RewardValueInputIntf) {
  const { setRewardValue, display } = props;
  if (!display) {
    setRewardValue(''); // 초기화
    return <></>;
  }
  const [clothingValue, setClothingValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`event.target.value : ${event.target.value}`);
    setClothingValue(event.target.value);
  };

  return (
    <TextField
      id="standard-number"
      label="Clothing name"
      type="text"
      variant="standard"
      value={clothingValue}
      onChange={onChange}
      size="small"
    />
  );
}

function RewardEmoteInput(props: RewardValueInputIntf) {
  const { setRewardValue, display } = props;
  if (!display) {
    setRewardValue(''); // 초기화
    return <></>;
  }
  const [emoteValue, setEmoteValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`event.target.value : ${event.target.value}`);
    setEmoteValue(event.target.value);
  };

  return (
    <TextField
      id="standard-number"
      label="Emote name"
      type="text"
      variant="standard"
      value={emoteValue}
      onChange={onChange}
      size="small"
    />
  );
}

function RewardSuperWheelspinInput(props: RewardValueInputIntf) {
  const { setRewardValue, display } = props;
  if (!display) {
    setRewardValue(0); // 초기화
    return <></>;
  }

  const [wheelSpins, _setWheelSpins] = useState<number>(0);
  const setWheelSpins = (num: number) => {
    if (num < 0) {
      _setWheelSpins(0);
      return;
    }
    _setWheelSpins(num);
    setRewardValue(num);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`event.target.value : ${event.target.value}`);
    setWheelSpins(parseInt(event.target.value));
  };
  return (
    <TextField
      id="standard-number"
      label="Super Wheelspin"
      type="number"
      variant="standard"
      value={wheelSpins}
      onChange={onChange}
      size="small"
    />
  );
}

function RewardWheelspinInput(props: RewardValueInputIntf) {
  const { setRewardValue, display } = props;
  if (!display) {
    setRewardValue(0); // 초기화
    return <></>;
  }
  const [wheelSpins, _setWheelSpins] = useState<number>(0);
  const setWheelSpins = (num: number) => {
    if (num < 0) {
      _setWheelSpins(0);
      return;
    }
    _setWheelSpins(num);
    setRewardValue(num);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(`event.target.value : ${event.target.value}`);
    setWheelSpins(parseInt(event.target.value));
  };
  return (
    <TextField
      id="standard-number"
      label="Wheelspin"
      type="number"
      variant="standard"
      value={wheelSpins}
      onChange={onChange}
      size="small"
    />
  );
}

function RewardInputField<K extends RewardsInput>(props: RewardInputFieldIntf<K>) {
  const { update, index, value, control, remove } = props;

  const [rewardType, setRewardType] = useState<RewardSelections>('Car');

  const { setValue, getValues } = useForm<RewardInput & Record<'id', string>>({
    defaultValues: value,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 이전에 있던 값 초기화
    rewardType;
    setRewardType(event.target.value as RewardSelections);
  };

  const removeThisReward = () => {
    remove(index);
  };

  const setRewardValue = (rewardValue: string | number) => {
    switch (rewardType) {
      case 'Car': {
        setValue('car', rewardValue as string);
      }
      case 'Clothing': {
        setValue('clothing', rewardValue as string);
      }
      case 'Emote': {
        setValue('emote', rewardValue as string);
      }
      case 'Forza Link': {
        setValue('forzaLink', rewardValue as string);
      }
      case 'Super Wheelspin': {
        setValue('superWheelSpin', rewardValue as number);
      }
      case 'Wheelspin': {
        setValue('wheelSpin', rewardValue as number);
      }
    }
  };

  return (
    <FlexBox sx={{ paddingX: 1, paddingY: 2, justifyContent: 'space-between' }}>
      <Paper sx={{ display: 'flex', paddingX: 2, paddingY: 1, flexDirection: 'column' }}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChange}
          value={rewardType}
        >
          <FormControlLabel value="Car" control={<Radio />} label="Car" />
          <FormControlLabel value="Forza Link" control={<Radio />} label="Forza Link" />
          <FormControlLabel value="Clothing" control={<Radio />} label="Clothing" />
          <FormControlLabel value="Emote" control={<Radio />} label="Emote" />
          <FormControlLabel value="Super Wheelspin" control={<Radio />} label="Super Wheelspin" />
          <FormControlLabel value="Wheelspin" control={<Radio />} label="Wheelspin" />
        </RadioGroup>
        {/* 여기에는 선택한 보상에 따라서 입력하는 보상 */}
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <RewardCarInput setRewardValue={setRewardValue} display={rewardType == 'Car'} />
          <RewardForzaLinkInput
            setRewardValue={setRewardValue}
            display={rewardType == 'Forza Link'}
          />
          <RewardClothingInput setRewardValue={setRewardValue} display={rewardType == 'Clothing'} />
          <RewardEmoteInput setRewardValue={setRewardValue} display={rewardType == 'Emote'} />
          <RewardWheelspinInput
            setRewardValue={setRewardValue}
            display={rewardType == 'Wheelspin'}
          />
          <RewardSuperWheelspinInput
            setRewardValue={setRewardValue}
            display={rewardType == 'Super Wheelspin'}
          />
        </FlexBox>
      </Paper>
      <FlexBox
        sx={{
          paddingY: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button color="error" variant="contained" onClick={removeThisReward}>
          remove
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

export default function RewardsInputField<T extends RewardsInput>() {
  const { register, control } = useFormContext<T>();

  type FormFieldPath = FieldPath<T>;
  const rewardsInputPath = 'rewards' as FormFieldPath;

  const rewardsArrayPath = 'rewards' as FieldArrayPath<T>;

  const {
    fields: rewardsField,
    append: appendReward,
    remove: removeReward,
    update,
  } = useFieldArray<T, FieldArrayPath<T>, 'id'>({
    control,
    name: rewardsArrayPath,
    keyName: 'id',
  });

  const addRewardCell = () => {
    appendReward(rewardDefault as FieldArray<T, FieldArrayPath<T>>);
  };

  return (
    <FlexBox sx={{ justifyContent: 'center', flexDirection: 'column' }}>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>festival rewards</Typography>
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 1, width: '100%' }}>
        {rewardsField.map((field, idx) => {
          return (
            <RewardInputField<T>
              control={control}
              index={idx}
              remove={removeReward}
              update={update}
              value={field}
              key={`festival-${field.id}`}
            />
          );
        })}
      </FlexBox>

      <FlexBox sx={{ justifyContent: 'center', paddingTop: 1 }}>
        <Button variant="contained" onClick={addRewardCell}>
          <Typography>add reward</Typography>
        </Button>
      </FlexBox>
    </FlexBox>
  );
}
