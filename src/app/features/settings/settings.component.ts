import { Component } from '@angular/core';
import { PagePlaceholderComponent } from '../../shared/components/page-placeholder/page-placeholder.component';

@Component({
  selector: 'app-settings',
  imports: [PagePlaceholderComponent],
  template: `
    <app-page-placeholder
      title="Settings"
      description="Store profile, tax rules, receipt settings, and team access."
    />
  `,
})
export class SettingsComponent {}
