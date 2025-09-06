'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getAllCourses } from '@/api/courses/apiCourses';
import {
  setAllCourses,
  setLoading,
  setError,
} from '@/store/features/coursesSlice';
import styles from './main.module.css';
import CourseCard from '@/components/CourseCard/CourseCard';
import { Course } from '@/types/api';

const courseImages: { [key: string]: string } = {
  Йога: '/img/Yoga.png',
  Стретчинг: '/img/Stretching.png',
  Фитнес: '/img/Fitness.png',
  'Степ-аэробика': '/img/Step-aerobic.png',
  Бодифлекс: '/img/Body-flex.png',
};

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { allCourses, isLoading, error } = useAppSelector(
    (state) => state.courses
  );

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const coursesData = await getAllCourses();
        dispatch(setAllCourses(coursesData));
      } catch (err) {
        dispatch(
          setError(err instanceof Error ? err.message : 'Ошибка загрузки')
        );
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (allCourses.length === 0) {
      fetchCourses();
    }
  }, [dispatch, allCourses.length]);

  const renderContent = () => {
    if (isLoading) {
      return <p>Загрузка курсов...</p>;
    }

    if (error) {
      return <p>Ошибка: {error}</p>;
    }

    return (
      <div className={styles.grid}>
        {allCourses.map((course: Course) => (
          <Link href={`/fitness/course/${course._id}`} key={course._id}>
            <CourseCard
              nameRU={course.nameRU}
              imageUrl={courseImages[course.nameRU]}
              durationInDays={course.durationInDays}
              dailyDurationInMinutes={course.dailyDurationInMinutes}
              difficulty={course.difficulty}
            />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.description}>
        Онлайн-тренировки для занятий дома
      </div>
      <div className={styles.hero}>
        <div className={styles.title}>
          Начните заниматься спортом и улучшите качество жизни
        </div>
        <div className={styles.motivation}>
          <svg width="288" height="120">
            <use href="/img/ChangeYourBody.svg"></use>
          </svg>
        </div>
      </div>

      {renderContent()}

      <div className={styles.footer}>
        <div className={styles.footerButton}>Наверх ↑</div>
      </div>
    </div>
  );
}
