import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import type { FieldPath } from 'react-hook-form';

import { TextField, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { FlexBox } from '@/components/styled';
import type { FestivalDateInput } from '@/schema/fh5/season/festival';

// 음력 새해 - 30 (~2/29)
// 유럽 자동차 - 31 (~3/28)
// Horizon 레이스 오프 - 32 (~4/25)
// APEX 올스타즈 - 33 (~5/23)
// Horizon 레트로 웨이브 - 34 (~6/20)
// 모던 Horizons - 35 (~7/18)
// Horizon 자동차와 커피 - 36 (~8/15)
// 고성능 데일리즈 - 37 (~9/12)
// 숨겨진 호라이즌 - 38 (~)

interface GetDateIntf {
  days?: number;
}

function getDate(params: GetDateIntf): Date {
  const { days } = params;
  if (days) {
    const d = new Date();
    return new Date(d.setDate(d.getDate() + days));
  }
  return new Date();
}

export default function FestivalDateInput<T extends FestivalDateInput>() {
  const { register, getValues } = useFormContext<T>();

  type FormFieldPath = FieldPath<T>;
  const festivalStartDatePath = 'startDate' as FormFieldPath;
  const festivalEndDatePath = 'endDate' as FormFieldPath;

  const [startDate, setStartDate] = useState<Date>(getValues(festivalStartDatePath) || getDate({}));
  const [endDate, setEndDate] = useState<Date>(
    getValues(festivalEndDatePath) || getDate({ days: 7 }),
  );

  const onChangeDate = (field: 'start' | 'end', e: ChangeEvent<HTMLInputElement>) => {
    // console.log(`e.target.value : ${e.target.value}`);
    switch (field) {
      case 'start': {
        setStartDate(new Date(e.target.value));
      }
      case 'end': {
        setEndDate(new Date(e.target.value));
      }
    }
  };

  const startDateMin = '2021-12-09';

  const dateMAX = '2026-12-31';
  const startDateString = startDate.toISOString().split('T')[0];
  const endDateString = endDate.toISOString().split('T')[0];
  return (
    <FlexBox sx={{ justifyContent: 'center', paddingX: 2, columnGap: 2 }}>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>festival start date</Typography>
        <input
          type="date"
          name="festival-start"
          id="festival-start-date"
          value={startDateString}
          min={startDateMin}
          max={dateMAX}
          onChange={(e) => onChangeDate('start', e)}
        />
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Typography>festival end date</Typography>
        <input
          type="date"
          name="festival-end"
          value={endDateString}
          min={startDateString}
          max={dateMAX}
          onChange={(e) => onChangeDate('end', e)}
        />
      </FlexBox>
    </FlexBox>
  );
}
