import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';

import { AuthSplitLayoutComponent } from '../../../shared/components/auth/auth-split-layout.component';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthSplitLayoutComponent,
    InputText,
    Button,
    IconField,
    InputIcon,
  ],
  template: `
    <app-auth-split-layout>
      <div class="mx-auto w-full max-w-md">
        <a
          routerLink="/auth/login"
          class="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <i class="pi pi-arrow-left text-xs" aria-hidden="true"></i>
          Back to sign in
        </a>

        <header class="mb-8">
          <h1 class="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Reset password
          </h1>
          <p class="mt-2 text-sm text-slate-400 md:text-base">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </header>

        @if (sent()) {
          <div
            class="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-5 text-sm text-emerald-300"
          >
            If an account exists for <strong class="text-white">{{ form.controls.email.value }}</strong>,
            you&apos;ll receive a reset link shortly.
          </div>
        } @else {
          <form class="space-y-5" [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="space-y-2">
              <label for="resetEmail" class="text-sm font-medium text-slate-300">Email</label>
              <p-iconfield iconPosition="left" styleClass="w-full">
                <p-inputicon styleClass="pi pi-envelope text-slate-500" />
                <input
                  pInputText
                  id="resetEmail"
                  type="email"
                  formControlName="email"
                  placeholder="you@restaurant.com"
                  autocomplete="email"
                  class="auth-input w-full"
                />
              </p-iconfield>
            </div>

            <p-button
              type="submit"
              label="Send reset link"
              styleClass="auth-primary-btn w-full"
              [loading]="submitting()"
              [disabled]="form.invalid || submitting()"
            />
          </form>
        }
      </div>
    </app-auth-split-layout>
  `,
})
export class ForgotPasswordComponent {
  private readonly fb = inject(FormBuilder);

  protected readonly submitting = signal(false);
  protected readonly sent = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    setTimeout(() => {
      this.submitting.set(false);
      this.sent.set(true);
    }, 600);
  }
}
