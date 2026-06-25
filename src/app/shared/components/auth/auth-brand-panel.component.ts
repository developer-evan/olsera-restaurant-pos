import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-brand-panel',
  host: {
    class:
      'relative flex min-h-64 flex-1 flex-col justify-between overflow-hidden bg-[#111319] p-8 xl:p-12',
  },
  template: `
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.18),transparent_55%)]"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute -right-16 top-1/3 size-72 rounded-full bg-orange-500/10 blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="relative z-10">
      <div class="flex items-center gap-3">
        <div
          class="flex size-10 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-500/25"
        >
          <svg viewBox="0 0 24 24" class="size-5 fill-current" aria-hidden="true">
            <path
              d="M12 4a8 8 0 1 0 7.746 9.996 1.5 1.5 0 1 1 2.912.576A10 10 0 1 1 12 2a1.5 1.5 0 0 1 0 3Z"
            />
            <path
              d="M12 7a1.5 1.5 0 0 1 1.5 1.5V12h3.5a1.5 1.5 0 0 1 0 3h-3.5v3.5a1.5 1.5 0 0 1-3 0V15H7.5a1.5 1.5 0 0 1 0-3H11V8.5A1.5 1.5 0 0 1 12 7Z"
            />
          </svg>
        </div>
        <span class="text-xl font-semibold text-white">Olsera</span>
      </div>

      <h2 class="mt-10 max-w-md text-3xl font-semibold leading-tight tracking-tight text-white xl:text-4xl">
        Run your restaurant smarter, from counter to kitchen.
      </h2>
      <p class="mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">
        Manage orders, track sales, and keep inventory in sync — all from one modern POS
        dashboard built for busy teams.
      </p>
    </div>

    <ul class="relative z-10 mt-10 space-y-4">
      @for (feature of features; track feature.title) {
        <li class="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-sm">
          <span
            class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400"
          >
            <i [class]="feature.icon" aria-hidden="true"></i>
          </span>
          <div>
            <p class="text-sm font-semibold text-white">{{ feature.title }}</p>
            <p class="mt-0.5 text-xs text-slate-400 md:text-sm">{{ feature.description }}</p>
          </div>
        </li>
      }
    </ul>

    <div
      class="relative z-10 mt-10 rounded-2xl border border-white/5 bg-[#1a1d26]/80 p-5 backdrop-blur-sm"
    >
      <div class="flex items-center gap-3">
        <span
          class="flex size-10 items-center justify-center rounded-full bg-orange-300/90 text-sm font-semibold text-orange-950"
        >
          AC
        </span>
        <div>
          <p class="text-sm font-medium text-white">Ali Coffee &amp; Eatery</p>
          <p class="text-xs text-slate-500">Trusted by 2,400+ stores</p>
        </div>
      </div>
      <p class="mt-3 text-sm leading-relaxed text-slate-400">
        “Olsera cut our order handling time in half. The dashboard gives us clarity we never had
        before.”
      </p>
    </div>
  `,
})
export class AuthBrandPanelComponent {
  protected readonly features = [
    {
      icon: 'pi pi-shopping-bag text-sm',
      title: 'Fast order flow',
      description: 'Take dine-in, takeaway, and delivery orders without switching tools.',
    },
    {
      icon: 'pi pi-chart-bar text-sm',
      title: 'Real-time insights',
      description: 'See sales, bestsellers, and peak hours as they happen.',
    },
    {
      icon: 'pi pi-box text-sm',
      title: 'Inventory control',
      description: 'Keep products, categories, and promos organized in one place.',
    },
  ];
}
