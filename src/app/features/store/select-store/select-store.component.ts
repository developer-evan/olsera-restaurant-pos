import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Avatar } from 'primeng/avatar';
import { Message } from 'primeng/message';

import { StoreContextService } from '../../../core/services/store-context.service';
import { getApiErrorMessage } from '../../../core/utils/api-error.util';
import { AuthSplitLayoutComponent } from '../../../shared/components/auth/auth-split-layout.component';
import { getStoreInitials } from '../../../core/utils/store.util';

@Component({
  selector: 'app-select-store',
  imports: [AuthSplitLayoutComponent, Avatar, Message],
  template: `
    <app-auth-split-layout>
      <div class="mx-auto w-full max-w-lg">
        <header class="mb-8">
          <h1 class="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Select a store
          </h1>
          <p class="mt-2 text-sm text-slate-400 md:text-base">
            Choose which location you want to work in today.
          </p>
        </header>

        @if (errorMessage()) {
          <p-message severity="error" styleClass="mb-5 w-full" [text]="errorMessage()!" />
        }

        <ul class="space-y-3">
          @for (store of storeContext.stores(); track store.id) {
            <li>
              <button
                type="button"
                class="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-[#14161d] p-4 text-left transition-colors hover:border-orange-500/40 hover:bg-[#1a1d26]"
                [disabled]="selecting() === store.id"
                (click)="selectStore(store.id)"
              >
                <p-avatar
                  [label]="initials(store.name)"
                  shape="circle"
                  styleClass="!size-11 !bg-orange-300/90 !text-sm !font-semibold !text-orange-950"
                />
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-base font-semibold text-white">{{
                    store.name
                  }}</span>
                  <span class="mt-0.5 block text-xs capitalize text-slate-500">{{
                    store.role
                  }}</span>
                </span>
                @if (selecting() === store.id) {
                  <i class="pi pi-spin pi-spinner text-orange-400" aria-hidden="true"></i>
                } @else {
                  <i class="pi pi-chevron-right text-slate-500" aria-hidden="true"></i>
                }
              </button>
            </li>
          }
        </ul>
      </div>
    </app-auth-split-layout>
  `,
})
export class SelectStoreComponent {
  protected readonly storeContext = inject(StoreContextService);
  private readonly router = inject(Router);

  protected readonly selecting = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

  constructor() {
    if (this.storeContext.stores().length === 0) {
      this.storeContext.loadStores().subscribe({
        error: (error) =>
          this.errorMessage.set(getApiErrorMessage(error, 'Could not load your stores')),
      });
    }
  }

  protected initials(name: string): string {
    return getStoreInitials(name);
  }

  protected selectStore(storeId: string): void {
    this.errorMessage.set(null);
    this.selecting.set(storeId);

    this.storeContext.setActiveStore(storeId).subscribe({
      next: () => {
        this.selecting.set(null);
        void this.router.navigate([this.storeContext.resolveHomeRoute()]);
      },
      error: (error) => {
        this.selecting.set(null);
        this.errorMessage.set(getApiErrorMessage(error, 'Could not switch to that store'));
      },
    });
  }
}
