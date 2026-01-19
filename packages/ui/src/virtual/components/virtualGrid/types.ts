import type { CSSProperties } from 'vue'
import type { TagNames } from '../../types'

type ForbiddenKeys = 'ariaAttributes' | 'columnIndex' | 'rowIndex' | 'style';
type ExcludeForbiddenKeys<Type> = {
  [Key in keyof Type]: Key extends ForbiddenKeys ? never : Type[Key];
};

export interface VirtualGridProps {
  /**
   * Additional props to be passed to the cell-rendering component via slots.
   */
  cellProps?: ExcludeForbiddenKeys<Record<string, unknown>>;

  /**
   * CSS class name.
   */
  class?: string;

  /**
   * Number of columns to be rendered in the grid.
   */
  columnCount: number;

  /**
   * Column width; the following formats are supported:
   * - number of pixels (number)
   * - percentage of the grid's current width (string)
   * - function that returns the column width (in pixels) given an index and `cellProps`
   */
  columnWidth:
  | number
  | string
  | ((index: number, cellProps: Record<string, unknown>) => number);

  /**
   * Default height of grid for initial render.
   * This value is important for server rendering.
   */
  defaultHeight?: number;

  /**
   * Default width of grid for initial render.
   * This value is important for server rendering.
   */
  defaultWidth?: number;

  /**
   * Indicates the directionality of grid cells.
   */
  dir?: 'ltr' | 'rtl' | 'auto';

  /**
   * Callback notified when the range of rendered cells changes.
   */
  onCellsRendered?: (
    visibleCells: {
      columnStartIndex: number;
      columnStopIndex: number;
      rowStartIndex: number;
      rowStopIndex: number;
    },
    allCells: {
      columnStartIndex: number;
      columnStopIndex: number;
      rowStartIndex: number;
      rowStopIndex: number;
    }
  ) => void;

  /**
   * Callback notified when the Grid's outermost HTMLElement resizes.
   * This may be used to (re)scroll a cell into view.
   */
  onResize?: (
    size: { height: number; width: number; },
    prevSize: { height: number; width: number; }
  ) => void;

  /**
   * How many additional rows/columns to render outside of the visible area.
   * This can reduce visual flickering near the edges of a grid when scrolling.
   */
  overscanCount?: number;

  /**
   * Number of rows to be rendered in the grid.
   */
  rowCount: number;

  /**
   * Row height; the following formats are supported:
   * - number of pixels (number)
   * - percentage of the grid's current height (string)
   * - function that returns the row height (in pixels) given an index and `cellProps`
   */
  rowHeight: number | string | ((index: number, cellProps: Record<string, unknown>) => number);

  /**
   * Optional CSS properties.
   * The grid of cells will fill the height and width defined by this style.
   */
  style?: CSSProperties;

  /**
   * Can be used to override the root HTML element rendered by the Grid component.
   * The default value is "div", meaning that Grid renders an HTMLDivElement as its root.
   */
  tag?: TagNames;
}

export interface CellSlotProps {
  ariaAttributes: {
    'aria-colindex': number;
    role: 'gridcell';
  };
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  props?: Record<string, unknown>;
}

/**
 * Imperative Grid API.
 */
export interface VirtualGridImperativeAPI {
  /**
   * Outermost HTML element for the grid if mounted and null (if not mounted.
   */
  readonly element: HTMLDivElement | null;

  /**
   * Scrolls the grid so that the specified cell is visible.
   */
  scrollToCell(config: {
    behavior?: ScrollBehavior;
    columnAlign?: 'auto' | 'center' | 'end' | 'smart' | 'start';
    columnIndex: number;
    rowAlign?: 'auto' | 'center' | 'end' | 'smart' | 'start';
    rowIndex: number;
  }): void;

  /**
   * Scrolls the grid so that the specified column is visible.
   */
  scrollToColumn(config: {
    align?: 'auto' | 'center' | 'end' | 'smart' | 'start';
    behavior?: ScrollBehavior;
    index: number;
  }): void;

  /**
   * Scrolls the grid so that the specified row is visible.
   */
  scrollToRow(config: {
    align?: 'auto' | 'center' | 'end' | 'smart' | 'start';
    behavior?: ScrollBehavior;
    index: number;
  }): void;
}
