import { useEffect } from 'react';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSWRMutation from 'swr/mutation';
import { fetcherAllTasks, updateTaskFetcher } from '../../utils/swr-mutations-functions';
import useSWR from 'swr';
import { useSnackbar } from 'notistack';

export default function ChangeStatusToDoneButton(props: { id: number }) {
  const token = sessionStorage.getItem('token');
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, trigger, reset } = useSWRMutation('tasks', updateTaskFetcher);
  const { mutate } = useSWR(['tasks', token], ([key, token]) =>
    fetcherAllTasks(key, token)
  );

  useEffect(() => {
    if (data) {
      mutate();
    }

    if (error) {
      const message = error.response.data.errors[0].message;

      enqueueSnackbar(message, {
        variant: 'error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const handleClick = () => {
    reset();
    trigger({ id: props.id, status: 'DONE', token });
  };

  return (
    <button type='button' className='p-2 cursor-pointer' onClick={handleClick}>
      <FontAwesomeIcon icon={faCircleRight} size='lg' color='#4a6fbf' />
    </button>
  );
}
