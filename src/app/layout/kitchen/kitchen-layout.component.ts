import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-kitchen-layout',
  imports: [RouterOutlet],
  template: `
    <div class="flex h-dvh flex-col bg-[#0a0b0f] text-slate-100">
      <header
        class="flex h-14 shrink-0 items-center border-b border-white/5 px-4 md:px-6"
      >
        <p class="text-sm font-semibold uppercase tracking-widest text-emerald-400">Kitchen</p>
        <h1 class="ml-3 text-base font-semibold text-white">Order queue</h1>
      </header>
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <router-outlet />
      </main>
    </div>
  `,
})
export class KitchenLayoutComponent {}
