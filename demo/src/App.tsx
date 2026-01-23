import { createSignal, onMount, lazy, Suspense } from 'solid-js';
import { Router, Route, useNavigate } from '@solidjs/router';
import { version } from '../../package.json';
import {
  Button,
  GlassBackground,
  ToastContainer,
  SnackbarContainer,
  useIsDark,
  Skeleton,
  CommandPalette,
  type CommandPaletteItemType,
} from 'glass-ui-solid';
import DocSidebar from './components/DocSidebar';
import { navigation } from './config/navigation';

// Pages
const Home = lazy(() => import('./pages/Home'));

// Layout pages
const CardPage = lazy(() => import('./pages/layout/Card'));
const SectionPage = lazy(() => import('./pages/layout/Section'));
const AccordionPage = lazy(() => import('./pages/layout/Accordion'));
const ModalPage = lazy(() => import('./pages/layout/Modal'));
const DialogPage = lazy(() => import('./pages/layout/Dialog'));
const DrawerPage = lazy(() => import('./pages/layout/Drawer'));
const SheetPage = lazy(() => import('./pages/layout/Sheet'));
const DividerPage = lazy(() => import('./pages/layout/Divider'));
const CollapsiblePage = lazy(() => import('./pages/layout/Collapsible'));
const SidebarPage = lazy(() => import('./pages/layout/Sidebar'));
const NavbarPage = lazy(() => import('./pages/layout/Navbar'));
const WindowPage = lazy(() => import('./pages/layout/Window'));

// Forms pages
const ButtonPage = lazy(() => import('./pages/forms/Button'));
const InputPage = lazy(() => import('./pages/forms/Input'));
const TextareaPage = lazy(() => import('./pages/forms/Textarea'));
const SelectPage = lazy(() => import('./pages/forms/Select'));
const CheckboxPage = lazy(() => import('./pages/forms/Checkbox'));
const RadioGroupPage = lazy(() => import('./pages/forms/RadioGroup'));
const SwitchPage = lazy(() => import('./pages/forms/Switch'));
const SliderPage = lazy(() => import('./pages/forms/Slider'));
const AutocompletePage = lazy(() => import('./pages/forms/Autocomplete'));
const DatePickerPage = lazy(() => import('./pages/forms/DatePicker'));
const NumberInputPage = lazy(() => import('./pages/forms/NumberInput'));
const FileUploadPage = lazy(() => import('./pages/forms/FileUpload'));
const StepperPage = lazy(() => import('./pages/forms/Stepper'));
const JsonSchemaFormPage = lazy(() => import('./pages/forms/JsonSchemaForm'));

// Feedback pages
const AlertPage = lazy(() => import('./pages/feedback/Alert'));
const ProgressPage = lazy(() => import('./pages/feedback/Progress'));
const SkeletonPage = lazy(() => import('./pages/feedback/Skeleton'));
const SpinnerPage = lazy(() => import('./pages/feedback/Spinner'));
const ErrorDisplayPage = lazy(() => import('./pages/feedback/ErrorDisplay'));
const SnackbarPage = lazy(() => import('./pages/feedback/Snackbar'));
const ToastPage = lazy(() => import('./pages/feedback/Toast'));
const EmptyStatePage = lazy(() => import('./pages/feedback/EmptyState'));
const ChatPage = lazy(() => import('./pages/feedback/Chat'));

// Navigation pages
const TabsPage = lazy(() => import('./pages/navigation/Tabs'));
const SegmentedControlPage = lazy(() => import('./pages/navigation/SegmentedControl'));
const BreadcrumbPage = lazy(() => import('./pages/navigation/Breadcrumb'));
const PaginationPage = lazy(() => import('./pages/navigation/Pagination'));
const MenuPage = lazy(() => import('./pages/navigation/Menu'));
const DropdownPage = lazy(() => import('./pages/navigation/Dropdown'));
const ContextMenuPage = lazy(() => import('./pages/navigation/ContextMenu'));
const CommandPalettePage = lazy(() => import('./pages/navigation/CommandPalette'));

// Data Display pages
const TablePage = lazy(() => import('./pages/data/Table'));
const BadgePage = lazy(() => import('./pages/data/Badge'));
const ChipPage = lazy(() => import('./pages/data/Chip'));
const AvatarPage = lazy(() => import('./pages/data/Avatar'));
const TooltipPage = lazy(() => import('./pages/data/Tooltip'));
const PopoverPage = lazy(() => import('./pages/data/Popover'));
const HoverCardPage = lazy(() => import('./pages/data/HoverCard'));
const CodeBlockPage = lazy(() => import('./pages/data/CodeBlock'));
const JsonViewerPage = lazy(() => import('./pages/data/JsonViewer'));
const MarkdownPage = lazy(() => import('./pages/data/Markdown'));
const VirtualListPage = lazy(() => import('./pages/data/VirtualList'));
const VirtualTablePage = lazy(() => import('./pages/data/VirtualTable'));

function PageLoader() {
  return (
    <div class="space-y-4">
      <Skeleton width="200px" height="32px" />
      <Skeleton width="100%" height="100px" />
      <Skeleton width="100%" height="200px" />
    </div>
  );
}

function Layout(props: { children: any }) {
  const isDark = useIsDark();
  const navigate = useNavigate();

  const prefersDarkMode = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const [darkMode, setDarkMode] = createSignal(prefersDarkMode());

  onMount(() => {
    if (prefersDarkMode()) {
      document.documentElement.classList.add('dark');
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode());
    document.documentElement.classList.toggle('dark');
  };

  // Build command palette items from navigation
  const commandPaletteItems: CommandPaletteItemType<string>[] = [
    {
      id: 'home',
      label: 'Home',
      description: 'Go to home page',
      keywords: ['accueil', 'start', 'index'],
      data: '/',
    },
    ...navigation.flatMap((group) =>
      group.items.map((item) => ({
        id: item.id,
        label: item.label,
        description: `${group.label} component`,
        keywords: [group.label.toLowerCase(), item.label.toLowerCase()],
        group: group.label,
        data: item.path,
      }))
    ),
  ];

  const handleCommandSelect = (item: CommandPaletteItemType<string>) => {
    if (item.data) {
      navigate(item.data);
    }
  };

  return (
    <GlassBackground>
      <ToastContainer />
      <SnackbarContainer />
      <CommandPalette
        items={commandPaletteItems}
        onSelect={handleCommandSelect}
        placeholder="Search components... (⌘K)"
      />

      {/* Header */}
      <header class="glass-navbar sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-accent-500 flex items-center justify-center shadow-lg shadow-accent-500/20">
              <span class="text-white font-black text-xl leading-none">G</span>
            </div>
            <h1 class="text-lg font-bold text-surface-900 dark:text-white tracking-tight">
              Glass UI
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 glass-button rounded-lg text-[10px] font-bold">
              <span class="opacity-50">COMMAND</span>
              <span class="text-xs">K</span>
            </div>
            <span class="text-xs font-medium text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded-md">v{version}</span>
            <div class="h-6 w-[1px] bg-surface-200 dark:bg-surface-800 mx-1"></div>
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} class="rounded-full w-9 h-9 p-0 flex items-center justify-center">
              {darkMode() ? (
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              ) : (
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div class="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <DocSidebar />

        <main class="flex-1 min-w-0">
          <Suspense fallback={<PageLoader />}>
            {props.children}
          </Suspense>
        </main>
      </div>
    </GlassBackground>
  );
}

// Get base path from Vite config (set during build)
const basePath = import.meta.env.BASE_URL;

export default function App() {
  return (
    <Router root={Layout} base={basePath}>
      <Route path="/" component={Home} />

      {/* Layout */}
      <Route path="/layout/card" component={CardPage} />
      <Route path="/layout/section" component={SectionPage} />
      <Route path="/layout/accordion" component={AccordionPage} />
      <Route path="/layout/modal" component={ModalPage} />
      <Route path="/layout/dialog" component={DialogPage} />
      <Route path="/layout/drawer" component={DrawerPage} />
      <Route path="/layout/sheet" component={SheetPage} />
      <Route path="/layout/divider" component={DividerPage} />
      <Route path="/layout/collapsible" component={CollapsiblePage} />
      <Route path="/layout/sidebar" component={SidebarPage} />
      <Route path="/layout/navbar" component={NavbarPage} />
      <Route path="/layout/window" component={WindowPage} />

      {/* Forms */}
      <Route path="/forms/button" component={ButtonPage} />
      <Route path="/forms/input" component={InputPage} />
      <Route path="/forms/textarea" component={TextareaPage} />
      <Route path="/forms/select" component={SelectPage} />
      <Route path="/forms/checkbox" component={CheckboxPage} />
      <Route path="/forms/radio-group" component={RadioGroupPage} />
      <Route path="/forms/switch" component={SwitchPage} />
      <Route path="/forms/slider" component={SliderPage} />
      <Route path="/forms/autocomplete" component={AutocompletePage} />
      <Route path="/forms/date-picker" component={DatePickerPage} />
      <Route path="/forms/number-input" component={NumberInputPage} />
      <Route path="/forms/file-upload" component={FileUploadPage} />
      <Route path="/forms/stepper" component={StepperPage} />
      <Route path="/forms/json-schema-form" component={JsonSchemaFormPage} />

      {/* Feedback */}
      <Route path="/feedback/alert" component={AlertPage} />
      <Route path="/feedback/progress" component={ProgressPage} />
      <Route path="/feedback/skeleton" component={SkeletonPage} />
      <Route path="/feedback/spinner" component={SpinnerPage} />
      <Route path="/feedback/error-display" component={ErrorDisplayPage} />
      <Route path="/feedback/snackbar" component={SnackbarPage} />
      <Route path="/feedback/toast" component={ToastPage} />
      <Route path="/feedback/empty-state" component={EmptyStatePage} />
      <Route path="/feedback/chat" component={ChatPage} />

      {/* Navigation */}
      <Route path="/navigation/tabs" component={TabsPage} />
      <Route path="/navigation/segmented-control" component={SegmentedControlPage} />
      <Route path="/navigation/breadcrumb" component={BreadcrumbPage} />
      <Route path="/navigation/pagination" component={PaginationPage} />
      <Route path="/navigation/menu" component={MenuPage} />
      <Route path="/navigation/dropdown" component={DropdownPage} />
      <Route path="/navigation/context-menu" component={ContextMenuPage} />
      <Route path="/navigation/command-palette" component={CommandPalettePage} />

      {/* Data Display */}
      <Route path="/data/table" component={TablePage} />
      <Route path="/data/badge" component={BadgePage} />
      <Route path="/data/chip" component={ChipPage} />
      <Route path="/data/avatar" component={AvatarPage} />
      <Route path="/data/tooltip" component={TooltipPage} />
      <Route path="/data/popover" component={PopoverPage} />
      <Route path="/data/hover-card" component={HoverCardPage} />
      <Route path="/data/code-block" component={CodeBlockPage} />
      <Route path="/data/json-viewer" component={JsonViewerPage} />
      <Route path="/data/markdown" component={MarkdownPage} />
      <Route path="/data/virtual-list" component={VirtualListPage} />
      <Route path="/data/virtual-table" component={VirtualTablePage} />
    </Router>
  );
}
