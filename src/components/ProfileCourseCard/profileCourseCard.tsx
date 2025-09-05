import Image from 'next/image';
import styles from './profileCourseCard.module.css';
// ЧУТЬ ПОЗЖЕ ДОБАВИМ import { Course } from '@/types/api';, А ПОКА СТРИНГ

// 👇 2. Обновляем тип пропсов
type ProfileCourseCardProps = {
  course: string;
  imageUrl: string;
  progress: number;
};

export default function ProfileCourseCard({
  course,
  imageUrl,
  progress,
}: ProfileCourseCardProps) {
  const getButtonText = () => {
    if (progress === 100) return 'Начать заново';
    if (progress > 0) return 'Продолжить';
    return 'Начать тренировки';
  };

  return (
    <div className={styles.card}>
      <Image
        src={imageUrl}
        alt={course}
        width={360}
        height={310}
        className={styles.image}
      />
      <h3 className={styles.title}>{course}</h3>{' '}
      <div className={styles.progressContainer}>
        <p>Прогресс: {progress}%</p>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <button className={styles.actionButton}>{getButtonText()}</button>
    </div>
  );
}
