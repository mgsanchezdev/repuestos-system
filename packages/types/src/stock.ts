export interface Stock {
  id: string;
  productId: string;
  quantity: number;
  reserved: number;
  available: number;
  location?: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason?: string;
  reference?: string;
  createdAt: string;
}

export interface StockMovementCreate {
  productId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason?: string;
  reference?: string;
}
