import React, { useEffect, useState } from 'react';
import './App.css';
import useSWRMutation from 'swr/mutation';
import axiosInstance from './utils/axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

type FormState = {
  name: string;
  email: string;
  password: string;
  mode: 'LOGIN' | 'SIGNIN';
};

function App() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const swrLoginInstance = useSWRMutation(
    'auth/login',
    async (key, { arg }: { arg: { email: string; password: string } }) => {
      return await axiosInstance.post(key, arg).then((res) => res.data);
    }
  );
  const swrSigninInstance = useSWRMutation(
    'auth/signin',
    async (key, { arg }: { arg: { name: string; email: string; password: string } }) => {
      return await axiosInstance.post(key, arg).then((res) => res.data);
    }
  );
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    mode: 'LOGIN',
  });

  useEffect(() => {
    if (swrSigninInstance?.data || swrLoginInstance?.data) {
      const responsePayload = swrSigninInstance.data ?? swrLoginInstance.data;

      sessionStorage.setItem('token', responsePayload.token);
      navigate('/tasks');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swrLoginInstance.data, swrSigninInstance.data]);

  useEffect(() => {
    if (swrSigninInstance.error || swrLoginInstance.error) {
      const axiosError = swrSigninInstance.error ?? swrLoginInstance.error;
      const message = axiosError.response.data.errors[0].message;

      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swrLoginInstance.error, swrSigninInstance.error]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((oldState) => ({
      ...oldState,
      name: e.target.value,
    }));
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((oldState) => ({
      ...oldState,
      email: e.target.value,
    }));
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((oldState) => ({
      ...oldState,
      password: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password } = formState;

    swrLoginInstance.reset();
    swrSigninInstance.reset();

    if (formState.mode === 'LOGIN') {
      swrLoginInstance.trigger({ email, password });
    } else {
      swrSigninInstance.trigger({ name, email, password });
    }
  };

  const handleClickToggleMode = () => {
    if (formState.mode === 'SIGNIN') {
      setFormState({
        name: '',
        email: '',
        password: '',
        mode: 'LOGIN',
      });
    } else {
      setFormState({
        name: '',
        email: '',
        password: '',
        mode: 'SIGNIN',
      });
    }
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form method='POST' className='space-y-6' onSubmit={handleSubmit}>
            {formState.mode === 'SIGNIN' && (
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Nome
                </label>
                <div className='mt-2'>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    value={formState.name}
                    onChange={handleChangeName}
                    required
                    autoComplete='email'
                    className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor='email'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Email
              </label>
              <div className='mt-2'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  value={formState.email}
                  onChange={handleChangeEmail}
                  required
                  autoComplete='email'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Senha
                </label>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  value={formState.password}
                  onChange={handleChangePassword}
                  required
                  autoComplete='current-password'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {formState.mode === 'LOGIN' ? 'Login' : 'Sign in'}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            {formState.mode === 'LOGIN' ? 'Não tem cadastro?' : 'Já tem cadastro?'}&nbsp;
            <button
              className='font-semibold text-indigo-600 hover:text-indigo-500'
              onClick={handleClickToggleMode}
            >
              {formState.mode === 'LOGIN' ? 'Crie uma conta' : 'Fazer login'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
