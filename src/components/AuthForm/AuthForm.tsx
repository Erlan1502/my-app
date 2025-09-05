'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './authForm.module.css';
import Link from 'next/link';

type AuthFormProps = {
  onClose: () => void;
};

export default function AuthForm({ onClose }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ДОБАВИТЬ ЛОГИКУ АПИ
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
              placeholder="Логин"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Повторите пароль"
                className={styles.input}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            )}
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.buttons}>
            {isLogin ? (
              <>
                <button type="submit" className={styles.buttonPrimary}>
                  Войти
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
                <button type="submit" className={styles.buttonPrimary}>
                  Зарегистрироваться
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
