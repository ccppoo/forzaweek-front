import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useQuery } from '@tanstack/react-query';

import { GetAllManufacturer } from '@/api/data/manufacturer';
import type { GetManufacturer } from '@/api/data/manufacturer';
import DeleteItemPopUp from '@/components/Dialogs/DeletePopUp';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function ManufacturerRowItem({ manufacturer }: { manufacturer: GetManufacturer }) {
  const DATA_TYPE = 'manufacturer';

  const navigate = useNavigate();

  const [deletePopUpOpened, setDeletePopUpOpened] = useState<boolean>(false);

  const closeDeletePopUp = () => {
    setDeletePopUpOpened(false);
  };

  const openDeletePopUp = () => {
    setDeletePopUpOpened(true);
  };

  const editItem = (itemID: string) => {
    // TODO:
    navigate(`/data/${DATA_TYPE}/edit/${itemID}`);
  };

  return (
    <TableRow
      key={`table-row-${manufacturer.name_en}`}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <FlexBox sx={{ width: 60, height: 40, border: '0.5px black solid' }}>
          <Image src={manufacturer.imageURL} />
        </FlexBox>
      </TableCell>
      <TableCell scope="row" align="center">
        <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', columnGap: 2 }}>
          {/* <FlexBox sx={{ width: 60, height: 40, border: '0.5px black solid' }}> */}
          <FlexBox sx={{ width: 60, height: 40 }}>
            <Image src={manufacturer.origin.imageURL} />
          </FlexBox>
          <Typography>{manufacturer.origin.name_en}</Typography>
        </FlexBox>
      </TableCell>
      <TableCell scope="row" align="center">
        <FlexBox sx={{ justifyContent: 'center' }}>
          <Typography>{manufacturer.founded}</Typography>
        </FlexBox>
      </TableCell>
      {manufacturer.i18n.map(({ lang, value }) => {
        return (
          <TableCell align="center" key={`table-cell-${lang}`}>
            {value}
          </TableCell>
        );
      })}
      <TableCell align="right" key={`table-cell-${manufacturer.name_en}-action`} sx={{ width: 75 }}>
        <FlexBox sx={{ columnGap: 1 }}>
          <Button
            color="info"
            variant="outlined"
            size="small"
            onClick={() => editItem(manufacturer.id)}
          >
            Edit
          </Button>
          <Button color="error" variant="outlined" size="small" onClick={openDeletePopUp}>
            Delete
          </Button>
        </FlexBox>
        <DeleteItemPopUp
          opened={deletePopUpOpened}
          onClose={closeDeletePopUp}
          dataType={DATA_TYPE}
          itemID={manufacturer.id}
        />
      </TableCell>
    </TableRow>
  );
}

export default function ManufacturerTable() {
  const DATA_TYPE = 'manufacturer';

  const navigate = useNavigate();

  // TODO: delete, edit 한 다음에 다시 부르기
  const { data } = useQuery({
    queryKey: ['get manufacturer'],
    queryFn: GetAllManufacturer,
    staleTime: 10,
  });

  const addItem = () => {
    navigate(`/data/${DATA_TYPE}/write`);
  };

  if (data) {
    const columns = [...new Set([...data.flatMap((dat) => dat.i18n.map((lan) => lan.lang))])];

    return (
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 2 }}>
        {/* 데이터 추가 버튼 */}
        <FlexBox sx={{ justifyContent: 'end' }}>
          <Button variant="outlined" onClick={addItem}>
            add data
          </Button>
        </FlexBox>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Manufacturer Logo</TableCell>
                <TableCell align="center">Origin</TableCell>
                <TableCell align="center">founded</TableCell>
                {columns.map((col) => {
                  return (
                    <TableCell align="center" key={`table-nation-column-${col}`}>
                      {col}
                    </TableCell>
                  );
                })}
                <TableCell align="center" colSpan={1}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((manu, idx) => (
                <ManufacturerRowItem
                  manufacturer={manu}
                  key={`manufacturer-table-row-item-${manu.name_en}-${idx}`}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FlexBox>
    );
  }
}
