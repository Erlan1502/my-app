import { UserProfile } from '../../types/api';
import { fetchApi } from '../fetchApi';
import { AuthPayload, AuthPayloadReturn } from '@/types/local';
export const registerUser = async (
  data: AuthPayload
): Promise<AuthPayloadReturn> => {
  return fetchApi<{ message: string }>('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const loginUser = async (data: AuthPayload) => {
  return fetchApi<{ token: string }>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const getUserProfile = async (token: string): Promise<UserProfile> => {
  return fetchApi<UserProfile>('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
