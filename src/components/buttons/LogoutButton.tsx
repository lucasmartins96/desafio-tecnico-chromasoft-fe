import { useNavigate } from 'react-router';

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <button
      type='submit'
      className={`bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer`}
      onClick={handleClick}
    >
      Sair
    </button>
  );
}
