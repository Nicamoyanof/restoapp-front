export type MenuItemType = {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  link?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  isDisabled?: boolean;
  collapsed?: boolean;
  submenu?: MenuItemType[];
};

export type SubMenus = {
  item: MenuItemType;
  linkClassName?: string;
  subMenuClassName?: string;
  activeMenuItems?: Array<string>;
  toggleMenu?: (item: MenuItemType, status: boolean) => void;
  className?: string;
};
export const MENU = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/index',
    badge: {
      variant: 'success',
      text: '9+',
    },
  },
  {
    key: 'orders',
    label: 'Orders',
    icon: 'ri-shopping-cart-line',
    link: '/orders',
  },
  {
    key: 'products',
    label: 'Productos',
    icon: 'ri-shopping-basket-2-line',
    collapsed: true,
    submenu: [
      {
        key: 'product-listing',
        label: 'Listado de Productos',
        link: '/product/listing',
        parentKey: 'products',
      },
      {
        key: 'product-add-edit',
        label: 'Agregar Producto',
        link: '/product/add-edit',
        parentKey: 'products',
      },
    ],
  },
  {
    key: 'categories',
    label: 'Categorías',
    icon: 'ri-equalizer-2-line',
    collapsed: true,
    submenu: [
      {
        key: 'categories-listing',
        label: 'Listado',
        link: '/categories/listing',
        parentKey: 'categories',
      },
      {
        key: 'categories-add-edit',
        label: 'Agregar Categoría',
        link: '/categories/add-edit',
        parentKey: 'categories',
      },
    ],
  },
  {
    key: 'customers',
    label: 'Customers',
    icon: 'ri-group-2-line',
    link: '/customers',
  },
  {
    key: 'menu-cards',
    label: 'Menu Cards',
    icon: 'ri-restaurant-line',
    link: '/menu-cards',
  },
  {
    key: 'pos',
    label: 'POS',
    icon: 'ri-mac-line',
    link: '/pos',
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: 'ri-bar-chart-box-ai-line',
    link: '/reports',
  },
  {
    key: 'riders',
    label: 'Riders',
    icon: 'ri-motorbike-line',
    link: '/riders',
  },
  {
    key: 'offers',
    label: 'Offers',
    icon: 'ri-discount-percent-line',
    link: '/offers',
  },
  {
    key: 'locations',
    label: 'Locations',
    icon: 'ri-map-pin-range-line',
    link: '/locations',
  },
  {
    key: 'media',
    label: 'Media',
    icon: 'ri-image-circle-ai-line',
    link: '/media',
  },
  {
    key: 'settings',
    label: 'Store Settings',
    icon: 'ri-store-3-line',
    link: '/settings',
  },
  {
    key: 'todo',
    label: 'Todo',
    icon: 'ri-task-line',
    link: '/todo',
  },
  {
    key: 'manage-apps',
    label: 'Manage Apps',
    icon: 'ri-apps-2-ai-line',
    link: '/manage-apps',
  },
  {
    key: 'invoices',
    label: 'Invoices',
    icon: 'ri-file-list-3-line',
    collapsed: true,
    submenu: [
      {
        key: 'invoices-list',
        label: 'Invoices',
        link: '/invoices',
        parentKey: 'invoices',
      },
      {
        key: 'invoice-details',
        label: 'Invoice Details',
        link: '/invoice-details',
        parentKey: 'invoices',
      },
    ],
  },

  {
    key: 'pages',
    label: 'Pages',
    icon: 'ri-pages-line',
    collapsed: true,
    submenu: [
      {
        key: 'pages-welcome',
        label: 'Welcome',
        link: '/pages/starter',
        parentKey: 'pages',
      },
      {
        key: 'pages-profile',
        label: 'Profile',
        link: '/pages/profile',
        parentKey: 'pages',
      },
      {
        key: 'pages-faqs',
        label: 'FAQs',
        link: '/pages/faqs',
        parentKey: 'pages',
      },
      {
        key: 'pages-gallery',
        label: 'Gallery',
        link: '/pages/gallery',
        parentKey: 'pages',
      },
      {
        key: 'pages-comingsoon',
        label: 'Coming Soon',
        link: '/pages/comingsoon',
        parentKey: 'pages',
      },
      {
        key: 'pages-timeline',
        label: 'Timeline',
        link: '/pages/timeline',
        parentKey: 'pages',
      },
      {
        key: 'pages-pricing',
        label: 'Pricing',
        link: '/pages/pricing',
        parentKey: 'pages',
      },
      {
        key: 'pages-maintenance',
        label: 'Maintenance',
        link: '/pages/maintenance',
        parentKey: 'pages',
      },
      {
        key: 'pages-404',
        label: '404 Error',
        link: '/pages/404',
        parentKey: 'pages',
      },
    ],
  },
  {
    key: 'authentication',
    label: 'Authentication',
    icon: 'ri-shield-user-line',
    collapsed: true,
    submenu: [
      {
        key: 'auth-signin',
        label: 'Sign In',
        link: '/auth/signin',
        parentKey: 'authentication',
      },
      {
        key: 'auth-signup',
        label: 'Sign Up',
        link: '/auth/signup',
        parentKey: 'authentication',
      },
      {
        key: 'auth-password',
        label: 'Reset Password',
        link: '/auth/password',
        parentKey: 'authentication',
      },
      {
        key: 'auth-lockscreen',
        label: 'Lock Screen',
        link: '/auth/lock-screen',
        parentKey: 'authentication',
      },
    ],
  },
  {
    key: '/ui/components',
    label: '❋ UI Components ❋',
    isTitle: true,
  },
  {
    key: 'components',
    label: 'Components',
    icon: 'ri-shapes-line',
    link: '/ui/accordion',
  },
];

export const COMPONENT_MENU = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    link: '/',
  },
  {
    key: 'base-ui',
    label: 'Base UI',
    icon: 'ri-fire-line',
    collapsed: true,
    submenu: [
      {
        key: 'accordion',
        label: 'Accordion',
        link: '/ui/accordion',
        parentKey: 'base-ui',
      },
      {
        key: 'alerts',
        label: 'Alerts',
        link: '/ui/alerts',
        parentKey: 'base-ui',
      },
      {
        key: 'avatar',
        label: 'Avatar',
        link: '/ui/avatar',
        parentKey: 'base-ui',
      },
      { key: 'badge', label: 'Badge', link: '/ui/badge', parentKey: 'base-ui' },
      {
        key: 'breadcrumb',
        label: 'Breadcrumb',
        link: '/ui/breadcrumb',
        parentKey: 'base-ui',
      },
      {
        key: 'buttons',
        label: 'Buttons',
        link: '/ui/buttons',
        parentKey: 'base-ui',
      },
      { key: 'card', label: 'Card', link: '/ui/card', parentKey: 'base-ui' },
      {
        key: 'carousel',
        label: 'Carousel',
        link: '/ui/carousel',
        parentKey: 'base-ui',
      },
      {
        key: 'collapse',
        label: 'Collapse',
        link: '/ui/collapse',
        parentKey: 'base-ui',
      },
      {
        key: 'dropdown',
        label: 'Dropdown',
        link: '/ui/dropdown',
        parentKey: 'base-ui',
      },
      {
        key: 'list-group',
        label: 'List Group',
        link: '/ui/list-group',
        parentKey: 'base-ui',
      },
      { key: 'modal', label: 'Modal', link: '/ui/modal', parentKey: 'base-ui' },
      { key: 'tabs', label: 'Tabs', link: '/ui/tabs', parentKey: 'base-ui' },
      {
        key: 'offcanvas',
        label: 'Offcanvas',
        link: '/ui/offcanvas',
        parentKey: 'base-ui',
      },
      {
        key: 'pagination',
        label: 'Pagination',
        link: '/ui/pagination',
        parentKey: 'base-ui',
      },
      {
        key: 'placeholders',
        label: 'Placeholders',
        link: '/ui/placeholders',
        parentKey: 'base-ui',
      },
      {
        key: 'popovers',
        label: 'Popovers',
        link: '/ui/popovers',
        parentKey: 'base-ui',
      },
      {
        key: 'progress',
        label: 'Progress',
        link: '/ui/progress',
        parentKey: 'base-ui',
      },
      {
        key: 'scrollspy',
        label: 'Scrollspy',
        link: '/ui/scrollspy',
        parentKey: 'base-ui',
      },
      {
        key: 'spinners',
        label: 'Spinners',
        link: '/ui/spinners',
        parentKey: 'base-ui',
      },
      {
        key: 'toasts',
        label: 'Toasts',
        link: '/ui/toasts',
        parentKey: 'base-ui',
      },
      {
        key: 'tooltips',
        label: 'Tooltips',
        link: '/ui/tooltips',
        parentKey: 'base-ui',
      },
    ],
  },
  {
    key: 'advanced-ui',
    label: 'Advanced UI',
    icon: 'ri-magic-line',
    collapsed: true,
    submenu: [
      {
        key: 'ratings',
        label: 'Ratings',
        link: '/extended/ratings',
        parentKey: 'advanced-ui',
      },
      {
        key: 'sweet-alert',
        label: 'Sweet Alert',
        link: '/extended/sweetalert',
        parentKey: 'advanced-ui',
      },
      {
        key: 'scrollbar',
        label: 'Scrollbar',
        link: '/extended/scrollbar',
        parentKey: 'advanced-ui',
      },
      {
        key: 'toastify',
        label: 'Toastify',
        link: '/extended/toastify',
        parentKey: 'advanced-ui',
      },
    ],
  },
  {
    key: 'charts',
    label: 'Charts',
    icon: 'ri-bar-chart-line',
    collapsed: true,
    submenu: [
      { key: 'area', label: 'Area', link: '/charts/area', parentKey: 'charts' },
      { key: 'bar', label: 'Bar', link: '/charts/bar', parentKey: 'charts' },
      {
        key: 'bubble',
        label: 'Bubble',
        link: '/charts/bubble',
        parentKey: 'charts',
      },
      {
        key: 'candlestick',
        label: 'Candlestick',
        link: '/charts/candlestick',
        parentKey: 'charts',
      },
      {
        key: 'column',
        label: 'Column',
        link: '/charts/column',
        parentKey: 'charts',
      },
      {
        key: 'heatmap',
        label: 'Heatmap',
        link: '/charts/heatmap',
        parentKey: 'charts',
      },
      { key: 'line', label: 'Line', link: '/charts/line', parentKey: 'charts' },
      {
        key: 'mixed',
        label: 'Mixed',
        link: '/charts/mixed',
        parentKey: 'charts',
      },
      {
        key: 'timeline',
        label: 'Timeline',
        link: '/charts/timeline',
        parentKey: 'charts',
      },
      {
        key: 'boxplot',
        label: 'Boxplot',
        link: '/charts/boxplot',
        parentKey: 'charts',
      },
      {
        key: 'treemap',
        label: 'Treemap',
        link: '/charts/treemap',
        parentKey: 'charts',
      },
      { key: 'pie', label: 'Pie', link: '/charts/pie', parentKey: 'charts' },
      {
        key: 'radar',
        label: 'Radar',
        link: '/charts/radar',
        parentKey: 'charts',
      },
      {
        key: 'radialbar',
        label: 'Radialbar',
        link: '/charts/radialbar',
        parentKey: 'charts',
      },
      {
        key: 'scatter',
        label: 'Scatter',
        link: '/charts/scatter',
        parentKey: 'charts',
      },
      {
        key: 'polararea',
        label: 'Polar Area',
        link: '/charts/polararea',
        parentKey: 'charts',
      },
    ],
  },
  {
    key: 'forms',
    label: 'Forms',
    icon: 'ri-file-list-line',
    collapsed: true,
    submenu: [
      {
        key: 'basic-elements',
        label: 'Basic Elements',
        link: '/forms/basic',
        parentKey: 'forms',
      },
      {
        key: 'checkbox-radio',
        label: 'Checkbox & Radio',
        link: '/forms/checkbox-radio',
        parentKey: 'forms',
      },
      {
        key: 'choices',
        label: 'Choice Select',
        link: '/forms/choices',
        parentKey: 'forms',
      },
      {
        key: 'clipboard',
        label: 'Clipboard',
        link: '/forms/clipboard',
        parentKey: 'forms',
      },
      {
        key: 'flatpickr',
        label: 'Flatpickr',
        link: '/forms/flatpickr',
        parentKey: 'forms',
      },
      {
        key: 'validation',
        label: 'Validation',
        link: '/forms/validation',
        parentKey: 'forms',
      },
      {
        key: 'fileupload',
        label: 'Fileupload',
        link: '/forms/fileupload',
        parentKey: 'forms',
      },
      {
        key: 'editors',
        label: 'Editors',
        link: '/forms/editors',
        parentKey: 'forms',
      },
      {
        key: 'inputmask',
        label: 'Inputmask',
        link: '/forms/inputmask',
        parentKey: 'forms',
      },
      {
        key: 'slider',
        label: 'Slider',
        link: '/forms/slider',
        parentKey: 'forms',
      },
    ],
  },
  {
    key: 'tables',
    label: 'Tables',
    icon: 'ri-table-line',
    collapsed: true,
    submenu: [
      {
        key: 'basic-tables',
        label: 'Basic Tables',
        link: '/tables/basic',
        parentKey: 'tables',
      },
      {
        key: 'grid-js',
        label: 'Grid Js',
        link: '/tables/gridjs',
        parentKey: 'tables',
      },
    ],
  },
  {
    key: 'icons',
    label: 'Icons',
    icon: 'ri-gallery-line',
    collapsed: true,
    submenu: [
      {
        key: 'boxicons',
        label: 'Boxicons',
        link: '/icons/boxicons',
        parentKey: 'icons',
      },
      {
        key: 'solar-icons',
        label: 'Solar Icons',
        link: '/icons/solar',
        parentKey: 'icons',
      },
    ],
  },
  {
    key: 'maps',
    label: 'Maps',
    icon: 'ri-map-pin-line',
    collapsed: true,
    submenu: [
      {
        key: 'google-maps',
        label: 'Google Maps',
        link: '/maps/google',
        parentKey: 'maps',
      },
      {
        key: 'vector-maps',
        label: 'Vector Maps',
        link: '/maps/vector',
        parentKey: 'maps',
      },
    ],
  },
  {
    key: 'badge-menu',
    label: 'Badge Menu',
    icon: 'ri-football-line',
    link: '/badge-menu',
    badge: {
      variant: 'primary',
      text: '1',
    },
  },
  {
    key: 'menu-item',
    label: 'Menu Item',
    icon: 'ri-share-line',
    collapsed: true,
    submenu: [
      {
        key: 'menu-item-1',
        label: 'Menu Item 1',
        link: '#',
        parentKey: 'menu-item',
      },
      {
        key: 'menu-item-2',
        label: 'Menu Item 2',
        collapsed: true,
        parentKey: 'menu-item',
        submenu: [
          {
            key: 'menu-sub-item',
            label: 'Menu Sub Item',
            link: '#',
            parentKey: 'menu-item-2',
          },
        ],
      },
    ],
  },
];
