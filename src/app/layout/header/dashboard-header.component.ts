import { Component, computed, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { Button } from 'primeng/button';

import { NAV_SECTIONS } from '../../shared/constants/navigation.constants';
import { SidebarStateService } from '../services/sidebar-state.service';

@Component({
  selector: 'app-dashboard-header',
  imports: [Button],
  host: {
    class:
      'sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-white/5 bg-[#0a0b0f]/90 px-4 backdrop-blur-md md:h-17 md:px-3',
  },
  template: `
    <p-button
      type="button"
      icon="pi pi-bars"
      [rounded]="true"
      [text]="true"
      severity="secondary"
      styleClass="!text-slate-300 hover:!text-white lg:!hidden"
      ariaLabel="Open navigation menu"
      (onClick)="sidebar.toggleMobile()"
    />

    <p-button
      type="button"
      [icon]="sidebar.collapsed() ? 'pi pi-chevron-right' : 'pi pi-align-justify'"
      [rounded]="true"
      [text]="true"
      severity="secondary"
      styleClass="!hidden !size-9 !text-slate-400 hover:!text-white lg:!inline-flex"
      [ariaLabel]="sidebar.collapsed() ? 'Expand sidebar' : 'Collapse sidebar'"
      (onClick)="sidebar.toggleCollapsed()"
    />

    <div class="min-w-0 flex-1">
      <p class="truncate text-xs font-medium uppercase tracking-widest text-slate-500">
        Dashboard
      </p>
      <h1 class="truncate text-base font-semibold text-white md:text-lg">
        {{ pageTitle() }}
      </h1>
    </div>

    <div class="hidden items-center gap-2 sm:flex">
      <p-button
        type="button"
        icon="pi pi-bell"
        [rounded]="true"
        [text]="true"
        severity="secondary"
        styleClass="!text-slate-400 hover:!text-white"
        ariaLabel="Notifications"
      />
      <p-button
        type="button"
        icon="pi pi-plus"
        label="New order"
        size="small"
        styleClass="!rounded-xl !border-orange-500 !bg-orange-500 !px-3 hover:!border-orange-400 hover:!bg-orange-400"
      />
    </div>
  `,
})
export class DashboardHeaderComponent {
  private readonly router = inject(Router);
  protected readonly sidebar = inject(SidebarStateService);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly pageTitle = computed(() => {
    const url = this.currentUrl();
    const match = NAV_SECTIONS.flatMap((section) => section.items).find(
      (item) => url === item.route || url.startsWith(`${item.route}/`),
    );
    return match?.label ?? 'Overview';
  });
}
