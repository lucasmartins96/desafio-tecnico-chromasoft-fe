import Header from '../components/Header';
import TasksContainer from '../components/TasksContainer';
import '../styles/tasks.css';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

function TasksPage() {
  useAuthRedirect();

  return (
    <div className='h-full flex flex-col'>
      <Header />
      <div className='h-10'></div>
      <TasksContainer />
    </div>
  );
}

export default TasksPage;
