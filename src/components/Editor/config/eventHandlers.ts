import { API, BlockMutationEvent } from '@editorjs/editorjs';
import type {
  BlockAddedEvent,
  BlockChangedEvent,
  BlockMovedEvent,
  BlockRemovedEvent,
} from '@editorjs/editorjs';

type MutationEventType = 'block-added' | 'block-changed' | 'block-moved' | 'block-removed';

export default function dispatchChangeEvent(api: API, mutationEvent: BlockMutationEvent): void {
  switch (mutationEvent.type as MutationEventType) {
    case 'block-added': {
      onBlockAdded(api, mutationEvent as BlockAddedEvent);
      return;
    }
    case 'block-changed': {
      onBlockChanged(api, mutationEvent as BlockChangedEvent);
      return;
    }
    case 'block-moved': {
      onBlockMoved(api, mutationEvent as BlockMovedEvent);
      return;
    }
    case 'block-removed': {
      onBlockRemoved(api, mutationEvent as BlockRemovedEvent);
      return;
    }
  }
}

const onBlockAdded = (api: API, blockAddEvent: BlockAddedEvent) => {
  return;
};
const onBlockChanged = (api: API, blockChangeEvent: BlockChangedEvent) => {
  // console.log(`blockChangeEvent.detail : ${JSON.stringify(blockChangeEvent.detail)}`);
  // blockChangeEvent.detail.index
  return;
};
const onBlockMoved = (api: API, blockMoveEvent: BlockMovedEvent) => {
  // NOTE: block moved event는 한 번에 하나씩 됨
  return;
};
const onBlockRemoved = (api: API, blockRemoveEvent: BlockRemovedEvent) => {
  // 블럭 삭제
  return;
};
