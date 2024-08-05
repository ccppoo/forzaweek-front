import { useContext, useState } from 'react';

import Pagination from '@mui/material/Pagination';

import { useQuery } from '@tanstack/react-query';

import { getComments } from '@/api/comment';
import { CommentCreateTextArea, CommentOption } from '@/components/Comment/components';
import { CommentContext, commentReadOptionsDefault } from '@/components/Comment/context';
import type { CommentReadOptions, CommentReadOptionsContext } from '@/components/Comment/context';
import type { CommentSortOption } from '@/components/Comment/types';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

import TaggableComment from './Comment';

function CommentDisplayOptions() {
  return (
    <FlexBox sx={{ justifyContent: 'start', alignItems: 'center', columnGap: 0 }}>
      <CommentOption.CommentOptionSort />
    </FlexBox>
  );
}

function TaggableCommentsWithPagination() {
  const { commentReadOptions, setCommentReadOptions } =
    useContext<CommentReadOptionsContext>(CommentContext);
  const [auth] = useAuthState();
  const SUBJECT_ID = commentReadOptions.subject_id!;
  const DISPLAY_PAGE = commentReadOptions.page;
  const DISPLAY_LIMIT = 10;
  const DISPLAY_ORDER = commentReadOptions.order;
  const setPage = (pageNum: number) => setCommentReadOptions('page', pageNum);

  // useQuery :: get Comments, page + limit + order
  // 여기서 받아오는거는 Comment ID -> Comment ID 받은  Comment 컴포넌트가 그걸로 다시 useQuery로 받아오기

  const { data, isSuccess } = useQuery({
    queryKey: [
      'get comments',
      auth.id_token,
      SUBJECT_ID,
      DISPLAY_PAGE,
      DISPLAY_LIMIT,
      DISPLAY_ORDER,
    ],
    queryFn: getComments,
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // TODO: place holder
  if (data) {
    console.log(`data : ${JSON.stringify(data)}`);
    const { comments } = data;
    return (
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
        <FlexBox sx={{ flexDirection: 'column', rowGap: 0.5 }}>
          {comments.map((commentID, i) => {
            return <TaggableComment key={`comment-${i}`} commentID={commentID} />;
          })}
        </FlexBox>
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Pagination count={10} page={DISPLAY_PAGE} onChange={handleChange} />
        </FlexBox>
      </FlexBox>
    );
  }
}

export default function TaggableComments({ subject_to }: { subject_to: string }) {
  const [commentReadOptions, setCommentReadOptions] = useState<CommentReadOptions>({
    ...commentReadOptionsDefault,
    subject_id: subject_to,
  });

  const setCommentReadOption = (option: keyof CommentReadOptions, value: string | number) => {
    switch (option) {
      case 'page': {
        setCommentReadOptions(({ page, ...res }) => {
          return { ...res, page: value as number };
        });
        return;
      }
      case 'order': {
        setCommentReadOptions(({ order, ...res }) => {
          return { ...res, order: value as CommentSortOption };
        });
        return;
      }
    }
  };

  return (
    <CommentContext.Provider
      value={{
        commentReadOptions: commentReadOptions,
        setCommentReadOptions: setCommentReadOption,
      }}
    >
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 2 }}>
        {/* Add Comment */}
        <CommentCreateTextArea placeHolder="comment" />
        {/* Comment sort option and search */}
        <CommentDisplayOptions />
        {/* show comments */}
        <TaggableCommentsWithPagination />
      </FlexBox>
    </CommentContext.Provider>
  );
}

export function TempTaggableComments() {
  return <TaggableComments subject_to={'668e43139fea9e1931a55e8d'} />;
}
