import Link from 'next/link';
import styles from './userInfo.module.css';
import { UserProfile } from '@/types/api';
type User = UserProfile['user'];
interface UserProfileModal extends User {
  onLogout: () => void;
}

export default function UserInfo({ email, onLogout }: UserProfileModal) {
  return (
    <div className={styles.menu}>
      <p className={styles.email}>{email}</p>
      <Link
        href="/fitness/profile"
        className={`${styles.button} ${styles.primary}`}
      >
        Мой профиль
      </Link>
      <button
        onClick={onLogout}
        className={`${styles.button} ${styles.secondary}`}
      >
        Выйти
      </button>
    </div>
  );
}
