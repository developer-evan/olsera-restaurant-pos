export interface OverviewAnalytics {
  date: string;
  sales: number;
  orderCount: number;
  avgTicket: number;
}

export interface SalesByDayPoint {
  date: string;
  sales: number;
  orderCount: number;
  avgTicket: number;
}

export interface SalesByDayAnalytics {
  fromDate: string;
  toDate: string;
  points: SalesByDayPoint[];
}

export interface TopProductAnalytics {
  productId: string;
  name: string;
  quantitySold: number;
  revenue: number;
}

export interface TopProductsAnalytics {
  fromDate: string;
  toDate: string;
  products: TopProductAnalytics[];
}
