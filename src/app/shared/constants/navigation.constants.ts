import { NavSection } from '../models';

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Menu',
    items: [
      { label: 'Overview', route: '/overview', icon: 'overview' },
      { label: 'Orders', route: '/orders', icon: 'orders' },
      { label: 'Transactions', route: '/transactions', icon: 'transactions' },
      { label: 'Analytics', route: '/analytics', icon: 'analytics', hasChildren: true },
    ],
  },
  {
    title: 'Inventory',
    items: [
      { label: 'Products', route: '/products', icon: 'products' },
      { label: 'Categories', route: '/categories', icon: 'categories' },
      { label: 'Promo', route: '/promo', icon: 'promo' },
    ],
  },
  {
    title: 'Others',
    items: [
      { label: 'Settings', route: '/settings', icon: 'settings' },
      { label: 'Integrations', route: '/integrations', icon: 'integrations' },
    ],
  },
];

export const FOOTER_LINKS = [
  { label: 'Feedback', icon: 'feedback' as const },
  { label: 'Help & Center', icon: 'help' as const },
];

export const STORE_PROFILE = {
  initials: 'AC',
  label: 'Store',
  name: 'Ali Coffee & Eatery',
};
