import Image from 'next/image';
import styles from './profileCourseCard.module.css';
import { CourseDetails } from '@/types/api';

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
      <h3 className={styles.title}>{course}</h3>
      <div className={styles.infoItem}>
        <span>
          <svg>
            <use href="/img/icon/Calendar.svg" />
          </svg>
        </span>
        <span>15 дней</span>
      </div>
      <div className={styles.infoItem}>
        <span>
          <svg>
            <use href="/img/icon/Time.svg" />
          </svg>
        </span>
        <span>15</span>
      </div>
      <div className={styles.infoItem}>
        <span>
          <svg>
            <use href="/img/icon/Difficulty.svg" />
          </svg>
        </span>
        <span>Сложность</span>
      </div>
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
