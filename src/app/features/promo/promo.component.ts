import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-promo',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Promo"
      description="Create discounts, coupons, and limited-time offers."
    />
  `,
})
export class PromoComponent {}
