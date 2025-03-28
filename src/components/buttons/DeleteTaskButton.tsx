import { useEffect } from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSWRMutation from 'swr/mutation';
import { deleteTaskFetcher, fetcherAllTasks } from '../../utils/swr-mutations-functions';
import useSWR from 'swr';
import { useSnackbar } from 'notistack';

export default function DeleteTaskButton(props: { id: number }) {
  const token = sessionStorage.getItem('token');
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, trigger, reset } = useSWRMutation('tasks', deleteTaskFetcher);
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

  const handleClickDelete = () => {
    reset();
    trigger({ id: props.id, token });
  };

  return (
    <button type='button' className='p-2 cursor-pointer' onClick={handleClickDelete}>
      <FontAwesomeIcon
        icon={faTrashCan}
        size='lg'
        style={{
          color: '#f54d9e',
        }}
      />
    </button>
  );
}
