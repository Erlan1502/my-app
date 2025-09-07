import { authReducer, setAuthTokens, logout } from './authSlice';

describe('authSlice', () => {
  const initialState = {
    token: null,
    isAuthenticated: false,
    email: null,
  };

  it('Должно возвращать initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Должен обрабатывать setAuthTokens', () => {
    const payload = { token: 'test-token', email: 'test@example.com' };
    const actual = authReducer(initialState, setAuthTokens(payload));
    expect(actual.token).toEqual('test-token');
    expect(actual.email).toEqual('test@example.com');
    expect(actual.isAuthenticated).toBe(true);
  });

  it('Должен обрабатывать logout', () => {
    const stateWithAuth = {
      token: 'test-token',
      isAuthenticated: true,
      email: 'test@example.com',
    };
    const actual = authReducer(stateWithAuth, logout());
    expect(actual).toEqual(initialState);
  });
});
