import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useQuery } from '@tanstack/react-query';

import type { TagItemPopulated, TagName } from '@/FormData/tag/search/types';
import { GetTagByID } from '@/api/tag/tag';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

interface TagItemCellIntf {
  tagID: string;
  newTag?: boolean;
  textOnly?: boolean;
  onClickDelete?: () => void;
}

function displayLang(tagItemOption: TagItemPopulated): string {
  //  const langs =  Object.keys(tagItemOption.name)
  type NameKey = 'ko' | 'en' | 'jp' | 'unknown';
  const displayOrder: NameKey[] = ['ko', 'en', 'jp', 'unknown'];
  for (const lang of displayOrder) {
    const _name = tagItemOption.name[lang];
    if (_name) return _name;
  }
  return tagItemOption.name.unknown!;
}

export default function TagItemCell(props: TagItemCellIntf) {
  const { tagID, textOnly, newTag, onClickDelete } = props;

  const existingTag = !!tagID && !newTag;

  let { data: tagInfo } = useQuery({
    queryKey: ['get tag', tagID],
    queryFn: GetTagByID,
    enabled: existingTag,
  });
  // const Component = paper ? Paper : FlexBox;

  if (existingTag && tagInfo) {
    const tagName = tagInfo.name.en || tagInfo.initial_name;
    const tagImage = tagInfo.imageURL || undefined; // tagInfo.kind.imageURL;
    return (
      <Paper
        sx={{
          display: 'flex',
          height: textOnly ? 36 : 48,
          paddingX: 1,
          alignItems: 'center',
          alignSelf: 'flex-start',
          width: 'fit-content',
          columnGap: 1.5,
        }}
      >
        {existingTag && tagInfo ? (
          <>
            {!textOnly && tagImage && (
              <FlexBox sx={{ maxWidth: 80, height: '40px', alignItems: 'center' }}>
                <Image src={tagImage} sx={{ objectFit: 'contain' }} />
              </FlexBox>
            )}
            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography>{tagName}</Typography>
            </FlexBox>
          </>
        ) : (
          <FlexBox sx={{ alignItems: 'center' }}>
            <Typography>{tagID}</Typography>
          </FlexBox>
        )}
        {onClickDelete && (
          <IconButton
            aria-label="delete"
            onClick={onClickDelete}
            size="small"
            sx={{ borderRadius: 1 }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        )}
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        height: textOnly ? 36 : 48,
        paddingX: 1,
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: 'fit-content',
        columnGap: 1.5,
      }}
    >
      <FlexBox sx={{ alignItems: 'center' }}>
        <Typography>{tagID}</Typography>
      </FlexBox>

      {onClickDelete && (
        <IconButton
          aria-label="delete"
          onClick={onClickDelete}
          size="small"
          sx={{ borderRadius: 1 }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      )}
    </Paper>
  );
}

export function TagItemCellEditVersion({
  tag,
  onClickDelete,
}: {
  tag: string;
  onClickDelete: () => void;
}) {
  return (
    <Paper sx={{ width: 'fit-content', flexDirection: 'column' }}>
      <TagItemCell tagID={tag} />
      <IconButton aria-label="delete">
        <CloseOutlinedIcon />
      </IconButton>
    </Paper>
  );
}
