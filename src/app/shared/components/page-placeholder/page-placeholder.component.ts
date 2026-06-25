import { Component, input } from '@angular/core';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-page-placeholder',
  imports: [Card],
  template: `
    <section class="mx-auto w-full max-w-5xl">
      <header class="mb-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-orange-500">
          Coming soon
        </p>
        <h1 class="mt-1 text-2xl font-semibold text-white md:text-3xl">{{ title() }}</h1>
        @if (description()) {
          <p class="mt-2 max-w-2xl text-sm text-slate-400 md:text-base">
            {{ description() }}
          </p>
        }
      </header>

      <p-card styleClass="border border-white/5 bg-[#151821] shadow-none">
        <div
          class="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/10 bg-[#111319]/60 px-6 py-10 text-center"
        >
          <span
            class="flex size-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500"
          >
            <i class="pi pi-wrench text-lg" aria-hidden="true"></i>
          </span>
          <p class="text-sm text-slate-300 md:text-base">
            This page is a placeholder. REST API integration will be added in a later step.
          </p>
        </div>
      </p-card>
    </section>
  `,
})
export class PagePlaceholderComponent {
  readonly title = input.required<string>();
  readonly description = input<string>();
}
