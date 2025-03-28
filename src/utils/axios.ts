import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error('Token inválido ou expirado. Redirecionando para login...');

        window.location.href = '/';

        return Promise.reject(error);
      }

      if (status === 403) {
        console.error('Acesso negado. Você não tem permissão para acessar este recurso.');
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
