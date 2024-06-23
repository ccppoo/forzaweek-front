import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Paper, Typography } from '@mui/material';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

interface PostListMenuIntf {
  scope: string;
  write?: boolean;
}

export default function PostListMenu(props: PostListMenuIntf) {
  const { scope, write } = props;

  const hrefLink = `/${scope}/write`;

  return (
    <FlexBox sx={{ minHeight: 50, justifyContent: 'end', width: '100%', alignItems: 'center' }}>
      <Button
        href={hrefLink}
        startIcon={<EditOutlinedIcon />}
        variant="outlined"
        size="small"
        sx={{ height: '100%' }}
      >
        Create
      </Button>
    </FlexBox>
  );
}
