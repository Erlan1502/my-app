import { getAllCourses } from './apiCourses';
import { fetchApi } from '../fetchApi';

jest.mock('../fetchApi');

const mockedFetchApi = fetchApi as jest.Mock;

describe('apiCourses', () => {
  // Сброс мока
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Должен успешно загружать все функции', async () => {
    const mockCourses = [
      { _id: '1', nameRU: 'Йога' },
      { _id: '2', nameRU: 'Стретчинг' },
    ];
    mockedFetchApi.mockResolvedValue(mockCourses);

    const courses = await getAllCourses();

    expect(mockedFetchApi).toHaveBeenCalledWith('/courses');
    expect(courses).toEqual(mockCourses);
  });

  it('Должен бросать ошибку если загрузка не удалась', async () => {
    const errorMessage = 'Нет сети';
    mockedFetchApi.mockRejectedValue(new Error(errorMessage));
    await expect(getAllCourses()).rejects.toThrow(errorMessage);
  });
});
