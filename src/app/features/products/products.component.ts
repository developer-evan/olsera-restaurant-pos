import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-products',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Products"
      description="Manage menu items, pricing, variants, and availability."
    />
  `,
})
export class ProductsComponent {}
