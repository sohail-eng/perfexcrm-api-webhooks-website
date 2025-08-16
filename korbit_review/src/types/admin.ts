export interface AdminUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface StripeConfig {
  connected: boolean;
  accountId?: string;
  accountName?: string;
  isLive: boolean;
  hasProducts: boolean;
  regularPriceId?: string;
  extendedPriceId?: string;
  publishableKey?: string;
  hasSecretKey?: boolean;
  connectedAt?: string;
}

export interface Sale {
  id: string;
  customerEmail: string;
  customerName?: string;
  amount: number;
  currency: string;
  licenseType: 'regular' | 'extended';
  licenseKey: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  stripePaymentId?: string;
}

export interface Stats {
  totalRevenue: string;
  totalSales: number;
  regularSales: number;
  extendedSales: number;
  averageOrderValue: string;
}

export interface ChartData {
  date: string;
  revenue: number;
  count: number;
}