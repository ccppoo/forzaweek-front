import { atomFamily, useRecoilState } from 'recoil';

import type { CarInfo, Tags } from '@/types';

import { CarActions, TagActions } from './types';

const tagsDefault: Tags = [];
const carDefault: CarInfo | undefined = undefined;
type CarTagFilter = {
  tags: Tags;
  car: CarInfo | undefined;
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
  filter: { car: CarInfo | undefined; tags: Tags };
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

  const setCar = async (name: CarInfo | undefined) => {
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
      },
    },
  };
}

export default useCarAndTagFilter;
