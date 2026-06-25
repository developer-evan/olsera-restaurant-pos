import { Component, computed, input } from '@angular/core';
import { NavIconKey } from '../../models';

const ICON_MAP: Record<NavIconKey, string> = {
  overview: 'pi pi-home',
  orders: 'pi pi-shopping-bag',
  transactions: 'pi pi-dollar',
  analytics: 'pi pi-chart-bar',
  products: 'pi pi-box',
  categories: 'pi pi-th-large',
  promo: 'pi pi-percentage',
  settings: 'pi pi-cog',
  integrations: 'pi pi-link',
  feedback: 'pi pi-comment',
  help: 'pi pi-headphones',
};

@Component({
  selector: 'app-nav-icon',
  imports: [],
  template: `<i [class]="iconClass()" aria-hidden="true"></i>`,
})
export class NavIconComponent {
  readonly name = input.required<NavIconKey>();
  readonly active = input(false);

  protected readonly iconClass = computed(() => {
    const base = ICON_MAP[this.name()];
    const color = this.active() ? 'text-orange-500' : 'text-slate-400';
    return `${base} ${color} text-sm`;
  });
}
