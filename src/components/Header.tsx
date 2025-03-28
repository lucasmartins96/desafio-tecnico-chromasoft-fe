import { jwtDecode } from 'jwt-decode';
import LogoutButton from './buttons/LogoutButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function Header() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<{
        id: number;
        name: string;
        email: string;
      }>(token!);
      setUserName(decoded.name);
    } else {
      navigate('/', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className='p-8 flex'>
      <p className='text-lg grow self-center'>
        Bem vindo, <span className='font-semibold'>{userName}</span>
      </p>
      <LogoutButton />
    </header>
  );
}
