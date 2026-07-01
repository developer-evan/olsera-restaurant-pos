import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message } from 'primeng/message';
import { ProgressSpinner } from 'primeng/progressspinner';

import { OverviewAnalytics } from '../../core/models/analytics.model';
import { AnalyticsService } from '../../core/services/analytics.service';
import { StoreContextService } from '../../core/services/store-context.service';
import { getApiErrorMessage } from '../../core/utils/api-error.util';
import { formatCurrency, formatDisplayDate, toDateParam } from '../../core/utils/format.util';

interface MetricCard {
  label: string;
  value: string;
  hint: string;
  icon: string;
  accent: string;
}

@Component({
  selector: 'app-overview',
  imports: [FormsModule, Message, ProgressSpinner],
  template: `
    <section class="mx-auto w-full max-w-6xl">
      <header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-orange-500">Dashboard</p>
          <h1 class="mt-1 text-2xl font-semibold text-white md:text-3xl">Overview</h1>
          @if (overview()) {
            <p class="mt-2 text-sm text-slate-400">
              Snapshot for {{ formatDisplayDate(overview()!.date) }}
            </p>
          }
        </div>

        <div class="flex items-center gap-3">
          <label for="overview-date" class="text-sm text-slate-400">Date</label>
          <input
            id="overview-date"
            type="date"
            class="rounded-xl border border-white/10 bg-[#1a1d26] px-3 py-2 text-sm text-slate-200 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40"
            [ngModel]="selectedDate()"
            (ngModelChange)="onDateChange($event)"
            [disabled]="loading()"
          />
        </div>
      </header>

      @if (errorMessage()) {
        <p-message severity="error" styleClass="mb-5 w-full" [text]="errorMessage()!" />
      }

      @if (loading()) {
        <div class="flex min-h-64 items-center justify-center rounded-2xl border border-white/5 bg-[#151821]">
          <p-progressSpinner strokeWidth="4" styleClass="!size-10" ariaLabel="Loading overview" />
        </div>
      } @else if (overview()) {
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          @for (metric of metricCards(); track metric.label) {
            <article
              class="rounded-2xl border border-white/5 bg-[#151821] p-5 transition-colors hover:border-white/10"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-medium text-slate-400">{{ metric.label }}</p>
                  <p class="mt-2 text-3xl font-semibold tracking-tight text-white">
                    {{ metric.value }}
                  </p>
                  <p class="mt-2 text-xs text-slate-500">{{ metric.hint }}</p>
                </div>
                <span
                  class="flex size-11 shrink-0 items-center justify-center rounded-xl"
                  [class]="metric.accent"
                  aria-hidden="true"
                >
                  <i class="pi text-lg" [class]="metric.icon"></i>
                </span>
              </div>
            </article>
          }
        </div>

        <p class="mt-6 text-xs text-slate-500">
          Data from
          <code class="rounded bg-white/5 px-1.5 py-0.5 text-slate-400"
            >GET /stores/:storeId/analytics/overview</code
          >
          · Currency: {{ currency() }}
        </p>
      }
    </section>
  `,
})
export class OverviewComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly storeContext = inject(StoreContextService);

  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly overview = signal<OverviewAnalytics | null>(null);
  protected readonly selectedDate = signal(toDateParam(new Date()));

  protected readonly currency = computed(
    () => this.storeContext.activeStore()?.currency ?? 'USD',
  );

  protected readonly metricCards = computed((): MetricCard[] => {
    const data = this.overview();
    const currency = this.currency();

    if (!data) {
      return [];
    }

    return [
      {
        label: 'Total sales',
        value: formatCurrency(data.sales, currency),
        hint: 'Gross sales for the selected day',
        icon: 'pi-dollar',
        accent: 'bg-emerald-500/10 text-emerald-400',
      },
      {
        label: 'Orders',
        value: data.orderCount.toLocaleString(),
        hint: 'Completed and in-progress orders',
        icon: 'pi-shopping-cart',
        accent: 'bg-sky-500/10 text-sky-400',
      },
      {
        label: 'Avg. ticket',
        value: formatCurrency(data.avgTicket, currency),
        hint: 'Average order value',
        icon: 'pi-chart-line',
        accent: 'bg-orange-500/10 text-orange-400',
      },
    ];
  });

  constructor() {
    this.loadOverview();
  }

  protected formatDisplayDate = formatDisplayDate;

  protected onDateChange(value: string): void {
    if (!value || value === this.selectedDate()) {
      return;
    }

    this.selectedDate.set(value);
    this.loadOverview();
  }

  private loadOverview(): void {
    const storeId = this.storeContext.activeStore()?.id;

    if (!storeId) {
      this.loading.set(false);
      this.errorMessage.set('No active store selected.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    this.analytics.getOverview(storeId, this.selectedDate()).subscribe({
      next: (data) => {
        this.overview.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set(getApiErrorMessage(error, 'Could not load overview metrics'));
      },
    });
  }
}
