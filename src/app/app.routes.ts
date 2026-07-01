import { Routes } from '@angular/router';

import { authGuard, platformGuard, tenantGuard } from './core/guards/auth.guard';
import {
  dashboardRoleGuard,
  kitchenGuard,
  permissionGuard,
  posGuard,
  storeReadyGuard,
} from './core/guards/store.guard';
import { guestGuard } from './core/guards/guest.guard';
import { DashboardLayoutComponent } from './layout/dashboard/dashboard-layout.component';
import { KitchenLayoutComponent } from './layout/kitchen/kitchen-layout.component';
import { PosLayoutComponent } from './layout/pos/pos-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent,
          ),
      },
    ],
  },
  {
    path: 'platform',
    canActivate: [platformGuard],
    children: [
      { path: '', redirectTo: 'organizations', pathMatch: 'full' },
      {
        path: 'organizations',
        loadComponent: () =>
          import('./features/platform/organizations/platform-organizations.component').then(
            (m) => m.PlatformOrganizationsComponent,
          ),
      },
      {
        path: 'onboarding',
        loadComponent: () =>
          import('./features/platform/onboarding/platform-onboarding.component').then(
            (m) => m.PlatformOnboardingComponent,
          ),
      },
    ],
  },
  {
    path: 'select-store',
    canActivate: [authGuard, tenantGuard],
    loadComponent: () =>
      import('./features/store/select-store/select-store.component').then(
        (m) => m.SelectStoreComponent,
      ),
  },
  {
    path: 'no-access',
    canActivate: [authGuard, tenantGuard],
    loadComponent: () =>
      import('./features/store/no-access/no-access.component').then((m) => m.NoAccessComponent),
  },
  {
    path: 'pos',
    component: PosLayoutComponent,
    canActivate: [authGuard, tenantGuard, storeReadyGuard, posGuard],
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/pos/pos-orders/pos-orders.component').then((m) => m.PosOrdersComponent),
      },
    ],
  },
  {
    path: 'kitchen',
    component: KitchenLayoutComponent,
    canActivate: [authGuard, tenantGuard, storeReadyGuard, kitchenGuard],
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/kitchen/kitchen-orders/kitchen-orders.component').then(
            (m) => m.KitchenOrdersComponent,
          ),
      },
    ],
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard, tenantGuard, storeReadyGuard, dashboardRoleGuard],
    children: [
      {
        path: 'overview',
        canActivate: [permissionGuard('analytics:read')],
        loadComponent: () =>
          import('./features/overview/overview.component').then((m) => m.OverviewComponent),
      },
      {
        path: 'orders',
        canActivate: [permissionGuard('orders:read')],
        loadComponent: () =>
          import('./features/orders/orders.component').then((m) => m.OrdersComponent),
      },
      {
        path: 'transactions',
        canActivate: [permissionGuard('transactions:read')],
        loadComponent: () =>
          import('./features/transactions/transactions.component').then(
            (m) => m.TransactionsComponent,
          ),
      },
      {
        path: 'analytics',
        canActivate: [permissionGuard('analytics:read')],
        loadComponent: () =>
          import('./features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
      },
      {
        path: 'products',
        canActivate: [permissionGuard('products:read')],
        loadComponent: () =>
          import('./features/products/products.component').then((m) => m.ProductsComponent),
      },
      {
        path: 'categories',
        canActivate: [permissionGuard('categories:read')],
        loadComponent: () =>
          import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
      },
      {
        path: 'promo',
        canActivate: [permissionGuard('promos:read')],
        loadComponent: () =>
          import('./features/promo/promo.component').then((m) => m.PromoComponent),
      },
      {
        path: 'settings',
        canActivate: [permissionGuard('stores:read')],
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'integrations',
        loadComponent: () =>
          import('./features/integrations/integrations.component').then(
            (m) => m.IntegrationsComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login' },
];
