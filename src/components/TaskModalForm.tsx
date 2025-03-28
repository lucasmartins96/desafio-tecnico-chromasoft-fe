import { useEffect, useState } from 'react';
import SubmitTaskButton from './buttons/SaveTaskButton';
import useSWRMutation from 'swr/mutation';
import {
  addTaskStatusFetcher,
  fetcherAllTasks,
  updateTaskFetcher,
} from '../utils/swr-mutations-functions';
import { useSnackbar } from 'notistack';
import useSWR from 'swr';
import CloseModalButton from './buttons/CloseModalButton';

type Task = {
  id?: number;
  title?: string;
  description?: string;
  status?: 'PENDING' | 'DONE';
};

type TaskModalFormProps = {
  isOpen: boolean;
  handleOpenModal: (isOpen: boolean) => void;
  taskPayload?: Task;
};

export default function TaskModalForm(props: TaskModalFormProps) {
  const token = sessionStorage.getItem('token');
  const { enqueueSnackbar } = useSnackbar();
  const addTaskSwrInstance = useSWRMutation('tasks', addTaskStatusFetcher);
  const updateTaskSwrInstance = useSWRMutation('tasks', updateTaskFetcher);
  const { mutate } = useSWR(['tasks', token], ([key, token]) =>
    fetcherAllTasks(key, token)
  );
  const [formData, setFormData] = useState<Task>();

  useEffect(() => {
    setFormData({
      id: props?.taskPayload?.id,
      title: props?.taskPayload?.title ?? '',
      description: props?.taskPayload?.description ?? '',
      status: props?.taskPayload?.status,
    });
  }, [props.taskPayload]);

  useEffect(() => {
    const data = addTaskSwrInstance.data;
    const error = addTaskSwrInstance.error;

    if (data) {
      enqueueSnackbar(data.message, {
        variant: 'success',
      });
      props.handleOpenModal(false);
      mutate();
    }

    if (error) {
      const message = error.response.data.errors[0].message;

      enqueueSnackbar(message, {
        variant: 'error',
      });
      props.handleOpenModal(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTaskSwrInstance.data, addTaskSwrInstance.error]);

  useEffect(() => {
    const data = updateTaskSwrInstance.data;
    const error = updateTaskSwrInstance.error;

    if (data) {
      enqueueSnackbar(data.message, {
        variant: 'success',
      });
      closeModal();
      mutate();
    }

    if (error) {
      const message = error.response.data.errors[0].message;

      enqueueSnackbar(message, {
        variant: 'error',
      });
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateTaskSwrInstance.data, updateTaskSwrInstance.error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData?.id) {
      updateTaskSwrInstance.reset();
      updateTaskSwrInstance.trigger({
        ...formData,
        token,
      });
    } else {
      addTaskSwrInstance.reset();
      addTaskSwrInstance.trigger({
        title: formData!.title!,
        description: formData!.description!,
        status: formData!.status!,
        token,
      });
    }
  };

  const closeModal = () => {
    props.handleOpenModal(false);
  };

  if (!props.isOpen) {
    return <></>;
  }

  return (
    <div className='fixed inset-0 bg-gray-800/50 bg-opacity-25 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-100'>
        <h2 className='text-xl font-semibold mb-4'>
          {formData?.id ? 'Atualizar' : 'Cadastrar'}&nbsp;Tarefa
        </h2>
        <form onSubmit={handleSubmit}>
          <label className='block mb-2'>
            Título:
            <input
              type='text'
              name='title'
              value={formData?.title}
              onChange={handleChange}
              className='w-full p-2 border rounded mt-1'
              required
            />
          </label>
          <label className='block mb-4'>
            Descrição:
            <textarea
              name='description'
              value={formData?.description}
              onChange={handleChange}
              className='w-full p-2 border rounded mt-1'
              required
            />
          </label>
          <div className='flex justify-end gap-2'>
            <CloseModalButton onClick={closeModal} />
            <SubmitTaskButton
              isLoading={
                addTaskSwrInstance.isMutating || updateTaskSwrInstance.isMutating
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
