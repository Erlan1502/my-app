import Image from 'next/image';
import styles from '@/components/CourseCard/courseCard.module.css';
import { CourseDetailsStatic } from '@/types/api';
import { addUserCourse } from '@/api/courses/apiCourses';
import { useAppSelector } from '@/store/store';
import { MouseEvent } from 'react';

type CourseCard = CourseDetailsStatic & { courseId: string };

export default function CourseCard({
  nameRU,
  difficulty,
  durationInDays,
  dailyDurationInMinutes,
  imageUrl,
  courseId,
}: CourseCard) {
  const { token } = useAppSelector((state) => state.auth);

  const addCourse = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (token) {
      addUserCourse(courseId, token);
    }
  };

  return (
    <div className={styles.card}>
      <button className={styles.plusButton} onClick={addCourse}>
        +
      </button>
      <Image
        src={imageUrl ? imageUrl : ''}
        alt={nameRU}
        width={360}
        height={280}
        className={styles.image}
      />
      <div className={styles.cardDown}>
        <h3 className={styles.title}>{nameRU}</h3>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span>
              <svg>
                <use href="/img/icon/Calendar.svg" />
              </svg>
            </span>
            <span>{durationInDays} дней</span>
          </div>
          <div className={styles.infoItem}>
            <span>
              <svg>
                <use href="/img/icon/Time.svg" />
              </svg>
            </span>
            <span>
              {dailyDurationInMinutes.from}-{dailyDurationInMinutes.to}
              мин/день
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
      </div>
    </div>
  );
}
