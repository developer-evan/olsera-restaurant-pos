import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';

import { AuthService } from '../../../core/services/auth.service';
import { StoreContextService } from '../../../core/services/store-context.service';
import { getApiErrorMessage } from '../../../core/utils/api-error.util';
import { AuthSplitLayoutComponent } from '../../../shared/components/auth/auth-split-layout.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthSplitLayoutComponent,
    InputText,
    Password,
    Checkbox,
    Button,
    IconField,
    InputIcon,
    Message,
  ],
  template: `
    <app-auth-split-layout>
      <div class="mx-auto w-full max-w-md">
        <div class="mb-8 flex items-center gap-3 lg:hidden">
          <div
            class="flex size-9 items-center justify-center rounded-xl bg-orange-500 text-white"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" class="size-5 fill-current">
              <path
                d="M12 4a8 8 0 1 0 7.746 9.996 1.5 1.5 0 1 1 2.912.576A10 10 0 1 1 12 2a1.5 1.5 0 0 1 0 3Z"
              />
              <path
                d="M12 7a1.5 1.5 0 0 1 1.5 1.5V12h3.5a1.5 1.5 0 0 1 0 3h-3.5v3.5a1.5 1.5 0 0 1-3 0V15H7.5a1.5 1.5 0 0 1 0-3H11V8.5A1.5 1.5 0 0 1 12 7Z"
              />
            </svg>
          </div>
          <span class="text-lg font-semibold text-white">Olsera</span>
        </div>

        <header class="mb-8">
          <h1 class="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Welcome back
          </h1>
          <p class="mt-2 text-sm text-slate-400 md:text-base">
            Sign in to manage your store dashboard.
          </p>
        </header>

        @if (errorMessage()) {
          <p-message severity="error" styleClass="mb-5 w-full" [text]="errorMessage()!" />
        }

        <form class="space-y-5" [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-slate-300">Email</label>
            <p-iconfield iconPosition="left" styleClass="w-full">
              <p-inputicon styleClass="pi pi-envelope text-slate-500" />
              <input
                pInputText
                id="email"
                type="email"
                formControlName="email"
                placeholder="you@restaurant.com"
                autocomplete="email"
                class="auth-input w-full"
              />
            </p-iconfield>
            @if (form.controls.email.touched && form.controls.email.invalid) {
              <p class="text-xs text-red-400">Enter a valid email address.</p>
            }
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between gap-3">
              <label for="password" class="text-sm font-medium text-slate-300">Password</label>
              <a
                routerLink="/auth/forgot-password"
                class="text-xs font-medium text-orange-400 transition-colors hover:text-orange-300"
              >
                Forgot password?
              </a>
            </div>
            <p-password
              inputId="password"
              formControlName="password"
              placeholder="Enter your password"
              [toggleMask]="true"
              [feedback]="false"
              styleClass="w-full"
              inputStyleClass="auth-input w-full"
              autocomplete="current-password"
            />
            @if (form.controls.password.touched && form.controls.password.invalid) {
              <p class="text-xs text-red-400">Password must be at least 6 characters.</p>
            }
          </div>

          <div class="flex items-center gap-2">
            <p-checkbox formControlName="rememberMe" inputId="rememberMe" [binary]="true" />
            <label for="rememberMe" class="cursor-pointer text-sm text-slate-400">
              Remember me for 30 days
            </label>
          </div>

          <p-button
            type="submit"
            label="Sign in"
            styleClass="auth-primary-btn w-full"
            [loading]="submitting()"
            [disabled]="form.invalid || submitting()"
          />
        </form>

        <p class="mt-8 text-center text-sm text-slate-400">
          Staff member?
          <span class="text-slate-500">Use the invite link from your manager to set up access.</span>
        </p>
      </div>
    </app-auth-split-layout>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly storeContext = inject(StoreContextService);

  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [true],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.submitting.set(true);

    const { email, password, rememberMe } = this.form.getRawValue();

    this.auth
      .login({ email, password }, rememberMe)
      .pipe(switchMap(() => this.storeContext.bootstrap()))
      .subscribe({
        next: ({ route }) => {
          this.submitting.set(false);
          void this.router.navigate([route]);
        },
        error: (error) => {
          this.submitting.set(false);
          this.errorMessage.set(getApiErrorMessage(error, 'Invalid email or password'));
        },
      });
  }
}
