import { useState } from 'react';

import { Box, Button, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';

// import { useSubscriber } from '@/socket/subscriber';
import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { imageMatch } from '@/data/cars';
import carData from '@/data/cars.json';
import trackData from '@/data/track.json';
import { db } from '@/db';
import { Track } from '@/db/schema';
import useAddDataDialog from '@/store/addDataDialog';

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

const langs = [
  {
    lang: 'ko',
    country: [],
  },
  {
    lang: 'en',
    country: ['us', 'uk'],
  },
];

function createData(flagImage: string, ko: string, en: string) {
  return { flagImage, ko, en };
}

const rows = [
  createData(image.flags.korea, '한국', 'Korea'),
  createData(image.flags.japan, '일본', 'Japan'),
  createData(image.flags.usa, '미국', 'USA'),
  createData(image.flags.uk, '영국', 'UK'),
];

function BasicTable() {
  const [opened, { open }] = useAddDataDialog();

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 2 }}>
      {/* 데이터 추가 버튼 */}
      <FlexBox sx={{ justifyContent: 'end' }}>
        <Button variant="outlined" onClick={open}>
          add data
        </Button>
      </FlexBox>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nation flag</TableCell>
              <TableCell align="right">한국어(ko)</TableCell>
              <TableCell align="right">영어(en)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.en} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <FlexBox sx={{ width: 60, height: 40, border: '0.5px black solid' }}>
                    <Image src={row.flagImage} />
                  </FlexBox>
                </TableCell>
                <TableCell align="right">{row.ko}</TableCell>
                <TableCell align="right">{row.en}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FlexBox>
  );
}

function Data() {
  const [msg, setMSG] = useState<string>('');

  return (
    <>
      <Meta title="Test" />
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 20 }}>
          {/* 번역, 언어 */}
          <FlexBox sx={{ border: '1px black solid', borderRadius: 1 }}>
            {langs.map((val) => {
              return (
                <FlexBox sx={{}}>
                  <Button>{val.lang}</Button>
                </FlexBox>
              );
            })}
          </FlexBox>
          {/* 데이터 값 */}
          <FlexBox sx={{ border: '1px black solid', borderRadius: 1 }}>
            {menus.map((val) => {
              return (
                <FlexBox sx={{}}>
                  <Button>{val.name}</Button>
                </FlexBox>
              );
            })}
          </FlexBox>

          <BasicTable />
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default Data;
