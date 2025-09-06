'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './authForm.module.css';
import Link from 'next/link';
import { loginUser, registerUser } from '../../api/auth/apiAuth';
import { useAppDispatch } from '@/store/store';
import { setAuthTokens } from '../../store/features/authSlice';

type AuthFormProps = {
  onClose: () => void;
};

export default function AuthForm({ onClose }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const body = { email, password };

    try {
      if (isLogin) {
        const data = await loginUser(body);
        dispatch(setAuthTokens({ token: data.token, email: email }));
        onClose();
      } else {
        if (password !== repeatPassword) {
          setError('Пароли не совпадают');
          setIsLoading(false);
          return;
        }
        await registerUser(body);
        setIsLogin(true);
        setPassword('');
        setRepeatPassword('');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <svg width="230" height="35">
              <use href="/img/icon/logo.svg" />
            </svg>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <input
              type="email"
              placeholder="E-mail"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Повторите пароль"
                className={styles.input}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
            )}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.buttons}>
            {isLogin ? (
              <>
                <button
                  type="submit"
                  className={styles.buttonPrimary}
                  disabled={isLoading}
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError(null);
                  }}
                  className={styles.buttonSecondary}
                >
                  Зарегистрироваться
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className={styles.buttonPrimary}
                  disabled={isLoading}
                >
                  {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError(null);
                  }}
                  className={styles.buttonSecondary}
                >
                  Войти
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
