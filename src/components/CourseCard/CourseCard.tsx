import Image from 'next/image';
import styles from '@/components/CourseCard/courseCard.module.css';

type CourseCardProps = {
  title: string;
  imageUrl: string;
  duration: number;
  timePerDay: string;
};

export default function CourseCard({
  title,
  imageUrl,
  duration,
  timePerDay,
}: CourseCardProps) {
  return (
    <div className={styles.card}>
      <button className={styles.plusButton}>+</button>
      <Image
        src={imageUrl}
        alt={title}
        width={360}
        height={280}
        className={styles.image}
      />
      <div className={styles.cardDown}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span>
              <svg>
                <use href="/img/icon/Calendar.svg" />
              </svg>
            </span>
            <span>{duration} дней</span>
          </div>
          <div className={styles.infoItem}>
            <span>
              <svg>
                <use href="/img/icon/Time.svg" />
              </svg>
            </span>
            <span>{timePerDay}</span>
          </div>
          <div className={styles.infoItem}>
            <span>
              <svg>
                <use href="/img/icon/Difficulty.svg" />
              </svg>
            </span>
            <span>Сложность</span>
          </div>
        </div>
      </div>
    </div>
  );
}
