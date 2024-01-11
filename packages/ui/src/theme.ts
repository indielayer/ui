import type { ColorLibrary } from './composables/useColors'
import type {
  AlertTheme,
  AvatarTheme,
  BadgeTheme,
  BreadcrumbsTheme,
  ButtonTheme,
  ButtonGroupTheme,
  CardTheme,
  CheckboxTheme,
  CollapseTheme,
  ContainerTheme,
  DividerTheme,
  DrawerTheme,
  FormTheme,
  IconTheme,
  ImageTheme,
  InputTheme,
  InputFooterTheme,
  LinkTheme,
  LoaderTheme,
  MenuTheme,
  MenuItemTheme,
  ModalTheme,
  NotificationsTheme,
  PaginationTheme,
  PaginationItemTheme,
  PopoverTheme,
  PopoverContainerTheme,
  ProgressTheme,
  RadioTheme,
  ScrollTheme,
  SelectTheme,
  SkeletonTheme,
  SliderTheme,
  TabTheme,
  TabGroupTheme,
  TableTheme,
  TableCellTheme,
  TagTheme,
  TextareaTheme,
  ToggleTheme,
} from './components'

export type ComponentThemes = {
  Alert: AlertTheme;
  Avatar: AvatarTheme;
  Badge: BadgeTheme;
  Breadcrumbs: BreadcrumbsTheme;
  Button: ButtonTheme;
  ButtonGroup: ButtonGroupTheme;
  Card: CardTheme;
  Checkbox: CheckboxTheme;
  Collapse: CollapseTheme;
  Container: ContainerTheme;
  Divider: DividerTheme;
  Drawer: DrawerTheme;
  Form: FormTheme;
  Icon: IconTheme;
  Image: ImageTheme;
  Input: InputTheme;
  InputFooter: InputFooterTheme;
  Link: LinkTheme;
  Loader: LoaderTheme;
  Menu: MenuTheme;
  MenuItem: MenuItemTheme;
  Modal: ModalTheme;
  Notifications: NotificationsTheme;
  Pagination: PaginationTheme;
  PaginationItem: PaginationItemTheme;
  Popover: PopoverTheme;
  PopoverContainer: PopoverContainerTheme;
  Progress: ProgressTheme;
  Radio: RadioTheme;
  Scroll: ScrollTheme;
  Select: SelectTheme;
  Skeleton: SkeletonTheme;
  Slider: SliderTheme;
  Tab: TabTheme;
  TabGroup: TabGroupTheme;
  Table: TableTheme;
  TableCell: TableCellTheme;
  Tag: TagTheme;
  Textarea: TextareaTheme;
  Toggle: ToggleTheme;
}

export type UITheme = {
  name?: string;
  classPrefix?: string;
  components?: ComponentThemes;
  colors?: ColorLibrary;
  styles?: string;
  rtl?: boolean;
}

export function injectThemeStyles(name: string, styles: string) {
  if (typeof window !== 'undefined') {
    const el = document.querySelector('style[data-theme-style]')

    if (el) {
      el.setAttribute('data-theme-style', name)
      el.textContent = styles
    } else {
      const themeStyle: HTMLStyleElement = document.createElement('style')

      themeStyle.setAttribute('data-theme-style', name)
      themeStyle.textContent = styles

      document.head.appendChild(themeStyle)
    }
  }
}
