'use client';

import styles from './profile.module.css';
import ProfileCourseCard from '@/components/ProfileCourseCard/profileCourseCard';
import { useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import { getAllCourses } from '@/api/courses/apiCourses';
import { Course } from '@/types/api';
import { clearAuthData, getUserProfile } from '@/api/auth/apiAuth';
import { getCourseProgress } from '@/api/workoutProgress/apiWorkoutProgress';
import { handleScrollToTop } from '@/utils/utilMethods';
import { useMobile } from '@/hooks/useMobile';

type CourseWithProgress = Course & {
  progress: number;
};

const courseImages: { [key: string]: string } = {
  Yoga: '/img/Yoga.png',
  Stretching: '/img/Stretching.png',
  Fitness: '/img/Fitness.png',
  StepAirobic: '/img/Step-aerobic.png',
  BodyFlex: '/img/Body-flex.png',
};

export default function ProfilePage() {
  const { email, token } = useAppSelector((state) => state.auth);

  const { allCourses } = useAppSelector((state) => state.courses);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [myCourses, setMyCourses] = useState<CourseWithProgress[]>([]);
  const isMobile = useMobile('(max-width: 375px)');
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);

      try {
        let coursesData = allCourses;

        if (!coursesData.length) {
          coursesData = await getAllCourses();
        }

        if (token) {
          const userProfile = await getUserProfile(token);

          const filteredCourses = coursesData.filter((course) =>
            userProfile.user.selectedCourses.includes(course._id)
          );

          const cursesProgressData = await Promise.all(
            filteredCourses.map(({ _id }) => getCourseProgress(_id, token))
          );

          const coursesWithProgress: CourseWithProgress[] = filteredCourses.map(
            (course) => {
              const courseProgress = cursesProgressData.find(
                ({ courseId }) => courseId === course._id
              );

              let progress = 0;

              if (courseProgress && courseProgress.workoutsProgress) {
                const workoutCount = course.workouts.length;
                const completedCount = courseProgress.workoutsProgress.filter(
                  ({ workoutCompleted }) => workoutCompleted
                ).length;

                progress = Math.floor((completedCount / workoutCount) * 100);
              }

              return { ...course, progress };
            }
          );

          setMyCourses(coursesWithProgress);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка загрузки');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [allCourses, token]);

  const removeCourse = (id: string) => {
    setMyCourses((courses) => courses.filter((course) => course._id !== id));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Профиль</h1>

      <div className={styles.profileBlock}>
        {isMobile ? (
          <div className={styles.profileBlockCenterAvatar}>
            <svg>
              <use href="/img/icon/MobileMask.svg"></use>
            </svg>
          </div>
        ) : (
          <div className={styles.avatar} />
        )}
        <div className={styles.userInfo}>
          <h2>{email}</h2>
          <p>Логин: {email}</p>
        </div>
        {isMobile ? (
          <div className={styles.logoutButtonCenter}>
            <button className={styles.logoutButton} onClick={clearAuthData}>
              Выйти
            </button>
          </div>
        ) : (
          <button className={styles.logoutButton} onClick={clearAuthData}>
            Выйти
          </button>
        )}
      </div>

      <h2 className={styles.coursesTitle}>Мои курсы</h2>

      {isLoading && <div className={styles.loader}>Загрузка...</div>}

      {error && <p>Ошибка: {error}</p>}

      <div className={styles.grid}>
        {myCourses.map((course) => (
          <ProfileCourseCard
            key={course._id}
            nameRU={course.nameRU}
            imageUrl={courseImages[course.nameEN]}
            durationInDays={course.durationInDays}
            dailyDurationInMinutes={course.dailyDurationInMinutes}
            difficulty={course.difficulty}
            progress={course.progress}
            courseId={course._id}
            onRemoved={removeCourse}
          />
        ))}
      </div>
      {isMobile ? (
        <div className={styles.footer}>
          <div className={styles.footerButton} onClick={handleScrollToTop}>
            Наверх ↑
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
