import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-transactions',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Transactions"
      description="Payment history, refunds, and reconciliation tools will appear here."
    />
  `,
})
export class TransactionsComponent {}
