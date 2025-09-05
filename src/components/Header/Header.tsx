import React from 'react';
import Link from 'next/link';
import styles from '@/components/Header/header.module.css';

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Header() {
  const isLoggedIn = true;
  const userName = 'Сергей';

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.containerLeft}>
          <Link href="/" className={styles.logo}>
            <svg>
              <use href="/img/icon/logo.svg" />
            </svg>
          </Link>
          <div className="styles.description">
            Онлайн-тренировки для занятий дома
          </div>
        </div>

        <div className={styles.containerRight}>
          <nav>
            {isLoggedIn ? (
              <div className={styles.userProfile}>
                <div className={styles.avatar}>
                  <UserIcon />
                </div>
                <span className={styles.userName}>{userName}</span>
                <ChevronDownIcon />
              </div>
            ) : (
              <button type="button" className={styles.loginButton}>
                Войти
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
