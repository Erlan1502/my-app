'use client';

import { useState, useEffect, useRef } from 'react';
import { Workout } from '@/types/api';
import styles from './progressForm.module.css';
import Image from 'next/image';
import { getCourseWorkouts } from '@/api/courses/apiCourses';
import { useAppSelector } from '@/store/store';
import { getCourseProgress } from '@/api/workoutProgress/apiWorkoutProgress';
import Link from 'next/link';

type ProgressFormProps = {
  courseId: string;
  onClose: () => void;
};

export default function ProgressForm({
  courseId,
  onClose,
}: ProgressFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const { token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      Promise.all([
        getCourseWorkouts(courseId, token),
        getCourseProgress(courseId, token),
      ]).then(([responseWorkouts, responseProgress]) => {
        setWorkouts(responseWorkouts);

        const completedWorkouts = responseProgress.workoutsProgress
          ?.filter((workout) => workout.workoutCompleted === true)
          .map((workout) => workout.workoutId);

        setCompletedWorkouts(completedWorkouts || []);
      });
    }
  }, [courseId, token])

  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)

  const handleToggleComplete = (id: string) => {
    setSelectedWorkout(id);
  };

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <h2 className={styles.title}>Выберите тренировку</h2>
        <div className={styles.workoutsList}>
          {workouts.map((workout) => {
            const isCompleted = completedWorkouts.includes(workout._id);

            return (
              <div
                key={workout._id}
                className={styles.workoutItem}
                onClick={isCompleted ? undefined : () => handleToggleComplete(workout._id)}
              >
                <div
                  className={`${styles.checkbox} ${
                    isCompleted || (selectedWorkout === workout._id) ? styles.checked : ''
                  }`}
                >
                  {(isCompleted || (selectedWorkout === workout._id)) && (
                    <Image
                      src="/img/icon/Check-in-Circle.svg"
                      alt="Выполнено"
                      width={26}
                      height={26}
                      className={styles.checkIcon}
                    />
                  )}
                </div>
                <span className={styles.workoutName}>{workout.name}</span>
              </div>
            )
          })}
        </div>
        <Link href={`/fitness/workout/${selectedWorkout}`}>
          <div className={styles.saveButton}>
            Начать
          </div>
        </Link>
      </div>
    </div>
  );
}
