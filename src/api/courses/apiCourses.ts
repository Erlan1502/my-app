import { Course, CourseDetails, Workout } from '../../types/api';
import { fetchApi } from '../fetchApi';
export const getAllCourses = async () => {
  return fetchApi<Course[]>('/courses');
};

export const getCourseById = async (courseId: string) => {
  return fetchApi<CourseDetails>(`/courses/${courseId}`);
};

export const getCourseWorkouts = async (courseId: string, token: string) => {
  return fetchApi<Workout[]>(`/courses/${courseId}/workouts`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addUserCourse = async (courseId: string, token: string) => {
  return fetchApi<{ message: string }>('/users/me/courses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId }),
  });
};

export const deleteUserCourse = async (courseId: string, token: string) => {
  return fetchApi<{ message: string }>(`/users/me/courses/${courseId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const resetCourseProgress = async (courseId: string, token: string) => {
  return fetchApi<{ message: string }>(`/courses/${courseId}/reset`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
};
