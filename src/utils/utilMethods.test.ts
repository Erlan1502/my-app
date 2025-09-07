import { handleScrollToTop } from './utilMethods';

describe('utilMethods', () => {
  beforeEach(() => {
    global.scrollTo = jest.fn();
  });
  // Исключаем влияние тестов
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('handleScrollToTop', () => {
    it('должен вызывать window.scrollTo с правильными параметрами', () => {
      handleScrollToTop();
      expect(global.scrollTo).toHaveBeenCalledTimes(1);

      expect(global.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });
});
