import Image from 'next/image';
import styles from './profileCourseCard.module.css';
import { CourseDetailsStatic } from '@/types/api';

type ProfileCourseCardProps = CourseDetailsStatic & {
  progress: number;
};

export default function ProfileCourseCard({
  nameRU,
  durationInDays,
  dailyDurationInMinutes,
  difficulty,
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
        src={imageUrl ? imageUrl : ''}
        alt={nameRU}
        width={360}
        height={310}
        className={styles.image}
      />
      <div className={styles.cardDown}>
        <h3 className={styles.title}>{nameRU}</h3>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span>
              <svg width="18" height="18">
                <use href="/img/icon/Calendar.svg" />
              </svg>
            </span>
            <span>{durationInDays} дней</span>
          </div>
          <div className={styles.infoItem}>
            <span>
              <svg width="18" height="18">
                <use width="18" height="18" href="/img/icon/Time.svg" />
              </svg>
            </span>
            <span>
              {dailyDurationInMinutes.from}-{dailyDurationInMinutes.to} мин/день
            </span>
          </div>
          <div className={styles.infoItem}>
            <span>
              {difficulty === 'сложный' ? (
                <svg>
                  <use href="/img/icon/Difficulty.svg" />
                </svg>
              ) : null}{' '}
              {/*ВОЗМОЖНО ДОБАВИМ РАЗНЫЕ СЛОЖНОСТИ*/}
            </span>
            <span>Сложность</span>
          </div>
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
    </div>
  );
}
