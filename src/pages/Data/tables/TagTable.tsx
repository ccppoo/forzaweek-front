import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Divider, Paper, Tooltip, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useQuery } from '@tanstack/react-query';

import type { TagItemReadOnly } from '@/FormData/tag/tag';
import { GetAllTag } from '@/api/tag/tag';
import DeleteItemPopUp from '@/components/Dialogs/DeletePopUp';
import { TagKindItemCell } from '@/components/Tag';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { supportLangs } from '@/config/i18n';

function TagRowItem({ tag }: { tag: TagItemReadOnly }) {
  const DATA_TYPE = 'tag';

  const navigate = useNavigate();

  const [deletePopUpOpened, setDeletePopUpOpened] = useState<boolean>(false);

  const [descriptionExpanded, setDescriptionExpanded] = useState<boolean>(false);

  const closeDeletePopUp = () => {
    setDeletePopUpOpened(false);
  };

  const openDeletePopUp = () => {
    setDeletePopUpOpened(true);
  };

  const openDescription = () => {
    setDescriptionExpanded(true);
  };

  const toggleDescription = () => {
    setDescriptionExpanded((val) => !val);
  };

  const closeDescription = () => {
    setDescriptionExpanded(false);
  };

  const editItem = (itemID: string) => {
    // TODO:
    navigate(`/data/${DATA_TYPE}/edit/${itemID}`);
  };

  const descriptionProvided = tag.description.map(({ lang }) => lang);
  const langNotProvided = [...supportLangs].filter((val) => !descriptionProvided.includes(val));

  const tagNameSorted = tag.name.toSorted(({ lang: n1 }, { lang: n2 }) => (n1 > n2 ? 1 : -1));
  const descriptionSorted = tag.description.toSorted(({ lang: d1 }, { lang: d2 }) =>
    d1 > d2 ? 1 : -1,
  );
  return (
    <>
      <TableRow
        key={`table-row-${tag.name_en}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <TagKindItemCell tagKind={tag.kind} />
          </FlexBox>
        </TableCell>
        {/* 태그 아이콘 */}
        <TableCell>
          <FlexBox sx={{ height: '40px', alignItems: 'center' }}>
            <Image src={tag.imageURL} sx={{ objectFit: 'contain' }} />
          </FlexBox>
        </TableCell>
        <TableCell align="center">
          <FlexBox sx={{ flexDirection: 'column' }}>
            {tagNameSorted.map(({ lang, value }) => {
              return (
                <Box
                  sx={{ display: 'grid', gridTemplateColumns: '60px auto' }}
                  key={`name-${lang}`}
                >
                  <Typography fontWeight={400}>{lang}</Typography>
                  <Typography>{value}</Typography>
                </Box>
              );
            })}
          </FlexBox>
        </TableCell>
        <TableCell align="center" key={`table-cell-description`}>
          <FlexBox sx={{ columnGap: 2, justifyContent: 'center' }}>
            {tag.description.map(({ value, lang }, idx) => {
              const toolTipSummerize = value ? '' : 'Not Provided';
              return (
                <Tooltip title={toolTipSummerize} key={`tag-description-provided-${lang}-${idx}`}>
                  <Button onClick={toggleDescription}>{lang}</Button>
                </Tooltip>
              );
            })}
            {langNotProvided.map((lang, idx) => {
              const toolTipSummerize = 'Not Provided';
              return (
                <Tooltip
                  title={toolTipSummerize}
                  arrow
                  placement="top"
                  key={`tag-description-not-provided-${lang}-${idx}`}
                >
                  <Typography
                    sx={{
                      paddingX: 1.5,
                      paddingY: 0.5,
                      borderRadius: 2,
                      border: '1px solid black',
                      backgroundColor: '#DDDDDD',
                    }}
                    style={{ cursor: 'default' }}
                    fontWeight={300}
                  >
                    {lang}
                  </Typography>
                </Tooltip>
              );
            })}
          </FlexBox>
        </TableCell>
        <TableCell align="right" key={`table-cell-${tag.name_en}-action`} sx={{ width: 75 }}>
          <FlexBox sx={{ columnGap: 1 }}>
            <Button color="info" variant="outlined" size="small" onClick={() => editItem(tag.id)}>
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
            itemID={tag.id}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={descriptionExpanded} timeout="auto" unmountOnExit>
            <FlexBox sx={{ margin: 1, flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Descriptions
              </Typography>
              <FlexBox sx={{ paddingLeft: 2, flexDirection: 'column' }}>
                {descriptionSorted.map(({ value, lang }) => {
                  if (value)
                    return (
                      <FlexBox
                        sx={{ columnGap: 3, minHeight: 50, alignItems: 'center' }}
                        key={`tag-description-open-${lang}`}
                      >
                        <Typography>{lang}</Typography>

                        <FlexBox sx={{ height: '100%' }}>
                          <Typography>{value}</Typography>
                        </FlexBox>
                      </FlexBox>
                    );
                })}
              </FlexBox>
            </FlexBox>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TagTable() {
  const DATA_TYPE = 'tag';

  const navigate = useNavigate();

  // TODO: delete, edit 한 다음에 다시 부르기
  const { data } = useQuery({
    queryKey: ['get tags', undefined],
    queryFn: GetAllTag,
    staleTime: 10,
  });

  const addItem = () => {
    navigate(`/data/${DATA_TYPE}/write`);
  };

  // console.log(`data : ${JSON.stringify(data)}`);

  if (data) {
    const columns = [...new Set([...data.flatMap((dat) => dat.name.map((lan) => lan.lang))])];

    return (
      <FlexBox sx={{ width: '100%', minWidth: 900, flexDirection: 'column', rowGap: 2 }}>
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
                <TableCell align="center">Tag Kind</TableCell>
                <TableCell align="center">Tag Icon</TableCell>
                <TableCell align="center" width={'fit-content'}>
                  Name
                </TableCell>
                <TableCell align="center">Description</TableCell>

                <TableCell align="center" colSpan={1}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((manu, idx) => (
                <TagRowItem tag={manu} key={`tag-table-row-item-${manu.name_en}-${idx}`} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </FlexBox>
    );
  }
}
