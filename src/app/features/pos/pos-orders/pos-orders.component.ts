import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-pos-orders',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="POS Orders"
      description="Cashier workspace — product grid, cart, checkout. Module 9 will wire menu + order APIs."
    />
  `,
})
export class PosOrdersComponent {}
