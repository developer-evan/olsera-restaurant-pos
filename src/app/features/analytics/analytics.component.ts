import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-analytics',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Analytics"
      description="Charts and reports for revenue, traffic, and product performance."
    />
  `,
})
export class AnalyticsComponent {}
