import { taggableComment } from './taggable';
import { votableComment, votableComments, votableMainComment } from './votable';

export default {
  comments: { votableComments },
  comment: {
    votableComment,
    votableMainComment,
    taggableComment,
  },
};