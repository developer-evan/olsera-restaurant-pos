import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-integrations',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Integrations"
      description="Connect delivery platforms, accounting tools, and payment providers."
    />
  `,
})
export class IntegrationsComponent {}
