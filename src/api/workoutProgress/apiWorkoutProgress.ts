import { CourseProgress, Workout, WorkoutProgress } from '../../types/api';
import { fetchApi } from '../fetchApi';
export const getWorkoutById = async (workoutId: string, token: string) => {
  return fetchApi<Workout>(`/workouts/${workoutId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getCourseProgress = async (courseId: string, token: string) => {
  return fetchApi<CourseProgress>(`/users/me/progress?courseId=${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getWorkoutProgress = async (
  courseId: string,
  workoutId: string,
  token: string
) => {
  return fetchApi<WorkoutProgress>(
    `/users/me/progress?courseId=${courseId}&workoutId=${workoutId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const saveWorkoutProgress = async (
  courseId: string,
  workoutId: string,
  progressData: number[],
  token: string
) => {
  return fetchApi<void>(`/courses/${courseId}/workouts/${workoutId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ progressData }),
  });
};

export const resetWorkoutProgress = async (
  courseId: string,
  workoutId: string,
  token: string
) => {
  return fetchApi<{ message: string }>(
    `/courses/${courseId}/workouts/${workoutId}/reset`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
