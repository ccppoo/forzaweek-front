import { useFormContext } from 'react-hook-form';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import type { TaggingItemForm } from '@/FormData/tag/tagging';
import { taggingItemForm, taggingItemFormDefault } from '@/FormData/tag/tagging';
import MinHeightTextarea from '@/components/TextArea/TextareaResizableTemp';
import { FlexBox } from '@/components/styled';

import SearchAndCreateTag from './SearchAndCreateTag';
import TagCommentFormProvider from './components/TagAddFormProvider';

function AddTag() {
  const tagAddGuideText = 'add tags that could describe';
  const selectScope = 'taggable-comment-create';

  return (
    <Accordion sx={{ width: '100%' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography sx={{ width: '20%', flexShrink: 0 }}>Tag</Typography>
        <Typography
          sx={{ color: false ? 'text.main' : 'text.first' }}
          fontWeight={false ? 500 : 300}
        >
          {tagAddGuideText}
        </Typography>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <FlexBox sx={{ flexDirection: 'column' }}>
          {/* 직접 검색 */}
          <SearchAndCreateTag postType="taggableComment" selectScope={selectScope} />
        </FlexBox>
      </AccordionDetails>
      <AccordionActions sx={{ paddingTop: 0 }}>
        {/* <FlexBox sx={{ justifyContent: 'end', paddingY: 0.3 }}> */}
        {/* <FlexBox sx={{ columnGap: 1 }}> */}
        <Button color="warning" variant="outlined" size="small" sx={{ borderRadius: 2 }}>
          cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          size="small"
          sx={{ borderRadius: 2 }}
          type="submit"
        >
          add tag
        </Button>
        {/* </FlexBox> */}
        {/* </FlexBox> */}
      </AccordionActions>
    </Accordion>
  );
}

function TagAdderActions() {
  const { setValue, getValues, watch, control } = useFormContext<TaggingItemForm>();

  return (
    <FlexBox sx={{ justifyContent: 'end', paddingY: 0.3 }}>
      <FlexBox sx={{ columnGap: 1 }}>
        <Button color="warning" variant="outlined" size="small" sx={{ borderRadius: 2 }}>
          cancel
        </Button>
        <Button
          color="success"
          variant="contained"
          size="small"
          sx={{ borderRadius: 2 }}
          type="submit"
        >
          add tag
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

export default function TagAdder() {
  // const [auth, state, action] = useAuthState();
  // const { postID } = useParams<EditPathParam>();
  // // postID 있으면 편집모드
  // // console.log(`postID: ${postID}`);

  // const queryEnabled = !!auth.id_token && !!postID;
  // // console.log(`queryEnabled : ${queryEnabled}`);
  // const { data, isSuccess, isFetching } = useQuery({
  //   queryKey: ['edit post', postID!],
  //   queryFn: getBoardPostEdit,
  //   enabled: queryEnabled,
  //   // staleTime: Infinity,
  // });
  const selectScope = 'taggable-comment-create';

  return (
    <FlexBox
      sx={{
        border: '1px black solid',
        paddingY: 0.2,
        paddingX: 0.1,
        borderRadius: 2,
        width: '100%',
        flexDirection: 'column',
        paddingBottom: 2,
      }}
    >
      {/* FIXME: */}
      <TagCommentFormProvider data={taggingItemFormDefault} topic={''} subjectID={''} id_token={''}>
        {/* 태그 달 수 있는 fold */}
        <SearchAndCreateTag postType="taggableComment" selectScope={selectScope} />
        <TagAdderActions />
      </TagCommentFormProvider>
    </FlexBox>
  );
}
