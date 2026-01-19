import type { CSSProperties } from 'vue'
import type { TagNames } from '../../types'

export type DynamicRowHeight = {
  getAverageRowHeight(): number;
  getRowHeight(index: number): number | undefined;
  setRowHeight(index: number, size: number): void;
  observeRowElements: (elements: Element[] | NodeListOf<Element>) => () => void;
  cleanup: () => void;
};

type ForbiddenKeys = 'ariaAttributes' | 'index' | 'style';
type ExcludeForbiddenKeys<Type> = {
  [Key in keyof Type]: Key extends ForbiddenKeys ? never : Type[Key];
};

export interface VirtualListProps {
  /**
   * CSS class name.
   */
  class?: string;

  /**
   * Default height of list for initial render.
   * This value is important for server rendering.
   */
  defaultHeight?: number;

  /**
   * Callback notified when the List's outermost HTMLElement resizes.
   * This may be used to (re)scroll a row into view.
   */
  onResize?: (
    size: { height: number; width: number; },
    prevSize: { height: number; width: number; }
  ) => void;

  /**
   * Callback notified when the range of visible rows changes.
   */
  onRowsRendered?: (
    visibleRows: { startIndex: number; stopIndex: number; },
    allRows: { startIndex: number; stopIndex: number; }
  ) => void;

  /**
   * How many additional rows to render outside of the visible area.
   * This can reduce visual flickering near the edges of a list when scrolling.
   */
  overscanCount?: number;

  /**
   * Number of items to be rendered in the list.
   */
  rowCount: number;

  /**
   * Row height; the following formats are supported:
   * - number of pixels (number)
   * - percentage of the grid's current height (string)
   * - function that returns the row height (in pixels) given an index and `cellProps`
   * - dynamic row height cache returned by the `useDynamicRowHeight` hook
   *
   * ⚠️ Dynamic row heights are not as efficient as predetermined sizes.
   * It's recommended to provide your own height values if they can be determined ahead of time.
   */
  rowHeight:
  | number
  | string
  | ((index: number, cellProps: Record<string, unknown>) => number)
  | DynamicRowHeight;

  /**
   * Additional props to be passed to the row-rendering component via slots.
   */
  rowProps?: ExcludeForbiddenKeys<Record<string, unknown>>;

  /**
   * Optional CSS properties.
   * The list of rows will fill the height defined by this style.
   */
  style?: CSSProperties;

  /**
   * Can be used to override the root HTML element rendered by the List component.
   * The default value is "div", meaning that List renders an HTMLDivElement as its root.
   *
   * ⚠️ In most use cases the default ARIA roles are sufficient and this prop is not needed.
   */
  tag?: TagNames;
}

export interface RowSlotProps {
  ariaAttributes: {
    'aria-posinset': number;
    'aria-setsize': number;
    role: 'listitem';
  };
  index: number;
  style: CSSProperties;
  props?: Record<string, unknown>;
}

/**
 * Imperative List API.
 */
export interface VirtualListImperativeAPI {
  /**
   * Outermost HTML element for the list if mounted and null (if not mounted.
   */
  readonly element: HTMLDivElement | null;

  /**
   * Scrolls the list so that the specified row is visible.
   *
   * @param align Determines the vertical alignment of the element within the list
   * @param behavior Determines whether scrolling is instant or animates smoothly
   * @param index Index of the row to scroll to (0-based)
   *
   * @throws RangeError if an invalid row index is provided
   */
  scrollToRow(config: {
    align?: 'auto' | 'center' | 'end' | 'smart' | 'start';
    behavior?: 'auto' | 'instant' | 'smooth';
    index: number;
  }): void;
}
