import { BlockToolConstructorOptions } from '@editorjs/editorjs/types/tools';
import type { NestedListParams } from '@editorjs/nested-list';
import NestedList from '@editorjs/nested-list';

type ListDataStyle = 'ordered' | 'unordered';
interface ListItem {
  content: string;
  items: ListItem[];
}
interface ListData {
  style: ListDataStyle;
  items: ListItem[];
}
interface NestedListConfig {
  defaultStyle?: ListDataStyle;
}

function isHtmlElement(node: Node): boolean {
  return node instanceof HTMLElement;
}

interface NestedListCustomParams {
  maxDepth?: number;
}

export type _NestedListParams = BlockToolConstructorOptions<
  ListData,
  NestedListConfig & NestedListCustomParams
>;

export default class LimitedNestedList extends NestedList {
  // constructor({ data, config, api, readOnly }: NestedListParams);
  constructor({ data, config: _config, api, readOnly }: _NestedListParams) {
    const { maxDepth, ...config } = _config;
    super({ data, config, api, readOnly } as NestedListParams);

    if (!maxDepth || maxDepth < 1) {
      // min : 1 (could nest like : 1.1, 1.2, 2.1, 2.2, ... )
      // default : 2 (could nest like : 1.1.1, 1.2.3, ... )
      this.maxDepth = 2;
      return;
    }
    this.maxDepth = maxDepth;
  }

  private maxDepth: number;

  addTab(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();

    // class : ce-block__content를 찾을 때가지 recursive
    const currentItem = this.currentItem;
    if (!currentItem) {
      return;
    }
    const prevItem = currentItem.previousSibling;
    if (!prevItem) {
      return;
    }
    if (!isHtmlElement(prevItem)) {
      return;
    }
    const isFirstChild = !prevItem;

    if (isFirstChild) {
      return;
    }

    const maxHTMLDepth = 2 + 3 * (this.maxDepth - 1); // 0, 2, 5, 8, 11, ...
    const rootName = 'ce-block__content';
    let HTMLDepth = 0;
    let element: Element | null = currentItem;
    while (element?.className !== rootName) {
      element = element?.parentElement || null;
      HTMLDepth += 1;
      if (HTMLDepth > maxHTMLDepth) return;
    }

    return super.addTab(event);
  }
}
