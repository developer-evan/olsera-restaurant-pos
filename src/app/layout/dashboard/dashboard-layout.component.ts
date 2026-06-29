import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Drawer } from 'primeng/drawer';

import { DashboardHeaderComponent } from '../header/dashboard-header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarStateService } from '../services/sidebar-state.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, Drawer, DashboardHeaderComponent, SidebarComponent],
  template: `
    <div class="flex h-dvh overflow-hidden bg-[#0a0b0f] text-slate-100">
      <!-- Mobile navigation drawer -->
      <p-drawer
        [visible]="sidebar.mobileOpen()"
        (visibleChange)="onMobileDrawerChange($event)"
        position="left"
        styleClass="!w-[min(100vw,18rem)] !border-0 !bg-[#111319] !p-0"
        [closable]="false"
        [modal]="true"
        [dismissible]="true"
        [closeOnEscape]="true"
      >
        <ng-template #headless>
          <app-sidebar (navigated)="sidebar.closeMobile()" />
        </ng-template>
      </p-drawer>

      <!-- Desktop sidebar -->
      <aside
        class="hidden shrink-0 border-r border-white/5 transition-[width] duration-200 lg:flex lg:flex-col"
        [class.w-64]="!sidebar.collapsed()"
        [class.w-[4.5rem]]="sidebar.collapsed()"
        aria-label="Sidebar"
      >
        <app-sidebar />
      </aside>

      <!-- Main content -->
      <div class="flex min-w-0 flex-1 flex-col">
        <app-dashboard-header />

        <main class="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent {
  protected readonly sidebar = inject(SidebarStateService);

  protected onMobileDrawerChange(visible: boolean): void {
    this.sidebar.setMobileOpen(visible);
  }
}
