import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { useLiveQuery } from 'dexie-react-hooks';

import {
  AutocompleteCarSearchBar,
  CarFilterAndSelect,
  TagAutocompleteTextField,
} from '@/components/Search';
import { TagItemCell } from '@/components/Tag';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
// import { getCarInfoSimple } from '@/db';
import { getCarFH5, getCarFH5FullType } from '@/db/query/fh5/car';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import useCarAndTagFilter from '@/store/carAndTagFilter';

interface CarAndTagSearchIterface {
  searchScope: string;
  doFinalSelect?: boolean;
}

export default function CarAndTagSearch(props: CarAndTagSearchIterface) {
  const { searchScope, doFinalSelect: DoFinalSelect } = props;
  const navigate = useNavigate();
  const NO_CAR_SELECTED = 'No car selected';
  const noTagsSelected = 'No tags selected (all tags)';
  const {
    filter: { car: carID, tagIDs },
    actions: {
      tag: { removeAllTags },
      car: { removeCar },
    },
  } = useCarAndTagFilter(searchScope);

  // console.log(`tagIDstagIDstagIDs :${JSON.stringify(tagIDs)}`);
  // CarInfoSimple는 제조사 제외한 차 정보 전부
  const carSelected = useLiveQuery<CarFH5FullType | undefined>(
    async () => (!!carID ? getCarFH5FullType(carID) : undefined),
    [carID],
  );

  // FIXME: car name selection i18n
  const BASE_CAR_NAME = carSelected?.baseCar.name.en[0];
  const BASE_CAR_MANUFACTURER_NAME = carSelected?.baseCar.manufacturer.name.en;

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
          <FlexBox sx={{ columnGap: 1 }}>
            <Typography
              sx={{ color: BASE_CAR_NAME ? 'text.main' : 'text.first' }}
              fontWeight={BASE_CAR_NAME ? 400 : 200}
            >
              {BASE_CAR_MANUFACTURER_NAME}
            </Typography>
            <Typography
              sx={{ color: BASE_CAR_NAME ? 'text.main' : 'text.first' }}
              fontWeight={BASE_CAR_NAME ? 500 : 300}
            >
              {BASE_CAR_NAME || NO_CAR_SELECTED}
            </Typography>
          </FlexBox>
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
                  <Typography variant="body2">Search By filters</Typography>
                </FlexBox>
                <CarFilterAndSelect scope={searchScope} doFinalSelect={DoFinalSelect} />
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </AccordionDetails>
        <AccordionActions sx={{ paddingTop: 0 }}>
          <Button color="error" variant="outlined" size="small" onClick={removeCar}>
            Clear car selection
          </Button>
        </AccordionActions>
      </Accordion>
      {/* 태그 선택 */}
      <Accordion sx={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography sx={{ width: '20%', flexShrink: 0 }}>Tags</Typography>
          {tagIDs.length > 0 ? (
            <Stack direction="row" spacing={1}>
              {tagIDs.map((tagID) => (
                <TagItemCell tagID={tagID} key={tagID} />
                // <Chip label={tag} variant="outlined" key={`tag-selected-${tagID}`} />
              ))}
            </Stack>
          ) : (
            <Typography
              sx={{ color: tagIDs.length > 0 ? 'text.main' : 'text.first' }}
              fontWeight={tagIDs.length > 0 ? 500 : 300}
            >
              {noTagsSelected}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ flexDirection: 'column' }}>
            {/* FIXME: TagAutocompleteTextField - 태그 자동완성 컴포넌트  */}
            <TagAutocompleteTextField searchScope={searchScope} limitTags={5} />
          </FlexBox>
        </AccordionDetails>
        <AccordionActions sx={{ paddingTop: 0 }}>
          <Button color="error" variant="outlined" size="small" onClick={removeAllTags}>
            Clear Tags
          </Button>
        </AccordionActions>
      </Accordion>
    </FlexBox>
  );
}
