export interface Price {
  id: string;
  productId: string;
  amount: number;
  currency: string;
  cost?: number;
  margin?: number;
  validFrom: string;
  validTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PriceCreate {
  productId: string;
  amount: number;
  currency: string;
  cost?: number;
  margin?: number;
  validFrom: string;
  validTo?: string;
}

export interface PriceUpdate {
  amount?: number;
  currency?: string;
  cost?: number;
  margin?: number;
  validTo?: string;
}
