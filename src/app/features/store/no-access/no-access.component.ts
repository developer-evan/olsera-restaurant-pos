import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

import { AuthSplitLayoutComponent } from '../../../shared/components/auth/auth-split-layout.component';

@Component({
  selector: 'app-no-access',
  imports: [AuthSplitLayoutComponent, Button, RouterLink],
  template: `
    <app-auth-split-layout>
      <div class="mx-auto w-full max-w-md text-center">
        <div
          class="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400"
          aria-hidden="true"
        >
          <i class="pi pi-lock text-2xl"></i>
        </div>

        <h1 class="text-2xl font-semibold text-white">No store access</h1>
        <p class="mt-3 text-sm text-slate-400">
          Your account is active, but you are not assigned to any store yet. Ask your manager
          for an invite.
        </p>

        <p-button
          routerLink="/auth/login"
          label="Back to login"
          styleClass="auth-primary-btn mt-8"
        />
      </div>
    </app-auth-split-layout>
  `,
})
export class NoAccessComponent {}
