import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-platform-onboarding',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Onboard tenant"
      description="Super Admin form — create owner + organization + first store. Module 8 will wire POST /platform/onboarding."
    />
  `,
})
export class PlatformOnboardingComponent {}
