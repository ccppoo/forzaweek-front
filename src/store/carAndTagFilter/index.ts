import { atomFamily, useRecoilState } from 'recoil';

import type { Car2 } from '@/db/schema/car';
import type { CarInfo2 } from '@/types/car';
import type { CarAndImage } from '@/types/car';
import type { Tags } from '@/types/tag';

import { CarActions, TagActions } from './types';

const tagsDefault: Tags = [];
const carDefault: Car2 | undefined = undefined;
type CarTagFilter = {
  tags: Tags;
  car: Car2 | undefined;
};

const carTagFilterDefault: CarTagFilter = {
  tags: tagsDefault,
  car: carDefault,
};

const carTagFilterStateFamily = atomFamily<CarTagFilter, string>({
  key: 'car-tag-filter-state',
  default: carTagFilterDefault,
});

function useCarAndTagFilter(scope: string): {
  filter: { car: Car2 | undefined; tags: Tags };
  actions: { car: CarActions; tag: TagActions };
} {
  const carTagFilterState = carTagFilterStateFamily(scope);
  const [carTagFilterOptions, setCarTagFilterOptions] = useRecoilState(carTagFilterState);

  const setTags = (tags: Tags) => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: tags,
      };
    });
  };

  const addTag = (tag: string) => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: [...prev.tags, tag],
      };
    });
  };

  const removeTag = (tagRemoved: string) => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        tags: [...prev.tags.filter((t) => t != tagRemoved)],
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

  const setCar = async (name: Car2 | undefined) => {
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
