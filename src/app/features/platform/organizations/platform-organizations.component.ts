import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-platform-organizations',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Organizations"
      description="Super Admin view — list and manage onboarded restaurant tenants. Module 8 will wire GET /platform/organizations."
    />
  `,
})
export class PlatformOrganizationsComponent {}
