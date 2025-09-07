import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { setAuthTokens } from '@/store/features/authSlice';

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const email = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (email && token) {
      dispatch(setAuthTokens({ token, email }));
    }

  }, [dispatch])
};
