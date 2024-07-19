import * as image from './image';
import * as tag from './tag';
import type { MultipleImagesDependentCreation, SingleImageDependentCreation } from './image';
import type { TagDependentCreation } from './tag';

export { tag, image };

export type { TagDependentCreation, SingleImageDependentCreation, MultipleImagesDependentCreation };
