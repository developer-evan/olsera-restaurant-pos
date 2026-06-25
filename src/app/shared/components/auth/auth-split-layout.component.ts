import { Component } from '@angular/core';

import { AuthBrandPanelComponent } from './auth-brand-panel.component';

@Component({
  selector: 'app-auth-split-layout',
  imports: [AuthBrandPanelComponent],
  host: {
    class: 'block min-h-dvh bg-[#0a0b0f]',
  },
  template: `
    <div class="flex min-h-dvh flex-col lg:flex-row">
      <section
        class="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:max-w-xl lg:px-12 xl:max-w-2xl xl:px-16"
      >
        <ng-content />
      </section>

      <app-auth-brand-panel class="hidden lg:flex lg:max-w-[45%] lg:flex-1" />
    </div>
  `,
})
export class AuthSplitLayoutComponent {}
