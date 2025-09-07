import { saveWorkoutProgress } from './apiWorkoutProgress';

// Мокаем глобальную функцию fetch
global.fetch = jest.fn();

const mockFetch = global.fetch as jest.Mock;

describe('apiWorkoutProgress functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('saveWorkoutProgress', () => {
    it('должен успешно сохранить прогресс тренировки', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        headers: new Headers({ 'content-length': '0' }),
        json: async () => null,
      });

      const courseId = 'course';
      const workoutId = 'workout';
      const progressData = [10, 12, 15];
      const token = 'faketoken';

      await expect(
        saveWorkoutProgress(courseId, workoutId, progressData, token)
      ).resolves.not.toThrow();

      expect(mockFetch).toHaveBeenCalledWith(
        `https://wedev-api.sky.pro/api/fitness/courses/${courseId}/workouts/${workoutId}`,
        expect.objectContaining({
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ progressData }),
        })
      );
    });

    it('должен выбросить ошибку при неудачном сохранении прогресса', async () => {
      const errorMessage = 'Ошибка сохранения';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
      });

      const courseId = 'course';
      const workoutId = 'workout';
      const progressData = [10, 12, 15];
      const token = 'faketoken';

      await expect(
        saveWorkoutProgress(courseId, workoutId, progressData, token)
      ).rejects.toThrow(errorMessage);
    });
  });
});
