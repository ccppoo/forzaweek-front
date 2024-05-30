import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Paper, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { DecalCellListing } from '@/components/Decals';
import {
  AutocompleteCarSearchBar,
  CarFilterAndSelect,
  TagAutocompleteTextField,
} from '@/components/Search';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { tags } from '@/data/tags';
import useCarAndTagFilter from '@/store/carAndTagFilter';

interface CarAndTagSearchIterface {
  searchScope: string;
  doFinalSelect?: boolean;
}

export default function CarAndTagSearch(props: CarAndTagSearchIterface) {
  const { searchScope, doFinalSelect: DoFinalSelect } = props;
  const navigate = useNavigate();
  const noCarSelected = 'No car selected (all cars)';
  const noTagsSelected = 'No tags selected (all tags)';
  const {
    filter: { car, tags: tagsSelected },
  } = useCarAndTagFilter(searchScope);

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
      <FlexBox>
        <Typography variant="h6">Search Options</Typography>
      </FlexBox>
      {/* 자동차 선택 */}
      <Accordion sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ width: '20%', flexShrink: 0 }}>Car</Typography>
          <Typography sx={{ color: 'text.secondary' }}>{car?.name || noCarSelected}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ flexDirection: 'column' }}>
            {/* 직접 검색 */}
            <FlexBox sx={{ flexDirection: 'column' }}>
              <AutocompleteCarSearchBar searchScope={searchScope} />
            </FlexBox>
            {/* 필터로 검색 */}
            <FlexBox sx={{ rowGap: 1, flexDirection: 'column' }}>
              <FlexBox sx={{ flexDirection: 'column' }}>
                <FlexBox>
                  <Typography>Search By filters</Typography>
                </FlexBox>
                <CarFilterAndSelect scope={searchScope} doFinalSelect={DoFinalSelect} />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </AccordionDetails>
      </Accordion>
      {/* 태그 선택 */}
      <Accordion sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ width: '20%', flexShrink: 0 }}>Tags</Typography>
          {tagsSelected.length > 0 ? (
            <Stack direction="row" spacing={1}>
              {tagsSelected.map((tag: string) => (
                <Chip label={tag} variant="outlined" key={`tag-selected-chip-${tag}`} />
              ))}
            </Stack>
          ) : (
            <Typography sx={{ color: 'text.secondary' }}>{noTagsSelected}</Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ flexDirection: 'column' }}>
            <TagAutocompleteTextField searchScope={searchScope} values={tags} />
          </FlexBox>
        </AccordionDetails>
      </Accordion>
    </FlexBox>
  );
}
