import styles from './page.module.css';
import ProfileCourseCard from '@/components/ProfileCourseCard/profileCourseCard';

export default function ProfilePage() {
  const user = {
    name: 'Сергей',
    login: 'sergey.petrov96',
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль</h1>

      <div className={styles.profileBlock}>
        <div className={styles.avatar} />
        <div className={styles.userInfo}>
          <h2>{user.name}</h2>
          <p>Логин: {user.login}</p>
          <button className={styles.logoutButton}>Выйти</button>
        </div>
      </div>

      <h2 className={styles.coursesTitle}>Мои курсы</h2>

      <div className={styles.grid}>
        <ProfileCourseCard
          course="Йога"
          imageUrl="/img/Yoga.png"
          progress={40}
        />
        <ProfileCourseCard
          course="Стретчинг"
          imageUrl="/img/Stretching.png"
          progress={0}
        />
        <ProfileCourseCard
          course="Фитнес"
          imageUrl="/img/Fitness.png"
          progress={100}
        />
      </div>
    </div>
  );
}
