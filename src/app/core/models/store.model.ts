export type StoreMemberRole = 'owner' | 'manager' | 'cashier' | 'kitchen';

export interface UserStoreSummary {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  currency: string;
  timezone: string;
  status: string;
  role: StoreMemberRole;
}

export interface StoreAccessContext {
  storeId: string;
  organizationId: string;
  role: StoreMemberRole;
  permissions: string[];
}

export interface StoreBootstrapResult {
  route: string;
}
