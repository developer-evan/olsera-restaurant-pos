import { Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { Avatar } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TooltipModule } from 'primeng/tooltip';

import { NavIconComponent } from '../../shared/components/nav-icon/nav-icon.component';
import {
  FOOTER_LINKS,
  NAV_SECTIONS,
  STORE_PROFILE,
} from '../../shared/constants/navigation.constants';
import { SidebarStateService } from '../services/sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    RouterLinkActive,
    IconField,
    InputIcon,
    InputText,
    Button,
    Avatar,
    ScrollPanelModule,
    TooltipModule,
    NavIconComponent,
  ],
  host: {
    class: 'flex h-full min-h-0 flex-col bg-[#111319] text-slate-200',
  },
  template: `
    <!-- Brand -->
    <div
      class="flex shrink-0 items-center gap-3 border-b border-white/5 px-4 py-4"
      [class.justify-center]="sidebar.collapsed()"
      [class.lg:px-3]="sidebar.collapsed()"
    >
      <div
        class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/20"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" class="size-5 fill-current" role="img">
          <path
            d="M12 4a8 8 0 1 0 7.746 9.996 1.5 1.5 0 1 1 2.912.576A10 10 0 1 1 12 2a1.5 1.5 0 0 1 0 3Z"
          />
          <path d="M12 7a1.5 1.5 0 0 1 1.5 1.5V12h3.5a1.5 1.5 0 0 1 0 3h-3.5v3.5a1.5 1.5 0 0 1-3 0V15H7.5a1.5 1.5 0 0 1 0-3H11V8.5A1.5 1.5 0 0 1 12 7Z" />
        </svg>
      </div>

      @if (!sidebar.collapsed()) {
        <span class="flex-1 text-lg font-semibold tracking-tight text-white">Olsera</span>
      }
    </div>

    <!-- Search -->
    @if (!sidebar.collapsed()) {
      <div class="shrink-0 px-4 py-4">
        <div class="relative">
          <p-iconfield iconPosition="left" styleClass="w-full">
            <p-inputicon styleClass="pi pi-search text-slate-500" />
            <input
              pInputText
              type="search"
              placeholder="Search"
              class="w-full !rounded-xl border-white/5! !bg-[#1a1d26] !py-2.5 !pl-10 !pr-14 !text-sm !text-slate-200 placeholder:!text-slate-500"
              aria-label="Search navigation"
            />
          </p-iconfield>
          <span
            class="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/10 bg-[#111319] px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:inline"
          >
            ⌘ K
          </span>
        </div>
      </div>
    } @else {
      <div class="hidden shrink-0 justify-center px-2 py-4 lg:flex">
        <p-button
          type="button"
          icon="pi pi-search"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          styleClass="!size-9 !text-slate-400 hover:!text-white"
          ariaLabel="Search"
          pTooltip="Search"
          tooltipPosition="right"
          [tooltipDisabled]="!sidebar.collapsed()"
        />
      </div>
    }

    <!-- Navigation -->
    <div class="min-h-0 flex-1">
      <p-scrollpanel styleClass="sidebar-scroll h-full w-full">
        <nav class="px-3 pb-4" aria-label="Main navigation">
          @for (section of navSections; track section.title) {
            <div class="mb-5">
              @if (!sidebar.collapsed()) {
                <p
                  class="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500"
                >
                  {{ section.title }}
                </p>
              }

              <ul class="space-y-0.5">
                @for (item of section.items; track item.route) {
                  <li>
                    <a
                      [routerLink]="item.route"
                      routerLinkActive="bg-white/10 text-white"
                      [routerLinkActiveOptions]="{ exact: true }"
                      #navLink="routerLinkActive"
                      (click)="onNavigate()"
                      class="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                      [class.justify-center]="sidebar.collapsed()"
                      [class.!px-2]="sidebar.collapsed()"
                      [pTooltip]="item.label"
                      tooltipPosition="right"
                      [tooltipDisabled]="!sidebar.collapsed()"
                    >
                      <span
                        class="absolute inset-y-1.5 left-0 w-1 rounded-r-full bg-orange-500 transition-opacity"
                        [class.opacity-0]="!navLink.isActive"
                        [class.opacity-100]="navLink.isActive"
                        aria-hidden="true"
                      ></span>

                      <app-nav-icon [name]="item.icon" [active]="navLink.isActive" />

                      @if (!sidebar.collapsed()) {
                        <span class="flex-1 truncate">{{ item.label }}</span>

                        @if (item.hasChildren) {
                          <i
                            class="pi pi-chevron-down text-xs text-slate-500"
                            aria-hidden="true"
                          ></i>
                        }
                      }
                    </a>
                  </li>
                }
              </ul>
            </div>
          }
        </nav>
      </p-scrollpanel>
    </div>

    <!-- Footer -->
    <div class="mt-auto shrink-0 border-t border-white/5 px-3 py-4">
      <ul class="mb-3 space-y-0.5">
        @for (link of footerLinks; track link.label) {
          <li>
            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
              [class.justify-center]="sidebar.collapsed()"
              [class.!px-2]="sidebar.collapsed()"
              [pTooltip]="link.label"
              tooltipPosition="right"
              [tooltipDisabled]="!sidebar.collapsed()"
            >
              <app-nav-icon [name]="link.icon" />
              @if (!sidebar.collapsed()) {
                <span>{{ link.label }}</span>
              }
            </button>
          </li>
        }
      </ul>

      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-[#1a1d26] p-2.5 text-left transition-colors hover:border-white/10 hover:bg-[#1f2330]"
        [class.justify-center]="sidebar.collapsed()"
        aria-label="Switch store"
        [pTooltip]="store.name"
        tooltipPosition="right"
        [tooltipDisabled]="!sidebar.collapsed()"
      >
        <p-avatar
          [label]="store.initials"
          shape="circle"
          styleClass="!size-9 !bg-orange-300/90 !text-sm !font-semibold !text-orange-950"
        />

        @if (!sidebar.collapsed()) {
          <span class="min-w-0 flex-1">
            <span class="block text-[11px] text-slate-500">{{ store.label }}</span>
            <span class="block truncate text-sm font-semibold text-white">{{ store.name }}</span>
          </span>
          <i class="pi pi-sort text-xs text-slate-500" aria-hidden="true"></i>
        }
      </button>
    </div>
  `,
})
export class SidebarComponent {
  protected readonly sidebar = inject(SidebarStateService);
  protected readonly navSections = NAV_SECTIONS;
  protected readonly footerLinks = FOOTER_LINKS;
  protected readonly store = STORE_PROFILE;

  readonly navigated = output<void>();

  protected onNavigate(): void {
    this.navigated.emit();
  }
}
