import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-overview',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Overview"
      description="High-level metrics, sales summary, and store performance will live here."
    />
  `,
})
export class OverviewComponent {}
