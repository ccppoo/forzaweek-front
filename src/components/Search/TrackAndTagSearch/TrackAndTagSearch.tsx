import { useNavigate } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import { AutocompleteCarSearchBar, TagAutocompleteTextField } from '@/components/Search';
import { FlexBox, Image } from '@/components/styled';
import useTrackAndTagFilter from '@/store/trackAndTagFilter';

import TrackTypeSelections from './TypeSelection';

interface TrackAndTagSearchIterface {
  searchScope: string;
  doFinalSelect?: boolean;
}

export default function TrackAndTagSearch(props: TrackAndTagSearchIterface) {
  const { searchScope, doFinalSelect: DoFinalSelect } = props;
  const navigate = useNavigate();
  const noCarSelected = 'No track selected';
  const noTagsSelected = 'No tags selected (all tags)';
  const {
    filter: { track, tags: tagsSelected },
    actions: {
      tag: { removeAllTags },
      track: { removeTrack },
    },
  } = useTrackAndTagFilter(searchScope);

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
      <FlexBox>
        <Typography variant="h6">Search Options</Typography>
      </FlexBox>
      {/*  트랙 종류 선택 */}
      <TrackTypeSelections />
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
            <Typography
              sx={{ color: tagsSelected.length > 0 ? 'text.main' : 'text.first' }}
              fontWeight={tagsSelected.length > 0 ? 500 : 300}
            >
              {noTagsSelected}
            </Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox sx={{ flexDirection: 'column' }}>
            {/* FIXME: TagAutocompleteTextField - 태그 자동완성 컴포넌트  */}
            {/* <TagAutocompleteTextField searchScope={searchScope} values={tags} /> */}
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
