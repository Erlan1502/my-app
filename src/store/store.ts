import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from 'react-redux';
import { authReducer } from './features/authSlice';
import { coursesReducer } from './features/coursesSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
