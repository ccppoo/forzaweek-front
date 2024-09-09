import type { Theme } from '@mui/material';

import { RotuesRoot, RoutesBaseDev } from '@/routes/types';

export function getPageHeight(theme: Theme) {
  const topSpacing = Number(theme.mixins.toolbar.minHeight) + parseInt(theme.spacing(1));

  return `calc(100vh - ${topSpacing}px)`;
}
