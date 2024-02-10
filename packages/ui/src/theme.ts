import type { ColorLibrary } from './composables/useColors'
import type {
  AccordionTheme,
  AccordionItemTheme,
  AlertTheme,
  AvatarTheme,
  BadgeTheme,
  BreadcrumbsTheme,
  ButtonTheme,
  ButtonGroupTheme,
  CardTheme,
  CarouselTheme,
  CarouselSlideTheme,
  CheckboxTheme,
  ContainerTheme,
  DividerTheme,
  DrawerTheme,
  FormTheme,
  FormGroupTheme,
  IconTheme,
  ImageTheme,
  InputTheme,
  InputFooterTheme,
  LabelTheme,
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
  QrCodeTheme,
  RadioTheme,
  ScrollTheme,
  SelectTheme,
  SkeletonTheme,
  SliderTheme,
  StepperTheme,
  TabTheme,
  TabGroupTheme,
  TableTheme,
  TableCellTheme,
  TableHeadTheme,
  TableHeaderTheme,
  TableRowTheme,
  TagTheme,
  TextareaTheme,
  ToggleTheme,
} from './components'

export type ComponentThemes = {
  Accordion: AccordionTheme;
  AccordionItem: AccordionItemTheme;
  Alert: AlertTheme;
  Avatar: AvatarTheme;
  Badge: BadgeTheme;
  Breadcrumbs: BreadcrumbsTheme;
  Button: ButtonTheme;
  ButtonGroup: ButtonGroupTheme;
  Card: CardTheme;
  Carousel: CarouselTheme;
  CarouselSlide: CarouselSlideTheme;
  Checkbox: CheckboxTheme;
  Container: ContainerTheme;
  Divider: DividerTheme;
  Drawer: DrawerTheme;
  Form: FormTheme;
  FormGroup: FormGroupTheme;
  Icon: IconTheme;
  Image: ImageTheme;
  Input: InputTheme;
  InputFooter: InputFooterTheme;
  Label: LabelTheme;
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
  QrCode: QrCodeTheme;
  Radio: RadioTheme;
  Scroll: ScrollTheme;
  Select: SelectTheme;
  Skeleton: SkeletonTheme;
  Slider: SliderTheme;
  Stepper: StepperTheme;
  Tab: TabTheme;
  TabGroup: TabGroupTheme;
  Table: TableTheme;
  TableCell: TableCellTheme;
  TableHead: TableHeadTheme;
  TableHeader: TableHeaderTheme;
  TableRow: TableRowTheme;
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
