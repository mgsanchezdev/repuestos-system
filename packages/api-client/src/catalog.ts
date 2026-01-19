import {
  Product,
  ProductCreate,
  ProductUpdate,
} from '@repuestos-platform/types';
import { get, post, put, del } from './http';

export const catalogApi = {
  listProducts: (): Promise<Product[]> => {
    return get<Product[]>('/api/v1/catalog/products');
  },

  getProduct: (id: string): Promise<Product> => {
    return get<Product>(`/api/v1/catalog/products/${id}`);
  },

  createProduct: (data: ProductCreate): Promise<Product> => {
    return post<Product>('/api/v1/catalog/products', data);
  },

  updateProduct: (id: string, data: ProductUpdate): Promise<Product> => {
    return put<Product>(`/api/v1/catalog/products/${id}`, data);
  },

  deleteProduct: (id: string): Promise<void> => {
    return del<void>(`/api/v1/catalog/products/${id}`);
  },
};
