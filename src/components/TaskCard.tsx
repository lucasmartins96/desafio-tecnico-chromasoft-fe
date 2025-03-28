import DeleteTaskButton from './buttons/DeleteTaskButton';
import EditTaskButton from './buttons/EditTaskButton';
import ChangeStatusToDoneButton from './buttons/ChangeStatusToDoneButton';
import ChangeStatusToPendingButton from './buttons/ChangeStatusToPendingButton';
import { Task } from '../utils/interfaces';

type TaskCardProps = {
  task: Task;
  handleEditTask: () => void;
  isLoading?: boolean;
};

export default function TaskCard(props: TaskCardProps) {
  if (props.isLoading) {
    return (
      <div className='p-4 mb-5 bg-indigo-200 rounded-lg animate-pulse'>
        <div className='flex items-center border-b border-b-indigo-300/80 border-solid pb-2'>
          <div className='text-lg font-semibold flex-1 grow text-zinc-950'>
            <div className='h-7 rounded bg-indigo-950/10'></div>
          </div>
          <div className='flex ml-8'>
            <div className='size-7 mr-1.5 rounded-full bg-indigo-950/10'></div>
            <div className='size-7 mr-1.5 rounded-full bg-indigo-950/10'></div>
            <div className='size-7 rounded-full bg-indigo-950/10'></div>
          </div>
        </div>
        <div>
          <div className='h-4 rounded my-2 bg-indigo-950/10'></div>
          <div className='h-4 rounded my-2 bg-indigo-950/10'></div>
          <div className='h-4 rounded my-2 bg-indigo-950/10'></div>
          <div className='h-4 rounded my-2 bg-indigo-950/10'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-4 mb-4 bg-indigo-200 rounded-lg'>
      <div className='flex items-center border-b border-b-indigo-300/80 border-solid pb-2'>
        <div className='text-lg font-semibold flex-1 grow text-zinc-950'>
          {props.task.title}
        </div>
        <div>
          {props.task.status === 'PENDING' ? (
            <ChangeStatusToDoneButton id={props.task.id} />
          ) : (
            <ChangeStatusToPendingButton id={props.task.id} />
          )}
          <EditTaskButton onClick={props.handleEditTask} />
          <DeleteTaskButton id={props.task.id} />
        </div>
      </div>
      <div className='py-2'>
        <div className='text-zinc-950'>{props.task.description}</div>
      </div>
    </div>
  );
}
