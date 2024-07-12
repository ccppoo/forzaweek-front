import { SyntheticEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FieldName } from 'react-hook-form';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  List,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';

import type { TuningEditSchema } from '@/FormData/tuning';
import { FlexBox } from '@/components/styled';
import type { TuningOption } from '@/types/car';
import { TuningOptions } from '@/types/car';
import { range } from '@/utils';
import { getPrecision } from '@/utils/math';

interface SliderValueProp {
  name: string;
  min: number;
  max: number;
  formPath: string;
  height?: number;
  step?: number;
  minMaxReverse?: boolean;
  unitChar?: string;
}

interface SliderTitleProp {
  name: string;
  LeftName: string;
  RightName: string;
  unitName?: string;
}

export default function SliderTitle(props: SliderTitleProp) {
  const { name, LeftName, RightName, unitName } = props;
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        minHeight: 60,
        height: '100%',
        gridTemplateColumns: '5fr 4fr 1fr',
      }}
    >
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          paddingX: 1,
        }}
      >
        <Typography variant="h5">{name}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingX: 2,
        }}
      >
        <Typography>{LeftName}</Typography>
        <Typography>{RightName}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>{unitName && unitName}</Typography>
      </FlexBox>
    </Box>
  );
}
