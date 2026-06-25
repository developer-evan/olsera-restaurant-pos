import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-categories',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Categories"
      description="Organize your menu into categories and subcategories."
    />
  `,
})
export class CategoriesComponent {}
