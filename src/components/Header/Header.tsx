'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import AuthForm from '../AuthForm/AuthForm';
import UserInfo from '../UserInfo/UserInfo';

export default function Header() {
  const isLoggedIn = true; // Временно
  const userName = 'Сергей';
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              {isLoggedIn ? (
                <Link href="/fitness/profile" className={styles.logo}>
                  <div className={styles.userProfile}>
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
                </Link>
              ) : (
                <button
                  type="button"
                  className={styles.loginButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  Войти
                </button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {isModalOpen && <AuthForm onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
