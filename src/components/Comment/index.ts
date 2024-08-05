import taggable from './taggable';
import { TempTaggableComments } from './taggable';
import votable from './votable';
import { TempVotableComments } from './votable';

export default {
  temp: {
    TempTaggableComments,
    TempVotableComments,
  },
  ...taggable,
  ...votable,
};
