import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';

import { AuthSplitLayoutComponent } from '../../../shared/components/auth/auth-split-layout.component';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    AuthSplitLayoutComponent,
    InputText,
    Password,
    Button,
    IconField,
    InputIcon,
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
            Create your account
          </h1>
          <p class="mt-2 text-sm text-slate-400 md:text-base">
            Start managing orders, menu, and payments in minutes.
          </p>
        </header>

        <form class="space-y-5" [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="space-y-2">
            <label for="fullName" class="text-sm font-medium text-slate-300">Full name</label>
            <p-iconfield iconPosition="left" styleClass="w-full">
              <p-inputicon styleClass="pi pi-user text-slate-500" />
              <input
                pInputText
                id="fullName"
                type="text"
                formControlName="fullName"
                placeholder="Jane Doe"
                autocomplete="name"
                class="auth-input w-full"
              />
            </p-iconfield>
          </div>

          <div class="space-y-2">
            <label for="registerEmail" class="text-sm font-medium text-slate-300">Email</label>
            <p-iconfield iconPosition="left" styleClass="w-full">
              <p-inputicon styleClass="pi pi-envelope text-slate-500" />
              <input
                pInputText
                id="registerEmail"
                type="email"
                formControlName="email"
                placeholder="you@restaurant.com"
                autocomplete="email"
                class="auth-input w-full"
              />
            </p-iconfield>
          </div>

          <div class="space-y-2">
            <label for="registerPassword" class="text-sm font-medium text-slate-300">
              Password
            </label>
            <p-password
              inputId="registerPassword"
              formControlName="password"
              placeholder="Create a password"
              [toggleMask]="true"
              [feedback]="true"
              styleClass="w-full"
              inputStyleClass="auth-input w-full"
              autocomplete="new-password"
            />
          </div>

          <p-button
            type="submit"
            label="Create account"
            styleClass="auth-primary-btn w-full"
            [loading]="submitting()"
            [disabled]="form.invalid || submitting()"
          />
        </form>

        <p class="mt-8 text-center text-sm text-slate-400">
          Already have an account?
          <a
            routerLink="/auth/login"
            class="ml-1 font-medium text-orange-400 transition-colors hover:text-orange-300"
          >
            Sign in
          </a>
        </p>
      </div>
    </app-auth-split-layout>
  `,
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly submitting = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    setTimeout(() => {
      this.submitting.set(false);
      void this.router.navigate(['/auth/login']);
    }, 600);
  }
}
