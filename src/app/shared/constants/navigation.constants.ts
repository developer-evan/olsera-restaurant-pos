import { NavSection } from '../models';

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Menu',
    items: [
      { label: 'Overview', route: '/overview', icon: 'overview', permission: 'analytics:read' },
      { label: 'Orders', route: '/orders', icon: 'orders', permission: 'orders:read' },
      {
        label: 'Transactions',
        route: '/transactions',
        icon: 'transactions',
        permission: 'transactions:read',
      },
      {
        label: 'Analytics',
        route: '/analytics',
        icon: 'analytics',
        permission: 'analytics:read',
        hasChildren: true,
      },
    ],
  },
  {
    title: 'Inventory',
    items: [
      { label: 'Products', route: '/products', icon: 'products', permission: 'products:read' },
      {
        label: 'Categories',
        route: '/categories',
        icon: 'categories',
        permission: 'categories:read',
      },
      { label: 'Promo', route: '/promo', icon: 'promo', permission: 'promos:read' },
    ],
  },
  {
    title: 'Others',
    items: [
      { label: 'Settings', route: '/settings', icon: 'settings', permission: 'stores:read' },
      { label: 'Integrations', route: '/integrations', icon: 'integrations' },
    ],
  },
];

export const FOOTER_LINKS = [
  { label: 'Feedback', icon: 'feedback' as const },
  { label: 'Help & Center', icon: 'help' as const },
];
