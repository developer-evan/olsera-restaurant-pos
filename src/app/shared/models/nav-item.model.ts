export type NavIconKey =
  | 'overview'
  | 'orders'
  | 'transactions'
  | 'analytics'
  | 'products'
  | 'categories'
  | 'promo'
  | 'settings'
  | 'integrations'
  | 'feedback'
  | 'help';

export interface NavItem {
  label: string;
  route: string;
  icon: NavIconKey;
  permission?: string;
  hasChildren?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export interface StoreProfile {
  initials: string;
  label: string;
  name: string;
}
