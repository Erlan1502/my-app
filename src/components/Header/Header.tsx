'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import AuthForm from '../AuthForm/AuthForm';
import UserInfo from '../UserInfo/UserInfo';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { logout } from '@/store/features/authSlice';

export default function Header() {
  const { isAuthenticated, email } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const userName = email;

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.containerLeft}>
            <Link href="/" className={styles.logo}>
              <svg width="230" height="35">
                <use href="/img/icon/logo.svg" />
              </svg>
            </Link>
          </div>

          <div className={styles.containerRight}>
            <nav>
              {isAuthenticated ? (
                <div className={styles.userProfileWrapper}>
                  <div
                    className={styles.userProfile}
                    onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className={styles.avatar}>
                      <svg>
                        <use href="/img/icon/Profile.svg"></use>
                      </svg>
                    </div>
                    <span className={styles.userName}>{userName}</span>
                    <svg>
                      <use href="/img/icon/DownChevron.svg"></use>
                    </svg>
                  </div>
                  {isUserMenuOpen && (
                    <UserInfo
                      email={email || 'email@example.com'}
                      onLogout={handleLogout}
                      selectedCourses={[]}
                    />
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={() => setAuthModalOpen(true)}
                >
                  Войти
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {isAuthModalOpen && <AuthForm onClose={() => setAuthModalOpen(false)} />}
    </>
  );
}
