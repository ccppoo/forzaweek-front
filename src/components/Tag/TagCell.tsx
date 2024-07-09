import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { useQuery } from '@tanstack/react-query';

import type { TagType } from '@/FormData/tag';
import { GetTagByID } from '@/api/data/tag';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

interface TagItemCellIntf {
  tag: TagType.TagSchemaType | string;
  onClickDelete?: () => void;
}

export default function TagItemCell(props: TagItemCellIntf) {
  const { tag, onClickDelete } = props;
  const isTagIDgiven = typeof tag == 'string';
  // useQuery
  let { data: _tagInfo } = useQuery({
    queryKey: ['get tag', tag as string],
    queryFn: GetTagByID,
    enabled: isTagIDgiven,
  });

  const tagInfo = isTagIDgiven ? _tagInfo : tag;

  // const Component = paper ? Paper : FlexBox;

  if (tagInfo) {
    const tagName = tagInfo.name_en;
    const tagImage = tagInfo.imageURL || tagInfo.kind.imageURL;

    return (
      <Paper
        sx={{
          display: 'flex',
          height: 48,
          paddingX: 1,
          alignItems: 'center',
          alignSelf: 'flex-start',
          width: 'fit-content',
          columnGap: 1.5,
        }}
      >
        {tagImage && (
          <FlexBox sx={{ maxWidth: 80, height: '40px', alignItems: 'center' }}>
            <Image src={tagImage} sx={{ objectFit: 'contain' }} />
          </FlexBox>
        )}
        <FlexBox sx={{ alignItems: 'center' }}>
          <Typography>{tagName}</Typography>
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
}

export function TagItemCellEditVersion({
  tag,
  onClickDelete,
}: {
  tag: TagType.TagSchemaType | string;
  onClickDelete: () => void;
}) {
  return (
    <Paper sx={{ width: 'fit-content', flexDirection: 'column' }}>
      <TagItemCell tag={tag} />
      <IconButton aria-label="delete">
        <CloseOutlinedIcon />
      </IconButton>
    </Paper>
  );
}
