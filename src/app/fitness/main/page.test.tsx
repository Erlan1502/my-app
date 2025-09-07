import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import HomePage from './page';
import { coursesReducer } from '@/store/features/coursesSlice';
import { authReducer } from '@/store/features/authSlice';
import * as apiCourses from '@/api/courses/apiCourses';
import { AppStore } from '@/store/store';

jest.mock('@/api/courses/apiCourses');
const mockedGetAllCourses = apiCourses.getAllCourses as jest.Mock;

jest.mock('next/link', () => {
  function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  }
  return MockLink;
});

describe('HomePage', () => {
  let store: AppStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
        courses: coursesReducer,
      },
    });
    mockedGetAllCourses.mockClear();
  });

  it('Должен отображать состояние загрузки изначально', () => {
    mockedGetAllCourses.mockReturnValue(new Promise(() => {}));

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    expect(screen.getByText('Загрузка курсов...')).toBeInTheDocument();
  });

  it('Должен отображать курсы после успешной загрузки', async () => {
    const mockCourses = [
      {
        _id: '1',
        nameRU: 'Йога',
        nameEN: 'Yoga',
        durationInDays: 10,
        dailyDurationInMinutes: { from: 20, to: 30 },
        difficulty: 'Легкий',
      },
      {
        _id: '2',
        nameRU: 'Стретчинг',
        nameEN: 'Stretching',
        durationInDays: 15,
        dailyDurationInMinutes: { from: 15, to: 25 },
        difficulty: 'Средний',
      },
    ];
    mockedGetAllCourses.mockResolvedValue(mockCourses);

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    // ожидание карточек курса
    await waitFor(() => {
      expect(screen.getByText('Йога')).toBeInTheDocument();
      expect(screen.getByText('Стретчинг')).toBeInTheDocument();
    });

    expect(screen.queryByText('Загрузка курсов...')).not.toBeInTheDocument();
  });

  it('Должен отображать сообщение об ошибке при неудачной загрузке', async () => {
    const errorMessage = 'Ошибка загрузки';
    mockedGetAllCourses.mockRejectedValue(new Error(errorMessage));

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Ошибка: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});
