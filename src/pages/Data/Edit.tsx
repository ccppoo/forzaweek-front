import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { Route, Routes, useParams } from 'react-router-dom';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import { Box, Button, Checkbox, IconButton, List, Paper, Typography } from '@mui/material';
import { TextFieldProps } from '@mui/material';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';

import * as image from '@/image';
import type { NationEditSchema } from '@/FormData/nation';
import { nationEditSchemaDefault } from '@/FormData/nation';
import { AddNewNation, EditNation, GetNationEdit } from '@/api/data/nation';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';

import * as Forms from './forms';

const menus = [
  {
    name: 'nation',
  },
  {
    name: 'manufacturer',
  },
  {
    name: 'drive train',
  },
  {
    name: 'engine',
  },
  {
    name: 'car',
  },
  {
    name: 'body style',
  },
  {
    name: 'stat',
  },
  {
    name: 'tuning',
  },
];

function EditData() {
  const DataName = 'nation';
  const { dataType, itemID } = useParams();
  const { data } = useQuery({
    queryKey: [dataType!, { dataType: dataType!, itemID: itemID! }],
    queryFn: GetNationEdit,
    staleTime: 0,
  });

  const EditForms: Record<string, (data: any) => ReactElement> = {
    nation: (data) => <Forms.NationForm nationEditSchema={data} />,
    manufacturer: (data) => <Forms.ManufacturerForm manufacturerEditSchema={data} />,
  };

  console.log(`resp : ${JSON.stringify(data)}`);

  if (data) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 2 }}>
          {/* 데이터 값 */}
          <FlexBox sx={{ border: '1px black solid', borderRadius: 1 }}>
            {menus.map((val) => {
              return (
                <FlexBox sx={{}} key={`data-input-menu-${val.name}`}>
                  <Button>{val.name}</Button>
                </FlexBox>
              );
            })}
          </FlexBox>
          <Paper
            sx={{
              display: 'flex',
              width: '100%',
              paddingX: 5,
              paddingY: 1,
              flexDirection: 'column',
            }}
          >
            {/* 제목 */}
            <FlexBox sx={{ paddingBottom: 3 }}>
              <Typography variant="h6">{DataName}</Typography>
            </FlexBox>
            {/* 데이터 채워야할 본문 */}
            {EditForms[dataType!](data)}
          </Paper>
        </FullSizeCenteredFlexBox>
      </Container>
    );
  }
}

export default EditData;
