'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './course.module.css';
import { getCourseById } from '@/api/courses/apiCourses';
import { CourseDetails } from '@/types/api';
import Image from 'next/image';

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<CourseDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;

    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCourseById(params.id as string);
        setCourseData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Не удалось загрузить курс'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

  if (isLoading) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!courseData) {
    return <div className={styles.error}>Курс не найден</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Image
          src="/img/Yoga.png"
          alt={courseData.nameRU}
          width={800}
          height={250}
          className={styles.heroImage}
        />
      </div>

      <h1 className={styles.title}>{courseData.nameRU}</h1>

      <div className={styles.infoCards}>
        <div className={styles.card}>
          <span>1</span>Давно хотели попробовать йогу, но не решались начать
        </div>
        <div className={styles.card}>
          <span>2</span>Хотите укрепить позвоночник, избавиться от болей в спине
          и суставах
        </div>
        <div className={styles.card}>
          <span>3</span>Ищете активность, полезную для тела и души
        </div>
      </div>

      <div className={styles.directions}>
        <h2 className={styles.subTitle}>Направления</h2>
        <div className={styles.directionsGrid}>
          {courseData.directions.map((dir) => (
            <div key={dir} className={styles.directionItem}>
              + {dir}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.startSection}>
        <div>
          <h2 className={styles.subTitle}>Начните путь к новому телу</h2>
          <ul className={styles.benefitsList}>
            {courseData.fitting.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button className={styles.startButton}>
            Войдите, чтобы добавить курс
          </button>
        </div>
        <div>
          <Image
            src="/img/ManDoingYoga.png"
            alt="Мужчина занимается йогой"
            width={400}
            height={400}
            className={styles.startImage}
          />
        </div>
      </div>
    </div>
  );
}
