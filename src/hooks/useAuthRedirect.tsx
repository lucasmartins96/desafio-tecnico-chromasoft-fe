import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userToken = sessionStorage.getItem('token');

    if (!userToken && location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, [navigate, location]);
};
