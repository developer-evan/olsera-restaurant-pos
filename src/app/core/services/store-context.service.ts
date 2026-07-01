import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, map, of, switchMap, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  StoreAccessContext,
  StoreBootstrapResult,
  UserStoreSummary,
} from '../models/store.model';
import { getStoreInitials } from '../utils/store.util';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class StoreContextService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorageService);

  private readonly storesSignal = signal<UserStoreSummary[]>([]);
  private readonly accessContextSignal = signal<StoreAccessContext | null>(null);
  private readonly loadingSignal = signal(false);

  readonly stores = this.storesSignal.asReadonly();
  readonly accessContext = this.accessContextSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  readonly activeStore = computed(() => {
    const storeId = this.tokenStorage.getActiveStoreId();
    if (!storeId) {
      return null;
    }

    return this.storesSignal().find((store) => store.id === storeId) ?? null;
  });

  readonly activeStoreProfile = computed(() => {
    const store = this.activeStore();

    if (!store) {
      return { initials: '?', label: 'Store', name: 'Select store' };
    }

    return {
      initials: getStoreInitials(store.name),
      label: 'Store',
      name: store.name,
    };
  });

  readonly hasMultipleStores = computed(() => this.storesSignal().length > 1);

  can(permission: string): boolean {
    return this.accessContextSignal()?.permissions.includes(permission) ?? false;
  }

  reset(): void {
    this.storesSignal.set([]);
    this.accessContextSignal.set(null);
    this.loadingSignal.set(false);
  }

  loadStores(): Observable<UserStoreSummary[]> {
    return this.http
      .get<ApiResponse<UserStoreSummary[]>>(`${environment.apiBaseUrl}/stores`)
      .pipe(
        map((response) => {
          this.storesSignal.set(response.data);
          return response.data;
        }),
      );
  }

  loadAccessContext(storeId: string): Observable<StoreAccessContext> {
    return this.http
      .get<ApiResponse<StoreAccessContext>>(
        `${environment.apiBaseUrl}/stores/${storeId}/access-context`,
      )
      .pipe(
        tap((response) => {
          this.tokenStorage.setActiveStoreId(storeId);
          this.accessContextSignal.set(response.data);
        }),
        map((response) => response.data),
      );
  }

  setActiveStore(storeId: string): Observable<StoreAccessContext> {
    return this.loadAccessContext(storeId);
  }

  resolveHomeRoute(): string {
    switch (this.accessContextSignal()?.role) {
      case 'kitchen':
        return '/kitchen/orders';
      case 'cashier':
        return '/pos/orders';
      default:
        return '/overview';
    }
  }

  bootstrap(): Observable<StoreBootstrapResult> {
    this.loadingSignal.set(true);

    return this.loadStores().pipe(
      switchMap((stores) => this.resolveBootstrapRoute(stores)),
      finalize(() => this.loadingSignal.set(false)),
    );
  }

  /** Returns a redirect path when not ready, or `null` when store context is loaded. */
  ensureStoreReady(): Observable<string | null> {
    const stores = this.storesSignal();

    if (stores.length === 0) {
      return this.loadStores().pipe(switchMap((loaded) => this.resolveReadyState(loaded)));
    }

    return this.resolveReadyState(stores);
  }

  private resolveBootstrapRoute(stores: UserStoreSummary[]): Observable<StoreBootstrapResult> {
    if (stores.length === 0) {
      return of({ route: '/no-access' });
    }

    if (stores.length === 1) {
      return this.setActiveStore(stores[0].id).pipe(
        map(() => ({ route: this.resolveHomeRoute() })),
      );
    }

    const savedStoreId = this.tokenStorage.getActiveStoreId();
    const hasValidSelection = !!savedStoreId && stores.some((store) => store.id === savedStoreId);

    if (!hasValidSelection) {
      return of({ route: '/select-store' });
    }

    return this.setActiveStore(savedStoreId!).pipe(
      map(() => ({ route: this.resolveHomeRoute() })),
    );
  }

  private resolveReadyState(stores: UserStoreSummary[]): Observable<string | null> {
    if (stores.length === 0) {
      return of('/no-access');
    }

    let storeId = this.tokenStorage.getActiveStoreId();
    const hasValidSelection = !!storeId && stores.some((store) => store.id === storeId);

    if (stores.length === 1) {
      storeId = stores[0].id;
    } else if (!hasValidSelection) {
      return of('/select-store');
    }

    if (this.accessContextSignal()?.storeId === storeId) {
      return of(null);
    }

    return this.loadAccessContext(storeId!).pipe(map(() => null));
  }
}
