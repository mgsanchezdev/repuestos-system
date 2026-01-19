export interface Product {
  id: string;
  sku: string;
  name: string;
  description?: string;
  category?: string;
  brand?: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductCreate {
  sku: string;
  name: string;
  description?: string;
  category?: string;
  brand?: string;
  images?: string[];
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  category?: string;
  brand?: string;
  images?: string[];
}
