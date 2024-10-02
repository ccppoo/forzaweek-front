import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { AddNewTag, EditTag, GetTagByID2 } from '@/api/tag/tag';

import TagEditor from './TagEditor';

type TagWriteParam = {
  tagID?: string;
};

export default function TagWrite() {
  const { tagID } = useParams<TagWriteParam>();

  const { data: tagData } = useQuery({
    queryKey: ['get tag', tagID!],
    queryFn: GetTagByID2,
    enabled: !!tagID,
  });

  if (!!tagID) {
    if (tagData) return <TagEditor tag={tagData} />;
  }
  return <TagEditor />;
}
