import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Paper, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import type { TagType } from '@/FormData/tag';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

interface NewTagItemCellIntf {
  name: string;
  onClickDelete?: () => void;
}

export default function NewTagItemCell(props: NewTagItemCellIntf) {
  const { name, onClickDelete } = props;
  return (
    <Paper
      sx={{
        display: 'flex',
        height: false ? 36 : 48,
        paddingX: 1,
        alignItems: 'center',
        alignSelf: 'flex-start',
        width: 'fit-content',
        columnGap: 1.5,
      }}
    >
      <FlexBox sx={{ alignItems: 'center' }}>
        <Typography>{name}</Typography>
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
