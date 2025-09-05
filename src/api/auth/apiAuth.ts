import { UserProfile } from '../../types/api';
import { fetchApi } from '../fetchApi';
export const registerUser = async (body: Record<string, string>) => {
  return fetchApi<{ message: string }>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

export const loginUser = async (body: Record<string, string>) => {
  return fetchApi<{ token: string }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
};

export const getUserProfile = async (token: string) => {
  return fetchApi<UserProfile>('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
