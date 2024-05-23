import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import routes from '@/routes';

function NavigationButton({ name, path }: { name: string; path: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToPath = () => {
    navigate(path);
  };
  const isCurrentPath = location.pathname == path;

  return (
    <FlexBox
      sx={{
        columnGap: 1,
        borderRadius: 1,
      }}
    >
      <Button
        sx={{
          alignItems: 'center',
          columnGap: 0.5,
          paddingY: 0.5,
          paddingX: 2,

          borderRadius: 1,
          '&:hover, &.Mui-focusVisible': {
            backgroundColor: '#d4d0c7',
            borderColor: '#a8a6a2',
            boxShadow: 'none',
          },
          backgroundColor: isCurrentPath ? '#d4d0c7' : null,
        }}
        variant="text"
        disabled={isCurrentPath}
        onClick={navigateToPath}
      >
        <Typography variant="body1">{name}</Typography>
      </Button>
    </FlexBox>
  );
}

export default function MenuNavigation({ leftPadding }: { leftPadding: number }) {
  return (
    <Toolbar variant="dense" sx={{ marginX: `${leftPadding}px`, columnGap: 1 }}>
      {Object.entries(routes)
        .filter(([key, item]) => item.title)
        .map(([key, item]) => (
          <NavigationButton
            name={item.title!}
            path={item.devUrl! || item.path!}
            key={`menu-navigate-${item.title}`}
          />
        ))}
    </Toolbar>
  );
}
