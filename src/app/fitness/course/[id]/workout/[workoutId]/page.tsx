'use client';

import { useEffect, useState } from 'react';
import { Workout } from '@/types/api';
import styles from './workout.module.css';
import MyProgressForm from '@/components/MyProgressForm/MyProgressForm';
import { getWorkoutById } from '@/api/workoutProgress/apiWorkoutProgress';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/store/store';

export default function WorkoutPage() {
  const params = useParams<{ id: string; workoutId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [workoutData, setWorkoutData] = useState<Workout | null>(null);
  const [progressValues, setProgressValues] = useState<number[]>([]);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      getWorkoutById(params.workoutId, token)
        .then((response) => {
          setWorkoutData(response);
          setProgressValues(new Array(response.exercises.length).fill(0));
        })
        .finally(() => setIsLoading(false));
    }
  }, [params.workoutId, token]);

  if (isLoading) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (!workoutData) {
    return <div className={styles.error}>Тренировка не найдена</div>;
  }

  const handleSaveProgress = (newProgress: number[]) => {
    setProgressValues(newProgress);
    setIsProgressModalOpen(false);
  };

  const hasProgress = progressValues.some((value) => value > 0);
  const buttonText = hasProgress
    ? 'Обновить свой прогресс'
    : 'Заполнить свой прогресс';

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>{workoutData.name}</h1>
        <div className={styles.videoPlayerContainer}>
          <iframe
            src={workoutData.video}
            className={styles.videoPlayer}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={workoutData.name}
            style={{ border: 0, width: '100%', height: '650px' }}
          ></iframe>
        </div>
        <div className={styles.exercisesBlock}>
          <h2 className={styles.exercisesTitle}>{workoutData.name}</h2>
          <div className={styles.exercisesGrid}>
            {workoutData.exercises.map((exercise, index) => {
              const progressPercent =
                exercise.quantity > 0
                  ? Math.round(
                      (progressValues[index] / exercise.quantity) * 100
                    )
                  : 0;

              return (
                <div key={exercise._id} className={styles.exerciseItem}>
                  <p className={styles.exerciseName}>
                    {`${exercise.name} ${progressPercent}%`}
                  </p>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className={styles.actionButton}
            onClick={() => setIsProgressModalOpen(true)}
          >
            {buttonText}
          </button>
        </div>
      </div>
      {isProgressModalOpen && (
        <MyProgressForm
          exercises={workoutData.exercises}
          currentProgress={progressValues}
          onClose={() => setIsProgressModalOpen(false)}
          onSave={handleSaveProgress}
        />
      )}
    </>
  );
}
