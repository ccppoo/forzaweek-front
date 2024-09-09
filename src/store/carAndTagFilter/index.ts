import { atomFamily, useRecoilState } from 'recoil';

import { CarActions, TagActions } from './types';

export type TagID = string;
export type CarID = string;
type CarTagFilter = {
  tagIDs: TagID[];
  carID: CarID | undefined;
};

const carTagFilterDefault: CarTagFilter = {
  tagIDs: [],
  carID: undefined,
};

const carTagFilterStateFamily = atomFamily<CarTagFilter, string>({
  key: 'car-tag-filter-state',
  default: carTagFilterDefault,
});

function useCarAndTagFilter(scope: string): {
  filter: { carID: CarID | undefined; tagIDs: TagID[] };
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

  const setCar = async (carID: CarID | undefined) => {
    console.log(`set carID : ${carID}`);
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        carID: carID,
      };
    });
  };

  const removeCar = () => {
    setCarTagFilterOptions((prev) => {
      return {
        ...prev,
        carID: undefined,
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
