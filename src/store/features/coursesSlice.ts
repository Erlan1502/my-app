import { Course } from '@/types/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoursesState {
  allCourses: Course[];
  userCourses: Course[]; // Курсы, добавленные пользователем
  isLoading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  allCourses: [],
  userCourses: [],
  isLoading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    // Для начала загрузки
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // сейф Курсов
    setAllCourses: (state, action: PayloadAction<Course[]>) => {
      state.allCourses = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // ошибки
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setAllCourses, setLoading, setError } = coursesSlice.actions;
export const coursesReducer = coursesSlice.reducer;
