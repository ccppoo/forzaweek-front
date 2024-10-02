import { z } from 'zod';

import { documentBase } from '@/schema/base';
import { singleImageURL } from '@/schema/components/image';
import { i18nMapDescription, i18nMapName } from '@/schema/i18n';
import { color } from '@/schema/tag/color';

export const tagBase = documentBase
  .merge(i18nMapName)
  .merge(i18nMapDescription)
  .merge(singleImageURL)
  .merge(color);
