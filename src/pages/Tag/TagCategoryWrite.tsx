import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { GetTagCategoryByID } from '@/api/tag/category';

import TagCategoryEditor from './TagCategoryEditor';

type TagWriteParam = {
  tagCategoryID?: string;
};

export default function TagCategoryWrite() {
  const { tagCategoryID } = useParams<TagWriteParam>();
  console.log(`tagCategoryID :${tagCategoryID}`);
  const { data: tagCategoryData } = useQuery({
    queryKey: ['get tag category', tagCategoryID!],
    queryFn: GetTagCategoryByID,
    enabled: !!tagCategoryID,
  });

  if (!!tagCategoryID) {
    if (tagCategoryData) {
      console.log(`tagCategoryData : ${JSON.stringify(tagCategoryData)}`);
      return <TagCategoryEditor tagCategory={tagCategoryData} />;
    }
  }
  return <TagCategoryEditor />;
}
