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
    label: 'Vista Cocina',
    icon: 'ri-mac-line',
    link: '/orders',
  },
  {
    key: 'restaurant-tables',
    label: 'Mesas',
    icon: 'ri-restaurant-line',
    link: '/restaurant-tables',
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
        link: '/product/add',
        parentKey: 'products',
      },
      {
        key: 'ingredients-listing',
        label: 'Listado de Ingredientes',
        link: '/ingredients/listing',
        parentKey: 'products',
      },
      {
        key: 'ingredients-add-edit',
        label: 'Agregar Ingrediente',
        link: '/ingredients/add',
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
    key: 'payment-methods',
    label: 'Métodos de Pago',
    icon: 'bx  bx-credit-card',
    link: '/payment-methods',
  },
  {
    key: 'order-historical',
    label: 'Pedidos Históricos',
    icon: 'ri-shopping-cart-line',
    link: '/order-historical',
  },
  {
    key: 'settings',
    label: 'Configuración',
    icon: 'ri-store-3-line',
    collapsed: true,
    submenu: [
      {
        key: 'settings-store',
        label: 'Tienda',
        link: '/settings',
        parentKey: 'settings',
      },
      {
        key: 'settings-kitchen',
        label: 'Cocina',
        link: '/settings/kitchen',
        parentKey: 'settings',
      },
    ],
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
