'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './course.module.css';
import { getCourseById, addUserCourse } from '@/api/courses/apiCourses';
import { getUserProfile } from '@/api/auth/apiAuth';
import { CourseDetails } from '@/types/api';
import { useAppSelector } from '@/store/store';
import AuthForm from '@/components/AuthForm/AuthForm';

// Объект для сопоставления названий курсов с изображениями
const courseImages: { [key: string]: { hero: string; start: string } } = {
  Йога: {
    hero: '/img/Yoga-skill-card.png',
    start: '/img/ManDoingYoga.png',
  },
  Стретчинг: {
    hero: '/img/Stretching-skill-card.png',
    start: '/img/Stretching-start.png',
  },
  Фитнес: {
    hero: '/img/Fitness-skill-card.png',
    start: '/img/Fitness-start.png',
  },
  'Степ-аэробика': {
    hero: '/img/Step-aerobic-skill-card.png',
    start: '/img/Step-aerobic-start.png',
  },
  Бодифлекс: {
    hero: '/img/Bodyflex-skill-card.png',
    start: '/img/Body-flex-start.png',
  },
};

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  const [courseData, setCourseData] = useState<CourseDetails | null>(null);
  const [isCourseAdded, setIsCourseAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!params.id) return;

    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Получаем данные самого курса
        const data = await getCourseById(params.id as string);
        setCourseData(data);

        // Если пользователь авторизован, проверяем, добавлен ли у него этот курс
        if (token) {
          const userProfile = await getUserProfile(token);
          if (userProfile.selectedCourses.includes(params.id as string)) {
            setIsCourseAdded(true);
          }
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Не удалось загрузить курс'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [params.id, token]);

  const handleAddCourse = async () => {
    if (!isAuthenticated || !token) {
      setAuthModalOpen(true);
      return;
    }

    if (!params.id || isCourseAdded) return;

    try {
      await addUserCourse(params.id as string, token); //
      setIsCourseAdded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось добавить курс');
    }
  };

  const getButtonText = () => {
    if (isCourseAdded) return 'Перейти в профиль';
    if (isAuthenticated) return 'Добавить курс';
    return 'Войдите, чтобы добавить курс';
  };

  if (isLoading) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка: {error}</div>;
  }

  if (!courseData) {
    return <div className={styles.error}>Курс не найден</div>;
  }

  // Получаем пути к изображениям из нашего объекта
  const images = courseImages[courseData.nameRU] || {
    hero: '/img/default-hero.png',
    start: '/img/default-start.png',
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          <Image
            src={images.hero}
            alt={courseData.nameRU}
            width={800}
            height={250}
            className={styles.heroImage}
          />
        </div>

        <h1 className={styles.title}>{courseData.nameRU}</h1>

        <div className={styles.infoCards}>
          {courseData.fitting.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.number}>{index + 1}</div>
              <div className={styles.description}>{item}</div>
            </div>
          ))}
        </div>

        <div className={styles.directions}>
          <h2 className={styles.subTitle}>Направления</h2>
          <div className={styles.directionsGrid}>
            {courseData.directions.map((dir) => (
              <div key={dir} className={styles.directionItem}>
                <div>
                  <svg width={26} height={26}>
                    <use href="/img/icon/Star.svg"></use>
                  </svg>
                </div>
                <div>{dir}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.startSection}>
          <div>
            <h2 className={styles.subTitle}>Начните путь к новому телу</h2>
            <ul className={styles.benefitsList}>
              <li>проработка всех групп мышц</li>
              <li>тренировка суставов</li>
              <li>улучшение циркуляции крови</li>
              <li>упражнения заряжают бодростью</li>
              <li>помогают противостоять стрессам</li>
            </ul>
            <button
              className={styles.startButton}
              onClick={handleAddCourse}
              disabled={isCourseAdded}
            >
              {getButtonText()}
            </button>
          </div>
          <div>
            <Image
              src={images.start}
              alt="Мужчина занимается йогой"
              width={400}
              height={400}
              className={styles.startImage}
            />
          </div>
        </div>
      </div>
      {isAuthModalOpen && <AuthForm onClose={() => setAuthModalOpen(false)} />}
    </>
  );
}
