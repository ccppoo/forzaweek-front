import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { PI_Card } from '@/components/PI';
import { TagChip } from '@/components/Post/Tags';
import TuningOptionFilter from '@/components/Tunings/TuningSearchFilter';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

interface FavsButtonIntf {
  favs: number;
  faved: boolean;
  href?: string;
  displayOnly?: boolean;
}

export default function FavsButton(props: FavsButtonIntf) {
  const { favs, faved, href, displayOnly } = props;

  if (displayOnly) {
    return (
      <FlexBox
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'default',
          paddingY: `2px`,
          paddingX: `6px`,
        }}
      >
        {faved ? (
          <FavoriteOutlinedIcon sx={{ fontSize: 15 }} />
        ) : (
          <FavoriteBorderOutlinedIcon sx={{ fontSize: 15 }} />
        )}
        <FlexBox
          sx={{
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 0.5,
          }}
        >
          <Typography>{favs}</Typography>
        </FlexBox>
      </FlexBox>
    );
  }
  return (
    <IconButton sx={{ borderRadius: 1, paddingY: `2px`, paddingX: `6px` }}>
      {faved ? (
        <FavoriteOutlinedIcon sx={{ fontSize: 15 }} />
      ) : (
        <FavoriteBorderOutlinedIcon sx={{ fontSize: 15 }} />
      )}
      <FlexBox
        sx={{
          width: 30,
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 0.5,
        }}
      >
        <Typography>{favs}</Typography>
      </FlexBox>
    </IconButton>
  );
}
