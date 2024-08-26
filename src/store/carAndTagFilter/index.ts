import { atomFamily, useRecoilState } from 'recoil';

import type { TagItem } from '@/FormData/tag/tag';
import type { Car2 } from '@/db/schema/car';
import type { CarInfo2 } from '@/types/car';
import type { CarAndImage } from '@/types/car';
import type { Tags } from '@/types/tag';

import { CarActions, TagActions } from './types';

export type TagID = string;
export type CarID = string;
type CarTagFilter = {
  tagIDs: TagID[];
  car: CarID | undefined;
};

const carTagFilterDefault: CarTagFilter = {
  tagIDs: [],
  car: undefined,
};

const carTagFilterStateFamily = atomFamily<CarTagFilter, string>({
  key: 'car-tag-filter-state',
  default: carTagFilterDefault,
});

function useCarAndTagFilter(scope: string): {
  filter: { car: CarID | undefined; tagIDs: TagID[] };
  actions: { car: CarActions; tag: TagActions };
} {
  const carTagFilterState = carTagFilterStateFamily(scope);
  const [carTagFilterOptions, setCarTagFilterOptions] = useRecoilState(carTagFilterState);

  const setTags = (tagIDs: string[]) => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        tagIDs: tagIDs,
      };
    });
  };

  const addTag = (tagID: string) => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        tagIDs: [...prev.tagIDs, tagID],
      };
    });
  };

  const removeTag = (tagRemoved: string) => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: [...prev.tagIDs.filter((t) => t != tagRemoved)],
      };
    });
  };

  const removeAllTags = () => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: [],
      };
    });
  };

  const setCar = async (name: CarID | undefined) => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        car: name,
      };
    });
  };

  const removeCar = () => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        car: undefined,
      };
    });
  };

  return {
    filter: carTagFilterOptions,
    actions: {
      car: {
        setCar,
        removeCar,
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

export default useCarAndTagFilter;
