import type {
  TagCategoryPopulated,
  TagItemPopulated,
  TagItemPopulatedBase,
  TagSearchQueryResponse,
} from './types';

export function populateTagSearchResult(
  tagSearchQuery: TagSearchQueryResponse,
): TagItemPopulated[] {
  const populated = tagSearchQuery.tags.map(
    ({ id, category: category_id, merged_to: m_tag_id }) => {
      let _tag = {};
      _tag = { ...tagSearchQuery.lookup_tag[id] };
      _tag = { ..._tag, id: id };
      _tag = !!category_id
        ? {
            ..._tag,
            category: {
              ...tagSearchQuery.lookup_category[category_id],
              id: category_id,
            } as TagCategoryPopulated,
          }
        : _tag;
      // TODO: parent tag 불러오기
      if (!!m_tag_id) {
        let m_tag = tagSearchQuery.lookup_tag[m_tag_id]; // id임
        let populated_m_tag = {};
        if (!!m_tag.category && typeof m_tag.category == 'string') {
          const _tag_cat = tagSearchQuery.lookup_category[m_tag.category];
          populated_m_tag = {
            ...m_tag,
            category: _tag_cat,
            id: m_tag_id,
          } as TagItemPopulatedBase;
        }
        _tag = { ..._tag, merged_to: populated_m_tag };
      }

      return _tag as TagItemPopulated;
    },
  );
  return populated;
}
