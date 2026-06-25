import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-orders',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Orders"
      description="Track dine-in, takeaway, and delivery orders from one place."
    />
  `,
})
export class OrdersComponent {}
