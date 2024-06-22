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

import { GetAllNation } from '@/api/data/nation';
import type { GetNation } from '@/api/data/nation';
import DeleteItemPopUp from '@/components/Dialogs/DeletePopUp';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function NationRowItem({ nation }: { nation: GetNation }) {
  const DATA_TYPE = 'nation';

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
    // /data/nation/edit/666851ce98f3742acfec3f67',
    navigate(`/data/${DATA_TYPE}/edit/${itemID}`);
  };

  return (
    <TableRow
      key={`table-row-${nation.name_en}`}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <FlexBox sx={{ width: 60, height: 40, border: '0.5px black solid' }}>
          <Image src={nation.imageURL} />
        </FlexBox>
      </TableCell>
      {nation.i18n.map(({ lang, value }) => {
        return (
          <TableCell align="right" key={`table-cell-${lang}`}>
            {value}
          </TableCell>
        );
      })}
      <TableCell align="right" key={`table-cell-${nation.name_en}-action`} sx={{ width: 75 }}>
        <FlexBox sx={{ columnGap: 1 }}>
          <Button color="info" variant="outlined" size="small" onClick={() => editItem(nation.id)}>
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
          itemID={nation.id}
        />
      </TableCell>
    </TableRow>
  );
}

export default function NationTable() {
  const DATA_TYPE = 'nation';

  const navigate = useNavigate();

  const { data } = useQuery({ queryKey: ['get nations'], queryFn: GetAllNation, staleTime: 10 });

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
                <TableCell>Nation flag</TableCell>
                {columns.map((col) => {
                  return (
                    <TableCell align="right" key={`table-nation-column-${col}`}>
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
              {data.map((nation, idx) => (
                <NationRowItem nation={nation} key={`table-row-${nation.name_en}=${idx}`} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FlexBox>
    );
  }
}
