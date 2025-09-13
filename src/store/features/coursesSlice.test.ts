import {
  coursesReducer,
  setAllCourses,
  setLoading,
  setError,
} from './coursesSlice';
import { Course } from '@/types/api';

const initialState = {
  allCourses: [],
  userCourses: [],
  isLoading: false,
  error: null,
};

const mockCourses: Course[] = [
  {
    _id: '1',
    nameRU: 'Йога',
    nameEN: 'Yoga',
    description: 'Описание йоги',
    directions: [],
    fitting: [],
    workouts: [],
    durationInDays: 30,
    dailyDurationInMinutes: { from: 20, to: 40 },
    difficulty: 'легкий',
  },
  {
    _id: '2',
    nameRU: 'Стретчинг',
    nameEN: 'Stretching',
    description: 'Описание стретчинга',
    directions: [],
    fitting: [],
    workouts: [],
    durationInDays: 20,
    dailyDurationInMinutes: { from: 15, to: 30 },
    difficulty: 'средний',
  },
];

describe('Редьюсеры coursesSlice', () => {
  it('должен обрабатывать начальное состояние', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен корректно обрабатывать setLoading', () => {
    let state = coursesReducer(initialState, setLoading(true));
    expect(state.isLoading).toBe(true);

    state = coursesReducer(state, setLoading(false));
    expect(state.isLoading).toBe(false);
  });

  it('должен корректно обрабатывать setAllCourses', () => {
    const loadingState = {
      ...initialState,
      isLoading: true,
      error: 'some error',
    };
    const state = coursesReducer(loadingState, setAllCourses(mockCourses));

    expect(state.allCourses).toEqual(mockCourses);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('должен корректно обрабатывать setError', () => {
    const errorMessage = 'Не удалось загрузить курсы';
    const loadingState = { ...initialState, isLoading: true };
    const state = coursesReducer(loadingState, setError(errorMessage));

    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
    expect(state.allCourses).toEqual([]);
  });
});
