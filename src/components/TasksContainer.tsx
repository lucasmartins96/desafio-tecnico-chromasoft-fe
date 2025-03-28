import { useEffect, useState } from 'react';
import TaskCard from './TaskCard';
import TaskModalForm from './TaskModalForm';
import useSWR from 'swr';
import { fetcherAllTasks } from '../utils/swr-mutations-functions';
import { Task } from '../utils/interfaces';
import AddTaskButton from './buttons/AddTaskButton';

const initialTasks: Task[] = [1, 2, 3, 4, 5, 6].map((id) => ({
  id,
  title: '',
  description: '',
  status: id % 2 === 0 ? 'PENDING' : 'DONE',
}));

export default function TasksContainer() {
  const jwtToken = sessionStorage.getItem('token');
  const { data, isLoading } = useSWR(['tasks', jwtToken], ([key, token]) =>
    fetcherAllTasks(key, token)
  );
  const [allTasks, setAllTasks] = useState<{
    pending: Task[];
    done: Task[];
  }>({
    done: [initialTasks[0], initialTasks[2], initialTasks[4]],
    pending: [initialTasks[1], initialTasks[3], initialTasks[5]],
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [taskSelected, setTaskSelected] = useState<{
    id?: number;
    title: string;
    description: string;
    status: 'PENDING' | 'DONE';
  }>();

  useEffect(() => {
    if (data) {
      const initialTasksFiltered: {
        pending: Task[];
        done: Task[];
      } = {
        pending: [],
        done: [],
      };
      const taskFiltered = data.tasks.reduce((acc, curr) => {
        if (curr.status === 'PENDING') {
          return {
            ...acc,
            pending: acc.pending.concat(curr),
          };
        }

        if (curr.status === 'DONE') {
          return {
            ...acc,
            done: acc.done.concat(curr),
          };
        }

        return acc;
      }, initialTasksFiltered);

      setAllTasks(taskFiltered);
    }
  }, [data]);

  const handleAddTask = (status: Task['status']) => {
    setTaskSelected({
      title: '',
      description: '',
      status,
    });
    setIsOpenModal(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskSelected(task);
    setIsOpenModal(true);
  };

  return (
    <>
      <div className='grid grid-cols-2 gap-x-8 mx-8'>
        <div className='bg-indigo-100 px-4 py-8 rounded-lg'>
          <div className='flex items-center px-5'>
            <div className='grow text-xl'>Tarefas Pendentes</div>
            <div>
              <AddTaskButton onClick={() => handleAddTask('PENDING')} />
            </div>
          </div>
          <div className='overflow-auto mt-4 px-5 h-[70vh]'>
            {allTasks.pending.map((task) => (
              <TaskCard
                key={`pending_${task.id}`}
                task={task}
                handleEditTask={() => handleEditTask(task)}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
        <div className='bg-indigo-100 px-4 py-8 rounded-lg'>
          <div className='flex items-center px-5'>
            <div className='grow text-xl'>Tarefas Concluídas</div>
            <div>
              <AddTaskButton onClick={() => handleAddTask('DONE')} />
            </div>
          </div>
          <div className='overflow-auto mt-4 px-5 h-[70vh]'>
            {allTasks.done.map((task) => (
              <TaskCard
                key={`done_${task.id}`}
                task={task}
                handleEditTask={() => handleEditTask(task)}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
      <TaskModalForm
        isOpen={isOpenModal}
        handleOpenModal={setIsOpenModal}
        taskPayload={taskSelected}
      />
    </>
  );
}
