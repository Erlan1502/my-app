'use client';

import { useState, useEffect, useRef } from 'react';
import { Exercise } from '@/types/api';
import styles from './progressForm.module.css';

type ProgressFormProps = {
  exercises: Exercise[];
  currentProgress: number[];
  onClose: () => void;
  onSave: (newProgress: number[]) => void;
};

export default function ProgressForm({
  exercises,
  currentProgress,
  onClose,
  onSave,
}: ProgressFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [completedExercises, setCompletedExercises] = useState<boolean[]>(() =>
    exercises.map((ex, i) => currentProgress[i] >= ex.quantity)
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleToggleComplete = (index: number) => {
    const newCompleted = [...completedExercises];
    newCompleted[index] = !newCompleted[index];
    setCompletedExercises(newCompleted);
  };

  const handleSave = () => {
    const newProgress = exercises.map((ex, i) =>
      completedExercises[i] ? ex.quantity : 0
    );
    onSave(newProgress);
  };

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <h2 className={styles.title}>Выберите тренировку</h2>
        <div className={styles.exercisesList}>
          {exercises.map((exercise, index) => (
            <div
              key={exercise._id}
              className={styles.exerciseItem}
              onClick={() => handleToggleComplete(index)}
            >
              <div
                className={`${styles.checkbox} ${
                  completedExercises[index] ? styles.checked : ''
                }`}
              >
                {completedExercises[index] && (
                  <svg className={styles.checkIcon} viewBox="0 0 13 10">
                    <path
                      d="M11.5833 1L4.58333 8.5L1.41667 5.16667"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className={styles.exerciseName}>{exercise.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.saveButton} onClick={handleSave}>
          Начать
        </div>
      </div>
    </div>
  );
}
