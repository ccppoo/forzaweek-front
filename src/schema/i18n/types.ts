import { z } from 'zod';

import { i18nMapDescription, i18nMapName } from './index';

type i18nMapNameInput = z.input<typeof i18nMapName>;
type i18nMapNameType = z.infer<typeof i18nMapName>;

type i18nMapDescriptionInput = z.input<typeof i18nMapDescription>;
type i18nMapDescriptionType = z.infer<typeof i18nMapDescription>;

export type { i18nMapNameInput, i18nMapNameType, i18nMapDescriptionInput, i18nMapDescriptionType };
