'use client';

import { useState, useEffect, useRef } from 'react';
import { Exercise } from '@/types/api';
import styles from './myProgressForm.module.css';

type MyProgressFormProps = {
  exercises: Exercise[];
  currentProgress: number[];
  onClose: () => void;
  onSave: (newProgress: number[]) => void;
};

export default function MyProgressForm({
  exercises,
  currentProgress,
  onClose,
  onSave,
}: MyProgressFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [progressInputs, setProgressInputs] =
    useState<number[]>(currentProgress);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...progressInputs];
    const numericValue = parseInt(value, 10);
    newInputs[index] = isNaN(numericValue) ? 0 : numericValue;
    setProgressInputs(newInputs);
  };

  const handleSave = () => {
    onSave(progressInputs);
  };

  return (
    <div className={styles.modalOverlay}>
      <div ref={modalRef} className={styles.modalContent}>
        <h2 className={styles.title}>Мой прогресс</h2>
        <div className={styles.form}>
          {exercises.map((exercise, index) => (
            <div key={exercise._id} className={styles.inputGroup}>
              <label className={styles.label}>
                {`Сколько раз вы сделали ${exercise.name.toLowerCase()}?`}
              </label>
              <input
                type="number"
                className={styles.input}
                value={progressInputs[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button className={styles.saveButton} onClick={handleSave}>
          Сохранить
        </button>
      </div>
    </div>
  );
}
