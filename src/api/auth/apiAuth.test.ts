import { loginUser, registerUser } from './apiAuth';
import { AuthPayload } from '@/types/local';

global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('apiAuth functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('loginUser', () => {
    it('должен успешно авторизовать пользователя и вернуть токен', async () => {
      const mockToken = { token: 'fake-jwt-token' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockToken,
        headers: new Headers(),
        status: 200,
      });

      const userData: AuthPayload = {
        email: 'Erlan@example.com',
        password: 'Erlan120312',
      };
      const result = await loginUser(userData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://wedev-api.sky.pro/api/fitness/auth/login',
        expect.any(Object)
      );
      expect(result).toEqual(mockToken);
    });

    it('должен выбросить ошибку при неудачной авторизации', async () => {
      const errorMessage = 'Неверный пароль';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
        headers: new Headers(),
        status: 401,
      });

      const userData: AuthPayload = {
        email: 'Erlan@example.com',
        password: 'Erlan120312',
      };

      await expect(loginUser(userData)).rejects.toThrow(errorMessage);
    });
  });

  // Тесты для registerUser
  describe('registerUser', () => {
    it('должен успешно зарегистрировать пользователя и вернуть сообщение', async () => {
      const successMessage = { message: 'Регистрация прошла успешно!' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => successMessage,
        headers: new Headers(),
        status: 201,
      });

      const userData: AuthPayload = {
        email: 'Erlan@example.com',
        password: 'Erlan120312',
      };
      const result = await registerUser(userData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://wedev-api.sky.pro/api/fitness/auth/register',
        expect.any(Object)
      );
      expect(result).toEqual(successMessage);
    });

    it('должен выбросить ошибку, если пользователь уже существует', async () => {
      const errorMessage = 'Пользователь с таким email уже существует';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
        headers: new Headers(),
        status: 400,
      });

      const userData: AuthPayload = {
        email: 'Erlan@example.com',
        password: 'Erlan120312',
      };

      await expect(registerUser(userData)).rejects.toThrow(errorMessage);
    });
  });
});
