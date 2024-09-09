import { atomFamily, useRecoilState } from 'recoil';

import type { Tags } from '@/types/tag';

import { TagActions, TrackActions } from './types';

interface Track {
  id?: number;
  name: string;
  name_en: string;
  ko_sound: string;
  en_sound: string;
  ko_trans: string;
  en_trans: string;
  trackType: string;
  courseType: string;
}
const tagsDefault: Tags = [];
const trackDefault: Track | undefined = undefined;

type TrackTagFilter = {
  tags: Tags;
  track: Track | undefined;
};

const trackTagFilterDefault: TrackTagFilter = {
  tags: tagsDefault,
  track: trackDefault,
};

const trackTagFilterStateFamily = atomFamily<TrackTagFilter, string>({
  key: 'track-tag-filter-state',
  default: trackTagFilterDefault,
});

function useTrackAndTagFilter(scope: string): {
  filter: { track: Track | undefined; tags: Tags };
  actions: { track: TrackActions; tag: TagActions };
} {
  const trackTagFilterState = trackTagFilterStateFamily(scope);
  const [trackTagFilterOptions, setTrackTagFilterOptions] = useRecoilState(trackTagFilterState);

  const setTags = (tags: Tags) => {
    setTrackTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: tags,
      };
    });
  };

  const addTag = (tag: string) => {
    setTrackTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: [...prev.tags, tag],
      };
    });
  };

  const removeTag = (tagRemoved: string) => {
    setTrackTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: [...prev.tags.filter((t) => t != tagRemoved)],
      };
    });
  };

  const removeAllTags = () => {
    setTrackTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: [],
      };
    });
  };

  const setTrack = async (name: Track | undefined) => {
    setTrackTagFilterOptions((prev) => {
      return {
        ...prev,
        track: name,
      };
    });
  };

  const removeTrack = () => {
    setTrackTagFilterOptions((prev) => {
      return {
        ...prev,
        track: undefined,
      };
    });
  };

  return {
    filter: trackTagFilterOptions,
    actions: {
      track: {
        setTrack,
        removeTrack,
      },
      tag: {
        setTags,
        addTag,
        removeTag,
        removeAllTags,
      },
    },
  };
}

export default useTrackAndTagFilter;
