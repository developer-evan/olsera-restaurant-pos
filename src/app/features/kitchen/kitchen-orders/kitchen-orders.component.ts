import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-kitchen-orders',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Kitchen queue"
      description="Live order queue with status updates. Module 10 will wire GET /orders + polling."
    />
  `,
})
export class KitchenOrdersComponent {}
