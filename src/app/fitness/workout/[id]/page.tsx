'use client';

import { useState } from 'react';
import { Workout } from '@/types/api';
import styles from './workout.module.css';
import ProgressForm from '../../../../components/ProgressForm/ProgressForm';

const mockWorkoutData: Workout = {
  _id: 'mock123',
  name: 'Йога',
  video: 'https://www.youtube.com/embed/Jom-jxUEqJg',
  exercises: [
    { _id: 'ex1', name: 'Наклоны вперед', quantity: 10 },
    { _id: 'ex2', name: 'Наклоны назад', quantity: 10 },
    { _id: 'ex3', name: 'Поднятие ног, согнутых в коленях', quantity: 15 },
    { _id: 'ex4', name: 'Крендель', quantity: 10 },
    { _id: 'ex5', name: 'Скручивания', quantity: 20 },
    { _id: 'ex6', name: 'Пресс', quantity: 15 },
  ],
};

export default function WorkoutPage() {
  const [workoutData] = useState<Workout | null>(mockWorkoutData);
  const [progressValues, setProgressValues] = useState<number[]>(
    new Array(mockWorkoutData.exercises.length).fill(0)
  );

  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  if (!workoutData) {
    return <div className={styles.error}>Тренировка не найдена</div>;
  }

  const handleSaveProgress = (newProgress: number[]) => {
    setProgressValues(newProgress);
    setIsProgressModalOpen(false);
  };

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
          <h2 className={styles.exercisesTitle}>Упражнения тренировки 2</h2>
          <div className={styles.exercisesGrid}>
            {workoutData.exercises.map((exercise, index) => {
              const progressPercent = Math.round(
                (progressValues[index] / exercise.quantity) * 100
              );
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
            Заполнить свой прогресс
          </button>
        </div>
      </div>
      {isProgressModalOpen && (
        <ProgressForm
          exercises={workoutData.exercises}
          currentProgress={progressValues}
          onClose={() => setIsProgressModalOpen(false)}
          onSave={handleSaveProgress}
        />
      )}
    </>
  );
}
