import { LoginRequest, LoginResponse, RegisterRequest, User } from '@repuestos-platform/types';
import { post, get } from './http';

export const authApi = {
  login: (data: LoginRequest): Promise<LoginResponse> => {
    return post<LoginResponse>('/api/v1/auth/login', data);
  },

  register: (data: RegisterRequest): Promise<User> => {
    return post<User>('/api/v1/auth/register', data);
  },

  refresh: (refreshToken: string): Promise<LoginResponse> => {
    return post<LoginResponse>('/api/v1/auth/refresh', { refreshToken });
  },

  getCurrentUser: (token: string): Promise<User> => {
    return get<User>('/api/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
