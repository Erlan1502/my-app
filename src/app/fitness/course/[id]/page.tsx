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
import Link from 'next/link';
import { courseImages, courseImagesMobile } from '@/utils/images';
import { useMobile } from '@/hooks/useMobile';

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  const [courseData, setCourseData] = useState<CourseDetails | null>(null);
  const [isCourseAdded, setIsCourseAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const isMobile = useMobile('(max-width: 375px)');
  useEffect(() => {
    if (!params.id) return;

    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCourseById(params.id as string);
        setCourseData(data);

        if (token) {
          const userProfile = await getUserProfile(token);

          if (userProfile.user.selectedCourses.includes(params.id as string)) {
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
      await addUserCourse(params.id as string, token);
      setIsCourseAdded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось добавить курс');
    }
  };

  const getButtonText = () => {
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

  const images = isMobile
    ? courseImagesMobile[courseData.nameEN]
    : courseImages[courseData.nameEN];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          {isMobile ? (
            <Image
              src={images.hero}
              alt={courseData.nameRU}
              width={360}
              height={310}
              className={styles.heroImage}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '30px',
              }}
            />
          ) : (
            <Image
              src={images.hero}
              alt={courseData.nameRU}
              width={800}
              height={250}
              className={styles.heroImage}
            />
          )}
        </div>
        {isMobile ? (
          <h1 className={styles.title}>Подойдет для вас если:</h1>
        ) : (
          <h1 className={styles.title}>{courseData.nameRU}</h1>
        )}

        <div className={styles.infoCards}>
          {courseData.fitting.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.number}>{index + 1}</div>
              <div className={styles.description}>{item}</div>
            </div>
          ))}
        </div>

        <div className={styles.directions}>
          <p className={styles.subTitle}>Направления</p>
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
          {isMobile ? (
            <div className={styles.absoluteImage1}>
              <Image
                src="/img/Man-ready.png"
                alt="Мужчина на старте"
                width={334}
                height={347}
              />
            </div>
          ) : (
            ''
          )}
          {isMobile ? (
            <div className={styles.absoluteImage2}>
              <Image
                src="/img/Style-Man-ready.svg"
                alt="Стильная линия для мужчины"
                width={600}
                height={600}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.startSection}>
          <div className={styles.motivation}>
            <h2 className={styles.subTitle}>Начните путь к новому телу</h2>
            <ul className={styles.benefitsList}>
              <li className={styles.benefitItem}>проработка всех групп мышц</li>
              <li className={styles.benefitItem}>тренировка суставов</li>
              <li className={styles.benefitItem}>улучшение циркуляции крови</li>
              <li className={styles.benefitItem}>
                упражнения заряжают бодростью
              </li>
              <li className={styles.benefitItem}>
                помогают противостоять стрессам
              </li>
            </ul>
            {isCourseAdded && token ? (
              <Link href="/fitness/profile">
                <button className={styles.startButton}>
                  Перейти в профиль
                </button>
              </Link>
            ) : (
              <button className={styles.startButton} onClick={handleAddCourse}>
                {getButtonText()}
              </button>
            )}
          </div>
          <div className={styles.absoluteImage1}>
            {isMobile ? (
              ''
            ) : (
              <Image
                src="/img/Man-ready.png"
                alt="Мужчина на старте"
                width={520}
                height={530}
              />
            )}
          </div>
          <div className={styles.clippingWrapper}>
            <div className={styles.absoluteImage2}>
              {isMobile ? (
                ''
              ) : (
                <Image
                  src="/img/Style-Man-ready.svg"
                  alt="Стильная линия для мужчины"
                  width={600}
                  height={600}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isAuthModalOpen && <AuthForm onClose={() => setAuthModalOpen(false)} />}
    </>
  );
}
