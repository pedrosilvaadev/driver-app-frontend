import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAuth(pathname: string) {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    } else {
      navigate(pathname, { replace: true });
    }

  }, [isAuthenticated, navigate, location.pathname, pathname]);
}